// import path from "path"
// import Application from "./server/Application.js";
// import Router from './server/Router.js'
// import { readFileAsync } from "./server/untils.js";

// const app = new Application()

// const router = new Router()

// router.get('/', async (req, res) => {
//     res.writeHead(200, {'Content-Type': "text/html"});
//     await res.write(readFileAsync(path.join('client', 'index.html')));
//     res.end()
// })

// app.addRouter(router)

// app.listen(3000, () => console.log(`Start http://localhost:3000/`))

// import http from 'http'
// import path from "path"
// import {readFileAsync} from "./server/untils.js"


// http.createServer(async (request, response) => {
//     let data;
//     let type;

//     if (request.url === '/') {
//         data = await readFileAsync(path.join('client', 'index.html'));
//         type = 'text/html'
//     }

//     if (request.url === '/index.css') {
//         data = await readFileAsync(path.join('client', 'index.css'));
//         type = 'text/css'
//     }

//     if (request.url === '/script/main.js') {
//         data = await readFileAsync(path.join('client', 'script', 'main.js'));
//         type = 'text/js'
//     }

//     if (request.url === '/users') {
//         data = await readFileAsync(path.join('client', 'script', 'main.js'));
//         type = 'text/js'
//     }

//     if (request.url === '/users') {
//         data = await readFileAsync(path.join('client', 'script', 'main.js'));
//         type = 'text/js'
//     }

//     if(data){
//         response.writeHead(200, {'Content-Type': type});
//         response.write(data);
//         response.end();
//     }else{
//         response.writeHead(404, {'Content-Type': "text/plain"});
//         response.write("Error 404: Recourse not found!");
//         response.end();
//     }

// }).listen(3000, () => {
//     console.log('Start http://localhost:3000/');
// });






import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Client } = pkg;

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'target',
    password: '',
    port: 5432,
})


app.use(express.json());
app.use(express.static(__dirname + '/client/'))

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get("/api/user", async(req, res) =>{
    const data = await client.query(`SELECT * FROM users
    WHERE status = 'On'
    ORDER BY createat ASC`)
    // console.log(data.rows)
    res.json(data.rows);
});

app.post("/api/user", async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    
    let result = `INSERT INTO users (id, username, email, createat, status) VALUES`
    for (let i = 0; i < req.body.length; i++) {
        const element = req.body[i];
        result += `(${element.id}, '${element.username}', '${element.email}', ${element.createAt}, '${element.status}')`
        if(i < req.body.length - 1){
            result += ','
        }
    }
    // console.log(result);
    await client.query(result)
    res.sendStatus(200);
})


const start = async () =>{
    try{
        await client.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY NOT NULL,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                createAt bigint NOT NULL,
                status VARCHAR(3) NOT NULL
            );
        `)
        app.listen(3000, () => {
            console.log('Start http://localhost:3000/');
        });
    }catch(err){
        console.log(err)
    }
}


start()