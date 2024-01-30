import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(cors());

const connection = mysql.createConnection({
    host: 'mysql-geovani.alwaysdata.net',
    user: 'geovani',
    password: 'Americaz#1',
    database: 'geovani_mechanic'
});

connection.connect((error) => {
    if (error) {
        console.log("ERROR DE CONEXIÓN", error);
    } else {
        console.log("CONEXIÓN EXITOSA");
    }
});

app.listen(8082, () => {
    console.log('ESCUCHANDO EN EL PUERTO 8082');
});
