import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma.js';

const app = express();
const PORT = process.env.PORT || 4000;

// In-memory fallback stores (used when DATABASE_URL is not configured or during offline dev)
const memoryApplications = [];
const memoryEventRegistrations = [];
const memoryContactSubmissions = [];

// Helper to determine if Prisma PostgreSQL is configured
const hasDatabase = Boolean(process.env.DATABASE_URL);


// ─── Middleware ───
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, serverless)
    if (!origin) return callback(null, true);

    // Allow localhost and 127.0.0.1
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    // Allow any Vercel preview or production deployment (*.vercel.app)
    if (/^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    // Allow custom origin configured in environment
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }

    // Allow origin in development and testing
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

const apiRouter = express.Router();

// ─── Health Check ───
apiRouter.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: hasDatabase ? 'configured' : 'memory_fallback',
    timestamp: new Date().toISOString(),
  });
});

// ─── Applications (Recruitment Form) ───
apiRouter.post('/applications', async (req, res) => {
  try {
    const { fullName, email, rollNo, year, primaryDomain, domain, secondaryDomain, portfolio, motivation } = req.body;
    const resolvedPrimaryDomain = primaryDomain || domain;

    if (!fullName || !email || !rollNo || !year || !resolvedPrimaryDomain || !motivation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let application = null;

    if (hasDatabase) {
      try {
        application = await prisma.application.create({
          data: {
            fullName,
            email,
            rollNo,
            year,
            primaryDomain: resolvedPrimaryDomain,
            domain: resolvedPrimaryDomain,
            secondaryDomain: secondaryDomain || null,
            portfolio: portfolio || null,
            motivation,
          },
        });
      } catch (dbError) {
        console.warn('Prisma database error, using memory fallback:', dbError.message);
        if (dbError.code === 'P2002') {
          return res.status(409).json({ error: 'Duplicate entry detected' });
        }
      }
    }

    if (!application) {
      application = {
        id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        fullName,
        email,
        rollNo,
        year,
        primaryDomain: resolvedPrimaryDomain,
        domain: resolvedPrimaryDomain,
        secondaryDomain: secondaryDomain || null,
        portfolio: portfolio || null,
        motivation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryApplications.unshift(application);
      console.log(`[Storage] Saved application for "${fullName}" (${email}). Set DATABASE_URL to persist to PostgreSQL.`);
    }

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

apiRouter.get('/applications', async (_req, res) => {
  try {
    if (hasDatabase) {
      try {
        const applications = await prisma.application.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return res.json({ data: applications });
      } catch (dbError) {
        console.warn('Prisma fetch failed, using memory fallback:', dbError.message);
      }
    }
    res.json({ data: memoryApplications });
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// ─── Event Registrations ───
apiRouter.post('/event-registrations', async (req, res) => {
  try {
    const { fullName, email, rollNo, year, eventName, primaryDomain, domain, secondaryDomain, portfolio, message } = req.body;
    const resolvedPrimaryDomain = primaryDomain || domain || null;

    if (!fullName || !email || !rollNo || !year || !eventName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let registration = null;

    if (hasDatabase) {
      try {
        registration = await prisma.eventRegistration.create({
          data: {
            fullName,
            email,
            rollNo,
            year,
            eventName,
            primaryDomain: resolvedPrimaryDomain,
            domain: resolvedPrimaryDomain,
            secondaryDomain: secondaryDomain || null,
            portfolio: portfolio || null,
            message: message || null,
          },
        });
      } catch (dbError) {
        console.warn('Prisma database error, using memory fallback:', dbError.message);
      }
    }

    if (!registration) {
      registration = {
        id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        fullName,
        email,
        rollNo,
        year,
        eventName,
        primaryDomain: resolvedPrimaryDomain,
        domain: resolvedPrimaryDomain,
        secondaryDomain: secondaryDomain || null,
        portfolio: portfolio || null,
        message: message || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryEventRegistrations.unshift(registration);
      console.log(`[Storage] Saved event registration for "${fullName}" - ${eventName}.`);
    }

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ error: 'Failed to register for event' });
  }
});

apiRouter.get('/event-registrations', async (_req, res) => {
  try {
    if (hasDatabase) {
      try {
        const registrations = await prisma.eventRegistration.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return res.json({ data: registrations });
      } catch (dbError) {
        console.warn('Prisma fetch failed, using memory fallback:', dbError.message);
      }
    }
    res.json({ data: memoryEventRegistrations });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// ─── Contact Submissions ───
apiRouter.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let submission = null;

    if (hasDatabase) {
      try {
        submission = await prisma.contactSubmission.create({
          data: { name, email, subject: subject || null, message },
        });
      } catch (dbError) {
        console.warn('Prisma database error, using memory fallback:', dbError.message);
      }
    }

    if (!submission) {
      submission = {
        id: `contact_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        name,
        email,
        subject: subject || null,
        message,
        createdAt: new Date().toISOString(),
      };
      memoryContactSubmissions.unshift(submission);
      console.log(`[Storage] Saved contact submission from "${name}".`);
    }

    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

apiRouter.get('/contact', async (_req, res) => {
  try {
    if (hasDatabase) {
      try {
        const submissions = await prisma.contactSubmission.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return res.json({ data: submissions });
      } catch (dbError) {
        console.warn('Prisma fetch failed, using memory fallback:', dbError.message);
      }
    }
    res.json({ data: memoryContactSubmissions });
  } catch (error) {
    console.error('Fetch contact submissions error:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Mount API router for both direct service routing and path-prefixed routing
app.use('/api', apiRouter);
app.use('/', apiRouter);

// ─── Start Server ───
if (!process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`🌉 SETU API server running at http://localhost:${PORT}`);
    if (hasDatabase) {
      try {
        await prisma.$connect();
        console.log('✅ PostgreSQL connected successfully via Prisma');
      } catch (err) {
        console.error('❌ Failed to connect to PostgreSQL database via DATABASE_URL:');
        console.error('   ', err.message);
        console.warn('⚠️  Submissions will temporarily fall back to in-memory store until DATABASE_URL is valid.');
      }
    } else {
      console.log('ℹ️  Note: DATABASE_URL not set in server/.env. Submissions will be stored in-memory for testing.');
      console.log('👉 To persist to PostgreSQL, add DATABASE_URL in server/.env and run: npx prisma db push');
    }
  });
}

export default app;
