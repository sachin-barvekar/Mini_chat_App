const express= require("express");
const app = express();
const Chats = require("./models/chat.js")

const mongoose = require("mongoose");
const methodOverride = require("method-override");

const port =8080;

const path = require("path")
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public"))) //serve css file in the public folder
app.use(express.urlencoded({extended:true})); //for parse the data which are in the req.body
app.use(methodOverride("_method"))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
.then(()=>{
    console.log("connection successful")
})
.catch((err)=>{
    console.log(err)
}
)

app.get("/",(req ,res)=>{
    res.send("working")
})

//Index Route
app.get("/chats", async (req, res)=>{
    let chats = await Chats.find(); //chat.find() imorts data from database so it is async fuction
    res.render("index.ejs", {chats})
})

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

//create route
app.post("/chats",(req, res)=>{
    let {from, msg, to}=req.body;
    let newChat = new Chats({ //create chat object
        from : from,
        msg : msg,
        to : to,
        created_at: new Date()
    })
    newChat.save() // save is async process but no need to write await and async keyword because we use then so no need to write, when we use then js know process is async process
    .then((res)=>{
        console.log("chat was saved")
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats")
})

//edit route & update route
app.get("/chats/:id/edit", async (req, res)=>{
    let {id}= req.params;
    let chat =await Chats.findById(id);
    res.render("edit.ejs", {chat})
})

app.put("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat= await Chats.findByIdAndUpdate(id, {msg: newMsg},{runValidators: true, new: true})
    console.log(updatedChat)
    res.redirect("/chats")
}) 

//destroy route
app.delete("/chats/:id",async (req, res)=>{
    let {id}=req.params;
    let deletedChat= await Chats.findByIdAndDelete(id);
    console.log(deletedChat)
    res.redirect("/chats")
})
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})
