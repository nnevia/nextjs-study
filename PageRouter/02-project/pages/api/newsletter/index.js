import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument } from '../../../helpers/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email format!' });
      return;
    }

    let client;

    const newData = {
      email: userEmail,
    };

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Failed to connect to the database!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', newData);
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Failed to insert the document!' });
      return;
    }

    res.status(201).json({ message: 'Success!', subscribe: newData });
  }
}
