export default class Router{
    constructor(){
        this.endpoints = {}
    }

    request(method, path, handler){
        if(!this.endpoints[path]){
            this.endpoints[path] = {}
        }

        const endpoint = this.endpoints[path]

        if(endpoint[method]){
            throw new Error(`Такой метод уже есть ${method} по такому адресу ${path}`)
        }

        endpoint[method] = handler
    }

    get(path, handler){
        this.request('GET', path, handler)
    }

    post(path, handler){
        this.request('POST', path, handler)
    }
}