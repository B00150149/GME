//app/api/users/[email]/add-points/route.js
import { MongoClient } from 'mongodb';

export async function POST(req, { params }) {
  const { email } = params; // Extract email from the route parameters
  

  if (!email || !points) {
    return new Response(JSON.stringify({ error: 'Email and points are required' }), { status: 400 });
  }

  const mongoUrl = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(mongoUrl);
  const dbName = 'greenerme';

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');

    const db = client.db(dbName);
    const collection = db.collection('users'); // Collection name

    // Update the user's points and points history
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
    console.error('Error updating points:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    await client.close();
  }
}