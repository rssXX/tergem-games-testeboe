import http from "http"
import EventEmitter from "events"

export default class Application{
    constructor(){
        this.emitter = new EventEmitter()
        this.server = this._createServer()
    }

    listen(port, callback){
        this.server.listen(port, callback)
    }

    addRouter(router){
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method]
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method]
                    handler(req, res)
                })
            })
        })
    }

    _createServer(){
        return http.createServer(async (req, res) => {
                const emitted = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res)
                if(!emitted){
                    res.end()
                }
        })
    }

    _getRouteMask(path, method){
        return `[${path}]:[${method}]`
    }
}