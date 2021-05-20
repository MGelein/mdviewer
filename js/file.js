const fs = nw.require('fs')
const io = {}
const settings = {}

io.readString = async function(url, callback){
    return new Promise((resolve, reject) => {
        fs.readFile(url, {encoding : "utf8"}, (err, data) => {
            if (err) {
                resolve(undefined)
                throw(err)
            }
            else resolve(data)
        })
    })
}

io.saveString = async function(url, data){
    return new Promise((resolve, reject) => {
        fs.writeFile(url, data, 'utf8', (err) => {
            if (err) {
                reject(err)
                throw(err)
            }
            else resolve(true)
        })
    })
}

settings.load = async function(){
    const data = await io.readString("settings.json")
    if(!data) return

    const parsed = JSON.parse(data)
    const keys = Object.keys(parsed)
    for(const key of keys){
        settings[key] = parsed[key]
    }
}

settings.save = async function(){
    const data = JSON.stringify(settings, null, 4)
    return await io.saveString("settings.json", data)
}
