export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the getWishlist api page")
    // =================================================
    const { MongoClient } = require('mongodb');
       const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(url);
    const dbName = 'greenerme'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('wishlist'); // collection name
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json(findResult)
    }
    