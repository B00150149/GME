import { MongoClient } from 'mongodb';

export async function GET(req, { params }) {
  const { email } = params;

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
  }

  const mongoUrl = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(mongoUrl);
  const dbName = 'greenerme';

  try {
    await client.connect();
    const db = client.db(dbName);
    const newlistingCollection = db.collection('newlisting');

    // Find listings uploaded by the user
    const listings = await newlistingCollection.find({ email: email }).toArray();

    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    await client.close();
  }
}
