export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
     console.log("in the newListing api page")
     // get the values
     // that were sent across to us.

    const { searchParams } = new URL(req.url);
    const itemName = searchParams.get('itemName');
    const description = searchParams.get('description');
    const category = searchParams.get('category');
    const swapDetails = searchParams.get('swapDetails');
    const images = searchParams.getAll('images'); // Handle multiple files if needed


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
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = 'greenerme';
  
      // Connect to MongoDB
      await client.connect();
      console.log("Connected successfully to MongoDB Atlas");  
      const db = client.db(dbName);
      const collection = db.collection('newlisting');
  
      // Insert the Listing data
      const newlisting = { itemName,
        description,
        category,
        swapDetails,
        images, // Save file names or metadata
        createdAt: new Date(), };

      const insertResult = await collection.insertOne(newlisting);
  
      console.log("Insert result:", insertResult);
  
      // Return success response
      return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
   
  }
  

