// conexión de mongoose

const mongoose = require('mongoose');

// a la base de datos, mediante process.env. se hace de forma segura y lo toma de .env
// const MONGODB_URI = process.env.MONGODB_URI;
// const ZOEYGAL_MONGODB_HOST = process.env.ZOEYGAL_MONGODB_HOST;
// const ZOEYGAL_MONGODB_DATABASE = process.env.ZOEYGAL_MONGODB_DATABASE;
// esta configuración se puede resumir: process.env es un objeto, llamo a las siguientes características del mismo
const {ZOEYGAL_MONGODB_HOST, ZOEYGAL_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${ZOEYGAL_MONGODB_HOST}/${ZOEYGAL_MONGODB_DATABASE}`; // la cadena de conexión es mongodb y se concatena con el host (ahora localhost pero puede cambiar por una IP) y con la base de datos 


mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, {
})
.then(db => console.log('Base de datos conectada'))
.catch(err=> console.log(err));

