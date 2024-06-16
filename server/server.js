const http=require('http')
const app=require('./app')
const {connectDB} = require('./config/DBConnect')
require('dotenv').config({path:'./.env'})


const server=http.createServer(app)

const PORT=process.env.SERVER_PORT


async function start_server(){
   await connectDB().catch(error => console.log(error));
   
   server.listen(PORT,()=>{
    console.log(`Server listening to PORT:${PORT}`)
   })
}

start_server();


