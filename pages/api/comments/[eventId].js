import { MongoClient  } from "mongodb"


async function handler(req,res) {
    const eventId = req.query.eventId

    const url = 'mongodb+srv://mshaheeruddin:shaheer99@cluster0.oiwuu30.mongodb.net/'
    const client = new MongoClient(url);
    await client.connect()
    const db = client.db('events');
    
    
    
    
    
    if(req.method === 'POST') {
      //add server side validation
      const {email, name, text} = req.body
      
      
      if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
        res.status(422).json({message: 'Invalid Input!'})
        return
      }
      console.log(email, name, text) 
      const newComment = {
        email,
        name,
        text
      }
      
      const result = await db.collection("comments").insertOne(newComment);
      
      newComment.id = result.insertedId
      
      console.log(newComment)
      res.status(201).json({message: 'Added comment', comment: newComment})
      
    }

    if(req.method === 'GET') {
      const findResult = await db.collection('comments').find().sort({ _id: -1}).toArray()
      
      res.status(200).json({comments: findResult})
    }
    
    client.close()
  }
  
export default handler