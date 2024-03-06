import fs from 'fs'

const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
        if (err){
            reject(err.message)
        }
        resolve(data)
    }))
}

export {readFileAsync}