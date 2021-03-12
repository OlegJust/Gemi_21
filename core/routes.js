const express = require('express')//подключаем пакеты


module.exports = (app, io) => {
  app.use(express.json({extended: true})) // для того чтобы body был не индерфинет

  app.use('/api/auth', require('../routes/auth.routes'))
  app.use('/api/playrooms', require('../routes/playrooms.routes'))
  app.use('/api/game21', require('../routes/game21.routes'))
  app.use('/api/game21/:roomId', require('../routes/getRooms.routes'))
  // app.use('/api/game21/:roomId', require('../routes/postRooms.routes'))
};
