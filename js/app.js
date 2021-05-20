const print = console.log

window.onload = ()=> { setup() }

async function setup(){
    await settings.load()
}