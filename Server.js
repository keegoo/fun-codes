const net = require('net')

const HOST = '127.0.0.1'
const PORT = 6969

const server = net.createServer()
server.listen(PORT, HOST)

server.on('connection', sock => {
  console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`)

  sock.on('data', data => {
    console.log(`DATA ${sock.remoteAddress}: ${data}`)
    sock.write(`You said "${data}"`)
  })

  sock.on('close', data => {
    console.log(`CLOSE: ${sock.remoteAddress}:${sock.remotePort}`)
  })
})