import http from 'http'
import fs from 'fs'
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
        if (err){
            reject(err.message)
        }
        resolve(data)
    }))
}

http.createServer(async (request, response) => {
    let data;
    let type;

    if (request.url === '/') {
        data = await readFileAsync(path.join(__dirname, 'index.html'));
        type = 'text/html'
    }

    if (request.url === '/client/index.css') {
        data = await readFileAsync(path.join(__dirname, 'client', 'index.css'));
        type = 'text/css'
    }

    if (request.url === '/client/script/main.js') {
        data = await readFileAsync(path.join(__dirname, 'client', 'script', 'main.js'));
        type = 'text/js'
    }

    if(data){
        response.writeHead(200, {'Content-Type': type});
        response.write(data);
        response.end();
    }else{
        response.writeHead(404, {'Content-Type': "text/plain"});
        response.write("Error 404: Recourse not found!");
        response.end();
    }

}).listen(3000, () => {
    console.log('Start http://localhost:3000/');
});