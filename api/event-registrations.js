// In-memory fallback store for serverless environments
let inMemoryRegistrations = [];

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

  // GET: Fetch event registrations
  if (req.method === 'GET') {
    if (process.env.DATABASE_URL) {
      try {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        const data = await prisma.eventRegistration.findMany({ orderBy: { createdAt: 'desc' } });
        await prisma.$disconnect();
        return res.status(200).json({ data });
      } catch (err) {
        console.warn('Prisma query warning (using fallback memory store):', err.message);
      }
    }
    return res.status(200).json({ data: inMemoryRegistrations });
  }

  // POST: Create event registration
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { fullName, email, rollNo, year, eventName, domain, secondaryDomain, portfolio, message } = body;

      if (!fullName || !email || !rollNo || !year || !eventName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let registration = null;

      // Persist to PostgreSQL if DATABASE_URL is configured
      if (process.env.DATABASE_URL) {
        try {
          const { PrismaClient } = await import('@prisma/client');
          const prisma = new PrismaClient();
          registration = await prisma.eventRegistration.create({
            data: {
              fullName,
              email,
              rollNo,
              year,
              eventName,
              domain: domain || null,
              secondaryDomain: secondaryDomain || null,
              portfolio: portfolio || null,
              message: message || null,
            },
          });
          await prisma.$disconnect();
        } catch (dbErr) {
          console.warn('Database save warning (using fallback memory store):', dbErr.message);
        }
      }

      // Safe fallback if database is not configured
      if (!registration) {
        registration = {
          id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          fullName,
          email,
          rollNo,
          year,
          eventName,
          domain: domain || null,
          secondaryDomain: secondaryDomain || null,
          portfolio: portfolio || null,
          message: message || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        inMemoryRegistrations.unshift(registration);
      }

      return res.status(201).json({ success: true, data: registration });
    } catch (err) {
      console.error('Event registration handler error:', err);
      return res.status(500).json({ error: 'Failed to register for event' });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
