var socket = io();

document.querySelector('.name-box').addEventListener('submit',(e)=>{
    var username = document.querySelector('.username');
 
    socket.emit('userEntered',username.value);

});

module.exports = ()=>{
    return username;
}
