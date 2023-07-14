const { UnixSocket } = require('./unix_socket')
const socket_file_path = `/tmp/unix.sock`
const socket = new UnixSocket(socket_file_path)

//Send data
async function write(data) {
  await socket.write(data)
}

(async() => {
  const data = process.argv[3] || 'HELLO UNIX DOMAIN SOCKET!!'

  await write(JSON.stringify(data))
})();