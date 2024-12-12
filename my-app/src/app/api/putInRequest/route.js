import { getCustomSession } from "../sessionCode.js";

export async function GET(req, res) {
    // Make a note we are on 
    // the api. This goes to the console.  
   console.log("in the PutInRequest api page")
 
    // get the values 
    // that were sent across to us. 
   const { searchParams } = new URL(req.url);
   const userName = searchParams.get('userName');
   const userEmail = searchParams.get('userEmail');
   const itemName = searchParams.get('itemName');
  
  

   //add wishlist in loggedin users data
   let session = await getCustomSession();
   const senderEmail = session.email;
   const senderName = session.fullName;

  //  console.log('Received parameters:', { itemName, description, category, swapDetails, images });
   console.log('Received parameters:', { itemName, userName,userEmail });

 
  //  console.log(`Item Name: ${itemName}, Description: ${description}, Category: ${category}, Swap Details: ${swapDetails}, Images:${images} `);
  console.log(`Item Name: ${itemName}, userName: ${userName} `);

if(senderEmail){
  // =================================================
   const { MongoClient } = require('mongodb');
   const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
   const client = new MongoClient(url);
   const dbName = 'greenerme';
 
   
       await client.connect();
       console.log('Connected successfully to server');
       const db = client.db(dbName);
       const collection = db.collection('swapRequests');
 
       const myobj = {
        senderName: senderName,
        senderEmail: senderEmail,
        itemName: itemName,
        userName: userName,
        userEmail: userEmail,
        status: 'Pending',
        DateRequested: new Date(),
        // category: category,
        // swapDetails: swapDetails,
        // images: images
       };
 
       const insertResult = await collection.insertOne(myobj);
       console.log('Insert Result:', insertResult);

       
       //if(senderEmail){ //or use isLoggedin
        const collection1 = db.collection('users');
        // Add the new item to the `items` list for the user
        const updateResult = await collection1.updateOne(
          { email: userEmail }, // Find user by email
          { $push: { requests: insertResult.insertedId } } // Add new item to `wishlist` array
        );

        console.log("Update result:", updateResult);

        if (updateResult.modifiedCount === 0) {
            return new Response(JSON.stringify({ error: "User not found or no update made" }), { status: 404 });
        }
       //}

     //==========================================================
   
      // at the end of the process we need to send something back. 
       return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
      }
      // at the end of the process we need to send something back. 
      return new Response(JSON.stringify({ data: "Can not swap request" }), { status: 500 });
 }
 




 