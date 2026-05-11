const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mumms_inventory';
const DB_NAME = 'mumms_inventory';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  let client;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(DB_NAME);
    const user = await db.collection('users').findOne({
      email: email.toLowerCase(),
      password: password
    });

    if (user) {
      return res.status(200).json({
        success: true,
        role: user.role,
        name: user.displayName
      });
    } else {
      return res.status(401).json({
        message: 'වැරදි ඊමේල් එකක් හෝ පාස්වර්ඩ් එකක්'
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}