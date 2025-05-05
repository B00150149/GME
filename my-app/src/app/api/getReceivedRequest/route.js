
import { getCustomSession } from '../sessionCode.js';

export async function GET(req, res) {
    try {
        console.log("in the getReceivedRequest api page")
        const session = await getCustomSession()
        const email = session.email;

        const { MongoClient } = require('mongodb');
        const url = process.env.MONGODB_URI || "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        const client = new MongoClient(url);
        const dbName = 'greenerme'; // database name

        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('swapRequests'); // collection name
        const findResult = await collection.find({userEmail:email,status:"Accepted"}).toArray();
        console.log('Found documents =>', findResult);

        //await client.close(); // Close DB connection after use
        return Response.json(findResult);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return new Response(JSON.stringify({ error: 'Failed to connect to database' }), { status: 500 });
    }
}
    