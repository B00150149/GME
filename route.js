export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
     console.log("in the register api page")
     // get the values
     // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const fullName = searchParams.get('fullName');
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
    const confirmPass = searchParams.get('confirmPass');
    //const address = searchParams.get('address');
   // const num = searchParams.get('num');

    console.log("Received fullName:", fullName);
    console.log("Received email:", email);
    console.log("Received pass:", pass);
    console.log("Received confirmPass:", confirmPass);
    // console.log("Received address:", address);
    // console.log("Received phone number:", num);

    // Validate input
    if (!fullName || !email || !pass || !confirmPass ) {
      console.log("Invalid input detected");
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }
  
    // =================================================
    const { MongoClient } = require('mongodb');
      const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(url);
    const dbName = 'greenerme';
    try {
      // Connect to MongoDB
      await client.connect();
      console.log("Connected successfully to MongoDB Atlas");
  
      const db = client.db(dbName);
      const collection = db.collection('users');
  
      // Insert the user data
      const user = { fullName, 
         email,
         pass, 
         confirmPass, 
         products: [], 
         wishlist: [], 
         requests: [] ,
         points: 50,
         pointsHistory: [`+50 points on registration at ${new Date().toLocaleString()}`],
         createdAt: new Date() };
      // Check if the user already exist
      
      const insertResult = await collection.insertOne(user);

      console.log("Insert result:", insertResult);

      return new Response(JSON.stringify({
        data: 'inserted',
        email: email,     // <--- Include the email in response
        points: 50        // <--- Include starting points
      }), { status: 200 });


    } catch (error) {
      console.error("Signup error:", error);
      return new Response(JSON.stringify({ data: 'error', error: error.message }), { status: 500 });
    } finally {
      await client.close();
    }

  }  
  
 