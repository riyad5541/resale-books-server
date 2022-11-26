const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wynhew4.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const allCategoriesCollection = client.db('resalebooks').collection('allCategories')
        const booksCollection = client.db('resalebooks').collection('books')
        
        app.get('/allCategories',async(req, res) =>{
            const query = {};
            const categories = await allCategoriesCollection.find(query).toArray();
            res.send(categories);
        });

        app.get("/category/:id", async (req, res) =>{
            const id = req.params.id;
            const query = {categoryId: id};
            const books = await booksCollection.find(query).toArray();
            res.send(books);
        })

    }
    finally{

    }
}
run().catch(console.log);


app.get('/',async(req, res) =>{
    res.send('resale books server is running');
})

app.listen(port, ()=> console.log(`Resale books server running on ${port}`))
