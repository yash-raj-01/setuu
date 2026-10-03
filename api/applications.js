// In-memory fallback store for serverless environments
let inMemoryApplications = [];

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Fetch applications
  if (req.method === 'GET') {
    if (process.env.DATABASE_URL) {
      try {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        const data = await prisma.application.findMany({ orderBy: { createdAt: 'desc' } });
        await prisma.$disconnect();
        return res.status(200).json({ data });
      } catch (err) {
        console.warn('Prisma query warning (using fallback memory store):', err.message);
      }
    }
    return res.status(200).json({ data: inMemoryApplications });
  }

  // POST: Create application
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { fullName, email, rollNo, year, domain, secondaryDomain, portfolio, motivation } = body;

      if (!fullName || !email || !rollNo || !year || !domain || !motivation) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let application = null;

      // Persist to PostgreSQL if DATABASE_URL is configured
      if (process.env.DATABASE_URL) {
        try {
          const { PrismaClient } = await import('@prisma/client');
          const prisma = new PrismaClient();
          application = await prisma.application.create({
            data: {
              fullName,
              email,
              rollNo,
              year,
              domain,
              secondaryDomain: secondaryDomain || null,
              portfolio: portfolio || null,
              motivation,
            },
          });
          await prisma.$disconnect();
        } catch (dbErr) {
          console.warn('Database save warning (using fallback memory store):', dbErr.message);
          if (dbErr.code === 'P2002') {
            return res.status(409).json({ error: 'Duplicate entry detected' });
          }
        }
      }

      // Safe fallback if database is not configured
      if (!application) {
        application = {
          id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          fullName,
          email,
          rollNo,
          year,
          domain,
          secondaryDomain: secondaryDomain || null,
          portfolio: portfolio || null,
          motivation,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        inMemoryApplications.unshift(application);
      }

      return res.status(201).json({ success: true, data: application });
    } catch (err) {
      console.error('Applications handler error:', err);
      return res.status(500).json({ error: 'Failed to submit application' });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
