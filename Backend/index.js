const express = require('express');
const path = require('path');

require("dotenv").config({
    path: "./.env"
});


const main = require('./aiChating');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

const chattingHistory = {};  
// we will install our user chat history here
// key: value pair
// key = id
// value = array

app.post('/chat', async (req,res)=>{

    const {id, msg} = req.body;

    if(!chattingHistory[id]){
        chattingHistory[id] = [];
    }

    // Extract user history
    const History = chattingHistory[id];  // it return array
    // History + Current sawal     destructure array
    const promptmessage = [...History, {
        role: "user",
        parts: [{text:msg}]
    }];

    const answer = await main(promptmessage);

    // User question ko bhi dalna hai chattingHistory ma
    History.push({role:'user',parts:[{text:msg}]});
    // Model ke response ko bhi insert karana hai
    History.push({role:'model',parts:[{text:answer}]});
    res.send(answer);
})

app.listen(process.env.PORT, ()=>{
    console.log("Listening at port 3000")
})



// format of chatting
// const chattingHistory = {
//     1: [{role:'user', parts: [{text:"hi, how are you"}]},{role:'model', parts: [{text:"I am fine, how are you"}]}],
//     2: [],
//     3: []
// };
