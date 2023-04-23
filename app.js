const express= require("express")

const mongoose = require('mongoose');
const cors= require("cors")
const registerRoute= require("./Route/registerRoute")
const routes= require("./Route/routes")

mongoose.connect('mongodb+srv://pratiktalware:12345@cluster0.9vfi0pq.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));

const app= express()
const port= 8081 || process.env.PORT

app.use(cors("*"))
app.use("/api", registerRoute)
app.use("/api", routes)

app.listen(port, ()=>console.log(`App is listening on port ${port}`))