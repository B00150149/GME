import { MongoClient, ObjectId } from 'mongodb';



export async function GET(req, { params }) {
  const { email } = await params; // Extract email from the route parameters

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
  }

  const mongoUrl = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(mongoUrl);
  const dbName = 'greenerme';

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');

    const db = client.db(dbName);
    const usersCollection = db.collection('users'); // Collection name
    const productsCollection = db.collection('products'); // Products collection
    const swapRequestsCollection = db.collection('swapRequests'); // Swap requests collection

    // Find the user by their email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Find products uploaded by the user
    const products = await productsCollection.find({ uploaderEmail: email }).toArray();

    // Find swap requests where user is involved and dealStatus is 'Sold'
    let swappedItems = await swapRequestsCollection.find({
      $and: [
        { dealStatus: 'Sold' },
        { $or: [{ senderEmail: email }, { receiverEmail: email }] }
      ]
    }).toArray();

    // Enrich swappedItems with item names from newlisting collection
    const newlistingCollection = db.collection('newlisting');

    swappedItems = await Promise.all(swappedItems.map(async (swap) => {
      let itemName = 'Unknown Item';
      let swapItemName = 'Unknown Item';

      try {
        const itemDoc = await newlistingCollection.findOne({ _id: new ObjectId(swap.itemId) });
        if (itemDoc && itemDoc.itemName) {
          itemName = itemDoc.itemName;
        }
      } catch (e) {
        console.error('Error fetching itemDoc:', e);
      }

      try {
        const swapItemDoc = await newlistingCollection.findOne({ _id: new ObjectId(swap.swapItemId) });
        if (swapItemDoc && swapItemDoc.itemName) {
          swapItemName = swapItemDoc.itemName;
        }
      } catch (e) {
        console.error('Error fetching swapItemDoc:', e);
      }

      return {
        ...swap,
        itemName,
        swapItemName,
      };
    }));

    // Add products and swappedItems to user object
    user.products = products;
    user.swappedItems = swappedItems;

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    await client.close();
  }
}
