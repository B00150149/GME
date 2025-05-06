import bcrypt from 'bcrypt';

export async function GET(req, res) {
    console.log("in the register api page");
    const { searchParams } = new URL(req.url);
    const fullName = searchParams.get('fullName');
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
    const confirmPass = searchParams.get('confirmPass');

    console.log("Received fullName:", fullName);
    console.log("Received email:", email);
    console.log("Received pass:", pass);
    console.log("Received confirmPass:", confirmPass);

    if (!fullName || !email || !pass || !confirmPass) {
      console.log("Invalid input detected");
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    if (pass !== confirmPass) {
      console.log("Password and confirm password do not match");
      return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
    }

    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = 'greenerme';

    try {
      await client.connect();
      console.log("Connected successfully to MongoDB Atlas");

      const db = client.db(dbName);
      const collection = db.collection('users');

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(pass, saltRounds);

      const user = {
         fullName,
         email,
         pass: hashedPassword,
         products: [],
         wishlist: [],
         requests: [],
         points: 50,
         pointsHistory: [`+50 points on registration at ${new Date().toLocaleString()}`],
         createdAt: new Date()
      };

      const insertResult = await collection.insertOne(user);
      console.log("Insert result:", insertResult);

      return new Response(JSON.stringify({
        data: 'inserted',
        email: email,
        points: 50
      }), { status: 200 });

    } catch (error) {
      console.error("Signup error:", error);
      return new Response(JSON.stringify({ data: 'error', error: error.message }), { status: 500 });
    } finally {
      await client.close();
    }
}
