import bcrypt from 'bcrypt';
import { getCustomSession } from '../sessionCode.js';

export async function GET(req, res) {
    console.log("in the login api page");
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
    console.log(email);
    console.log(pass);

    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = 'greenerme';

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');

    // Find user by email only
    const user = await collection.findOne({ email: email });

    let valid = false;
    if (user) {
        // Compare provided password with hashed password
        const match = await bcrypt.compare(pass, user.pass);
        if (match) {
            let session = await getCustomSession();
            session.email = email;
            session.fullName = user.fullName;
            await session.save();
            console.log(session.email);
            console.log(session.fullName);

            valid = true;
            console.log("login valid");

            if (user.wishlist.length > 0) {
                console.log("Wishlist:", user.wishlist);
                const collectionw = db.collection('wishlist');
                user.wishlist.map((item) =>
                    collectionw.insertOne(item)
                );
            }
        } else {
            valid = false;
            console.log("login Invalid - password mismatch");
        }
    } else {
        valid = false;
        console.log("login Invalid - user not found");
    }

    return new Response(JSON.stringify({ status: valid }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
