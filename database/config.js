const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('BD conectada');
    } catch (err) {
        console.log(err);
        throw new Error('Error en la conexión a la base datos ');
    }

}


module.exports = {
    dbConnection
}