const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        /* define los endpoints de la api */
        this.paths = {
            angular: '/',
            auth: '/api/auth',
            nota: '/api/notas'
        }

        /* conexión a db */
        this.dbConnect();

        /* middlewares */
        this.middlewares();

        /* rutas */
        this.routes();

    }


    async dbConnect() {
        await dbConnection();
    }

    /* configura los middlewares que se utilizarán */
    middlewares() {

        /* cors */
        this.app.use(cors());
        /* body parse */
        this.app.use(express.json());
        /* directorio público */
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.paths.angular, require('../routes/angular'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.nota, require('../routes/nota'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;