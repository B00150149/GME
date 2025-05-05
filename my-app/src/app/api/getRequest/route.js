import { getCustomSession } from '../sessionCode.js';

export async function GET(request) {
    console.log("in the getRequest api page");
    const session = await getCustomSession();
    const email = session.email;

    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = 'greenerme';

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('swapRequests');
    const findResult = await collection.find({ userEmail: email, status: "Pending" }).toArray();
    console.log('Found documents =>', findResult);

    return new Response(JSON.stringify(findResult), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
