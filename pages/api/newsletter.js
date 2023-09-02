const { MongoClient } = require('mongodb');

const emailAPI = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email!" });
    }

    const url = 'mongodb+srv://mshaheeruddin:shaheer99@cluster0.oiwuu30.mongodb.net/'
    const client = new MongoClient(url);
    await client.connect()
    const db = client.db('events');
    await db.collection("emails").insertOne({ email: userEmail });

    client.close
    
    res.status(201).json({ message: userEmail });

  }
};

export default emailAPI;
