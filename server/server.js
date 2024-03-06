import http from 'http'
import path from "path"
import {readFileAsync} from "./untils.js"


http.createServer(async (request, response) => {
    let data;
    let type;

    if (request.url === '/') {
        data = await readFileAsync(path.join('client', 'index.html'));
        type = 'text/html'
    }

    if (request.url === '/index.css') {
        data = await readFileAsync(path.join('client', 'index.css'));
        type = 'text/css'
    }

    if (request.url === '/script/main.js') {
        data = await readFileAsync(path.join('client', 'script', 'main.js'));
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