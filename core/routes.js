const express = require('express')//подключаем пакеты
const socket = require('socket.io');


module.exports = (app, io) => {
  app.use(express.json({extended: true})) // для того чтобы body был не индерфинет

  app.use('/api/auth', require('../routes/auth.routes'))
  app.use('/api/playrooms', require('../routes/playrooms.routes'))
  app.use('/api/game21', require('../routes/game21.routes'))
};
