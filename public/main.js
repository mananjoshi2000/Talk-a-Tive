
var socket = io();

var A = [];

// To get username
var params = new URLSearchParams(window.location.search);
var clientUsername = params.get('username');

var sender,reciever;

socket.emit('user-registered',clientUsername);

socket.on('user-registered', username =>{

    A.push(username);
    var user_list = document.createElement('button');
    user_list.classList.add('user-list');
    user_list.classList.add(`${username}`);
    user_list.innerHTML = `<p>${username}</p>`;
    document.querySelector('.chat-participants').appendChild(user_list);
})


socket.on('connect',()=>{
    sender = socket.id;
});

socket.on('message',(data)=>{
        
    var div = document.createElement('div');
    div.classList.add("message");
    
    // console.log(clientUsername + 'AAAAAA' + data.clientUsername);

    if(clientUsername === data.clientUsername)
        data.clientUsername = 'You';

    div.innerHTML = `<p class="username"> ${data.clientUsername} <small>${data.time}</small></p>
                        <p>${data.message}</p>`
    document.querySelector('.chat-messages').appendChild(div);

    document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight
});

document.querySelector('.chat-participants').addEventListener('click',(e)=>{

    e.preventDefault();
    reciever = e.target.textContent;
})

document.querySelector('.message-form').addEventListener('submit',(e)=>{

    e.preventDefault();

    // To get username
    // var params = new URLSearchParams(window.location.search);
    // clientUsername = params.get('username');

    // To get Time
    var today = new Date();
    var time = today.getHours() + ':' + today.getMinutes();

    var message = document.querySelector('.message-input').value;
    // console.log('At client JS : '+message);
    socket.emit('message',{clientUsername, time, message, sender, reciever});

    message = '';
    document.querySelector('.message-input').focus(); 
});

// document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight