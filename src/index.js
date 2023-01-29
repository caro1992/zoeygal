// arranca la aplicación


require('dotenv').config(); // llama a dotenv y lo primero que hace la app es cargar las variables de entorno(.env). Con process.env.NOMBREVARIABLE se accede a las variables de entorno. Siempre va al inicio y hace más segura la app ya que env lo usamos solo de modo local, la info sensible va siempre en .env
const app = require('./server'); // se importa desde server
require('./database'); // hace funcionar la base de datos


// está a la escucha, conecta al puerto dado por el servidor o al puerto 4000 e imprime respuesta en la consola
app.listen(app.get('port'), () => {
    console.log('Server conectado al puerto', app.get('port'))
})

