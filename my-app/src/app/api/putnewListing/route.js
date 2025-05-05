import { getCustomSession } from "../sessionCode.js";

export async function POST(req) {
    console.log("in the newListing api page");

    const body = await req.json();
    const { itemName, description, category, swapDetails, images } = body;

    //add wishlist in loggedin users data
    let session = await getCustomSession();
    const email = session.email;
    const fullName = session.fullName;

    console.log("Received itemName:", itemName);
    console.log("Received description:", description);
    console.log("Received category:", category);
    console.log("Received swapDetails:", swapDetails);
    console.log("Received images:", images);

    // Validate input
    if (!itemName || !description || !category || !swapDetails) {
        console.log("Invalid input detected");
        return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // =================================================
    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(url);
    const dbName = 'greenerme';

    // Connect to MongoDB
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");
    const db = client.db(dbName);
    const collection = db.collection('newlisting');

    // Insert the Listing data
    const newlisting = {
        itemName,
        description,
        category,
        swapDetails,
        images, // Save image URLs
        userName: fullName,
        email: email,
        dealStatus: 'Open',
        createdAt: new Date(),
    };

    const insertResult = await collection.insertOne(newlisting);
    console.log("Insert result:", insertResult);

    const normalizedCategory = category.toLowerCase();
    const earnedPoints = normalizedCategory === 'small' ? 20 : normalizedCategory === 'medium' ? 50 : normalizedCategory === 'large' ? 100 : 0;

    if (email) { //or use isLoggedin
        
        const collection2 = db.collection('users');
        const pointsUpdateResult = await collection2.updateOne(
            { email: email },
            { $inc: { points: earnedPoints } }
        );
        console.log("Points update result:", pointsUpdateResult);
    }

    // ✅ earnedPoints is now safely used here
    return new Response(JSON.stringify({ data: "inserted", points: earnedPoints }), { status: 200 });

    }