const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
// const fileUpload = require('express-fileUpload');
require('dotenv').config();


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwkyk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwkyk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static('carRepairImg'));
// app.use(fileUpload());

const port = 5000;


app.get('/', (req, res) =>{
    res.send("hello i'm from Car Repair");
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  // console.log(err);

  const serviceCollection = client.db("CarRepair").collection("Service");
  const reviewsCollection = client.db("CarRepair").collection("Reviews");

  const serviceItemsCollection = client.db("CarRepair").collection("ServiceItems");
  const productItemsCollection =client.db("CarRepair").collection("ProductItems");

  const adminsCollection =client.db("CarRepair").collection("allAdmin");
  

  app.post('/addAdmins', (req, res) => {
    const adminDetails = req.body;
    console.log(req.body);
    adminsCollection.insertOne(adminDetails)
    .then(result => {
        console.log(result)
        res.send(result.insertedCount > 0);
    })
})


app.get('/getAdmin', (req, res) => {
  adminsCollection.find()
    .toArray((err, review) => {
      res.send(review)
      // console.log('from database', review);
    })
})



  app.post('/bookService', (req, res) => {

      const bookService = req.body;
      // console.log(req.body);
      serviceCollection.insertOne(bookService)
      .then(result => {
          // console.log(result)
          res.send(result.insertedCount > 0);
      })
  })

  app.get('/bookings', (req, res) => {
    console.log(res.body)
    serviceCollection.find()
      .toArray((err, items) => {
        res.send(items)
        // console.log('from database', items);
      })
  })

  app.post('/addReviews', (req, res) => {
      const bookService = req.body;
      // console.log(req.body);
      reviewsCollection.insertOne(bookService)
      .then(result => {
          console.log(result)
          res.send(result.insertedCount > 0);
      })
  })

  app.get('/addReviews', (req, res) => {
    reviewsCollection.find()
      .toArray((err, review) => {
        res.send(review)
        // console.log('from database', review);
      })
  })


  app.post('/addServiceItem', (req, res) => {
    // const file = req.files.file;
    // const name = req.body.name;
    // const email = req.body.email;
    // console.log(file, name, email);
    // file.mv(`${__dirname}/carRepairImg/${file.name}`, err => {
    //   if(err){
    //     console.log(err);
    //     return res.status(500).send({msg: 'Faild to upload'});
    //   }
    //   return res.send({name: file.name, path: `/${file.name}`});
    // })
    
    const bookService = req.body;
    serviceItemsCollection.insertOne(bookService)
    .then(result => {
        console.log(result)
        res.send(result.insertedCount > 0);
    })
})

app.get('/getServiceItem', (req, res) => {
  serviceItemsCollection.find()
    .toArray((err, review) => {
      res.send(review)
      // console.log('from database', review);
    })
})

app.post('/isAdmin', (req, res) => {
  const email = req.body.email;
  console.log(email);
  adminsCollection.find({email:email})
  .toArray((err, admin) => {
    res.send(admin.length>0)
  })
})



});

app.listen(3011)