import { getCustomSession } from "../sessionCode.js";  // Assuming session handling code exists

export async function GET(req, res) {
  console.log("in the review api page");
  
  const { searchParams } = new URL(req.url);
  const reviewText = searchParams.get('reviewText');
  const rating = searchParams.get('rating');
  const images = searchParams.getAll('images'); // Handle multiple file uploads if needed

  // Get session details (user data)
  let session = await getCustomSession();
  const email = session.email;
  const fullName = session.fullName;

  console.log("Received reviewText:", reviewText);
  console.log("Received rating:", rating);
  console.log("Received images:", images);

  // Validate input
  if (!reviewText || !rating) {
    console.log("Invalid input detected");
    return new Response(JSON.stringify({ error: "Review text and rating are required" }), { status: 400 });
  }

  // Connect to MongoDB
  const { MongoClient } = require('mongodb');
  const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(url);
  const dbName = 'greenerme';

  await client.connect();
  console.log("Connected to MongoDB Atlas");

  const db = client.db(dbName);
  const reviewCollection = db.collection('reviews'); // 'reviews' collection for storing reviews

  const newReview = {
    reviewText,
    rating,
    images, // Optionally store image URLs or binary data
    userName: fullName,
    email: email,
    createdAt: new Date(),
  };

  const insertResult = await reviewCollection.insertOne(newReview);
  console.log("Review insert result:", insertResult);

  if (email) {
    // Optionally add review to the user's profile
    const userCollection = db.collection('users');
    const updateResult = await userCollection.updateOne(
      { email: email },
      { $push: { reviews: insertResult.insertedId } } // Add the review ID to the user's 'reviews' array
    );

    console.log("User update result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found or no update made" }), { status: 404 });
    }
  }

  return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
}
