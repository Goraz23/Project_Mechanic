import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());

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

app.post('/addMechanic',(req,res)=>{

    const alias = req.body.alias
    const surname = req.body.surname
    const email = req.body.email
    const pass = req.body.pass
    const rol_id = req.body.rol_id

    const AddMechanic = `INSERT INTO mechanic (alias, surname, email, pass, rol_id) VALUES(?, ?, ?, ?, ?)`

    connection.query(AddMechanic,[alias, surname, email, pass, rol_id], (err, result)=>{

        if(err) return res.json({error: 'Error al agregar mecanico', err})
         return res.json({usuarios: result})

    })
})

app.get('/viewMechanic',(req,res)=>{
    const viewMechanic = `SELECT * FROM mechanic WHERE rol_id = 1`
    connection.query(viewMechanic,(err,result)=>{
        if(err)  return res.json({error: 'error al ver los mecanicos', err})
        return res.json({mecanicos: result})
    })
})

app.listen(8082, () => {
    console.log('ESCUCHANDO EN EL PUERTO 8082');
});


