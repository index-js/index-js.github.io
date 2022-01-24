const cProcess = require('child_process')
const fs = require('fs')


let child
const restart = () => {
    child && process.kill(child.pid)
    child = cProcess.fork('build.js')
}

restart()

fs.watch('./views', { recursive: true }, restart)
fs.watch('./public', { recursive: true }, restart)
