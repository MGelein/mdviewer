const print = console.log

window.onload = ()=>{
    stuff()
}

async function stuff(){
    await settings.load()
    settings.anotherSetting = "manman!"
    await settings.save()
}
