const http = require('http');
const fs = require('fs');

fs.readFile('./index.html', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    }
    if (data) {
        const server = http.createServer((req, res) => {
            console.log(req.url);
            res.end(data);
        });

        let messages = [];
        const io = require('socket.io')(server);

        io.on('connection', client => {
            console.log('User Connected');
            client.on('send', (msg) => {
                messages.push(msg); 
                io.emit("message", messages);
            });
            client.on("firstload", () => {
                client.emit("message", messages);
            });
        });
        server.listen(3000);
    }
});

