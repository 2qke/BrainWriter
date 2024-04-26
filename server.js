const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Statik dosyalar için 'public' klasörünü kullanın
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı'); // Bağlantıyı izleyin
    io.emit('user_connected', '<i class="fas fa-user-plus"></i> Bir kullanıcı bağlandı'); // Kullanıcı bağlanınca mesaj

    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı'); // Ayrılmayı izleyin
        io.emit('user_disconnected', '<i class="fas fa-user-minus"></i> Bir kullanıcı ayrıldı'); // Ayrılanları bildirin
    });
});

server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
