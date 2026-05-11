import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mumms_inventory';
const DB_NAME = 'mumms_inventory';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let client;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(DB_NAME);

    // Clear existing users
    await db.collection('users').deleteMany({});

    const users = [
      {
        email: 'revdilshanstbenedictscollegemedia@gmail.com',
        password: 'Dilshan2026@',
        displayName: 'Rev. Bro. Dilshan',
        role: 'MIC',
        createdAt: new Date()
      },
      {
        email: 'senithastbenedictscollegemedia@gmail.com',
        password: 'Senitha2026@',
        displayName: 'Master Senitha',
        role: 'President',
        createdAt: new Date()
      },
      {
        email: 'thisumstbenedictscollegemedia@gmail.com',
        password: 'Thisum2026@',
        displayName: 'Master Thisum',
        role: 'Photographer',
        createdAt: new Date()
      },
      {
        email: 'dabarestbenedictscollegemedia@gmail.com',
        password: 'Dabare2026@',
        displayName: 'Master Dabare',
        role: 'Photographer',
        createdAt: new Date()
      },
      {
        email: 'mihinulastbenedictscollegemedia@gmail.com',
        password: 'Mihinula2026@',
        displayName: 'Master Mihinula',
        role: 'Photographer',
        createdAt: new Date()
      },
      {
        email: 'ashenstbenedictscollegemedia@gmail.com',
        password: 'Ashen2026@',
        displayName: 'Master Ashen',
        role: 'Vice President',
        createdAt: new Date()
      },
      {
        email: 'jovelstbenedictscolllegemedia@gmail.com',
        password: 'Jovel2026@',
        displayName: 'Master Jovel Adisha',
        role: 'Coordinator',
        createdAt: new Date()
      },
      {
        email: 'nethulastbenedictscollegemedia@gmail.com',
        password: 'Nethula2026@',
        displayName: 'Master Nethula Silva',
        role: 'Photographer',
        createdAt: new Date()
      }
    ];

    const result = await db.collection('users').insertMany(users);

    return res.status(200).json({
      message: 'Users seeded successfully',
      count: result.insertedCount
    });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}