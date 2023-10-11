const Chat = require("./models/chat.js")

const mongoose = require("mongoose");

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

let allChats = ([
    {
    from : "neha",
    to : "priya",
    msg : "send me your exam sheets",
    created_at: new Date()
    },
    {
        from : "meha",
        to : "priyu",
        msg : "sing musinc",
        created_at: new Date()
    },
    {
        from : "seha",
        to : "petrer",
        msg : "send me ur photos",
        created_at: new Date()
    },

])
Chat.insertMany(allChats);