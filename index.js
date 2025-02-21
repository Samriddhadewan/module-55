const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express());

// dewansamriddha
// JtzaqJmY5Yt8JfzV
app.get("/", (req, res) =>{
    res.send("a simple crud is running");
})

app.listen(port, ()=> {
    console.log(`a simple curd server is running in port ${port}`)
})