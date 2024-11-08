export async function GET(req, res) {


    // Make a note we are on
  
    // the api. This goes to the console.
  
    console.log("in the api page")
  
   let status = 0
  
    // get the values
  
    // that were sent across to us.
  
    const { searchParams } = new URL(req.url)
  
    const username = searchParams.get('username')
  
    const pass = searchParams.get('pass')
  
  
    console.log(username);
  
    console.log(pass);
  
  
  
   
  
  
    // database call goes here



    const { MongoClient, ServerApiVersion } = require('mongodb');
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(url);

 

 

    const dbName = 'greenerme'; // database name
  
  
    await client.connect();
  
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
  
    const collection = db.collection('users'); // collection name
  
  
  
    const findResult = await collection.find({"username": username}).toArray();
  
    console.log('Found documents =>', findResult);
  
  
    let valid = false
  
    if(findResult.length >0 ){
  
            valid = true;
  
            console.log("login valid")
  
    } else {
  
  
          valid = false;
  
          console.log("login invalid")
  
    }
  
  
  
   //==========================================================
  
  
  
  
    // at the end of the process we need to send something back.
  
    return Response.json({ "data":"" + valid + ""})
  
  }
  
  