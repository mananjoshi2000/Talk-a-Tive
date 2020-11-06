const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');   
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(bodyParser.urlencoded({extended:false}));

app.use('/',express.static("public"));  

app.post('/chat',(req,res)=>{
    // console.log(req.body.name);
    res.sendFile(path.join(__dirname,'public','chat.html'));
});

var users = [];

io.on("connect",(socket)=>{

    socket.on("user-registered",(username)=>{ 
        // console.log(username);
        // console.log(socket.id);
        users[username] = socket.id;
        io.emit('user-registered',username);
    });
        
    socket.on("message",(data)=>{
        // console.log('in server - message');
        // console.log(data);
        var recieverSocketId = users[data.reciever];
        // console.log(recieverSocketId);

        

        io.to(recieverSocketId).to(data.sender).emit("message",data);
    });
});

server.listen(process.env.PORT || 5000);   
 