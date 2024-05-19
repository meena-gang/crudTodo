const express = require("express");
const fs = require('fs');
const { todo } = require("node:test");

const server = express();
server.use(express.json());

server.get('/todos',(req,res) => { // Here we are sendig all todos from db.json file when user request through /todos url
    const data = JSON.parse(fs.readFileSync('./db.json','utf-8'));
    console.log(data.todos);
    res.send(data.todos);
})
server.post('/todos',(req,res) => {  // Here user can add/post todos to db.json file when user request through /todos url and send todo data in body
    console.log(req.body);
    const data = JSON.parse(fs.readFileSync('./db.json','utf-8'));
    data.todos.push(req.body);
    fs.writeFileSync('./db.json',JSON.stringify(data));
    res.send(data.todos);
})
server.patch('/todos/even',(req,res) => { // Here we are updating the status of all todos from db.json file where id is even.
    const data = JSON.parse(fs.readFileSync('./db.json','utf-8'));
    console.log(data,'hrthgrt');
    data.todos.forEach((todo) => {
        if (todo.id % 2 === 0 && todo.status === false) {
          todo.status = true;
        }
      });
    fs.writeFileSync('./db.json',JSON.stringify(data));
    res.send(data.todos);
})
server.delete('/todos/delete',(req,res) => { // Here we are deleting all todos whose status is true.
    const data = JSON.parse(fs.readFileSync('./db.json','utf-8'));
    data.todos = data.todos.filter(todo => todo.status !== true);
    fs.writeFileSync('./db.json',JSON.stringify(data));
    res.send(data.todos);
});

server.listen(3000,() => {
    console.log('Server is running on port 3000');
})