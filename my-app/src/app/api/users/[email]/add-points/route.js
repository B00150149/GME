// app/api/users/[email]/add-points/route.js
import { MongoClient } from 'mongodb';

export async function POST(req, { params }) {
  const { email } = params;
  
  if (!email) {
    return new Response(JSON.stringify({ error: 'Missing email' }), { status: 400 });
  }

  const { points } = await req.json();
  
  if (points === undefined) {
    return new Response(JSON.stringify({ error: 'Missing points' }), { status: 400 });
  }

  const client = new MongoClient("mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  try {
    await client.connect();
    const db = client.db('greenerme');
    const collection = db.collection('users');

    const result = await collection.findOneAndUpdate(
      { email },
      { $inc: { points }, $push: { pointsHistory: `+${points} points on ${new Date().toLocaleString()}` } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.value), { status: 200 });
  } catch (error) {
    console.error('Error adding points:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    await client.close();
  }
}
