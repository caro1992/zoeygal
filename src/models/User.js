// esquema de las notas que vamos a guardar en la db
// del módulo mongoose llamamos lo que vamos a usar (características o clases). Schema permite definir qué guardo dentro de mongodb y model crea una clase para tener métodos y propiedades. Con ambos defino un modelo de datos
const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs'); //así se importa todo el módulo, sino se hace como arriba

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true, unique:true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {
    timestamps: true
});


// con .methods se define métodos para la clase creada (User). Se crea una función que va a recibir como parámetro la contraseña enviada y mediante bcryptjs se va a cifrar. De bcrypt se hace un hash, que necesita un string (qué es lo que quiero cifrar, el password) y un salt (el string en el que se basa para crear el cifrado, debo generarlo con genSalt, por default 10). Se hace de manera asíncrona

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10); 
    return await bcrypt.hash(password, salt);
};

//guardar contraseña cifrada. Cuando el usuario se loguee encriptar la contraseña y compararla con la de la base de datos

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password); // si devuelve true significa que coinciden y el usuario puede ingresar
    
}


module.exports = model('User', UserSchema);