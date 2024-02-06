import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

const connection = mysql.createConnection({
  host: "mysql-geovani.alwaysdata.net",
  user: "geovani",
  password: "Americaz#1",
  database: "geovani_mechanic",
});

connection.connect((error) => {
  if (error) {
    console.log("ERROR DE CONEXIÓN", error);
  } else {
    console.log("CONEXIÓN EXITOSA");
  }
});

app.listen(8082, () => {
  console.log("ESCUCHANDO EN EL PUERTO 8082");
});

// ! API PARA EL LOGIN 
app.post('/login', (req, res) => {
  const  email = req.body.email
  const pass  = req.body.pass
  

  const query = 'SELECT * FROM mechanic WHERE email = ? AND pass = ?';
  connection.query(query, [email, pass], (error, results) => {

    if (error) throw error;
    if (results.length > 0) {
      
      const user = results[0];
      res.json({ success: true, role: user.rol_id });
    } else { 
      res.json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});


// ! APIS PARA MECANICOS 

//GET ALL MECHANICS
app.post("/addMechanic", (req, res) => {
  const alias = req.body.alias;
  const surname = req.body.surname;
  const email = req.body.email;
  const pass = req.body.pass;
  const rol_id = req.body.rol_id;

  const AddMechanic = `INSERT INTO mechanic (alias, surname, email, pass, rol_id) VALUES(?, ?, ?, ?, ?)`;

  connection.query(
    AddMechanic,
    [alias, surname, email, pass, rol_id],
    (err, result) => {
      if (err) return res.json({ error: "Error al agregar mecanico", err });
      return res.json({ usuarios: result });
    }
  );
});

app.get("/getUsers/id", (req, res) => {
  const id_mechanic = req.body.id_mechanic;
  const getUsers = `SELECT * FROM mechanic id_mechanic = ?`;
  connection.query(getUsers, [id_mechanic], (err, result) => {
    if (err) return res.json({ error: "error al ver los mecanicos", err });
    return res.json({ usuarios: result });
  });
});

app.get("/viewMechanic", (req, res) => {
  const viewMechanic = `SELECT * FROM mechanic WHERE rol_id = 1`;
  connection.query(viewMechanic, (err, result) => {
    if (err) return res.json({ error: "error al ver los mecanicos", err });
    return res.json({ mecanicos: result });
  });
});

app.delete("/deleteMechanic/:id", (req, res) => {
  const mechanicId = req.params.id;

  const deleteMechanic = `DELETE FROM mechanic WHERE id_mechanic = ?`;
  connection.query(deleteMechanic, [mechanicId], (err, result) => {
    if (err) return res.json({ error: "error al eliminar mecanicos", err });
    return res.json({ mecanicos: result });
  });
});


// ! APIS PARA LOS  MATERIAES
app.post("/addMaterial", (req, res) => {
  const material = req.body.material;
  const precio = req.body.precio;
  const cantidad = req.body.cantidad;

  const addMaterial = `INSERT INTO materials (material, precio, cantidad) VALUES(?, ?, ?)`;

  connection.query(addMaterial, [material, precio, cantidad], (err, result) => {
    if (err) return res.json({ error: "error al agregar material", err });
    return res.json({ material: result });
  });
});

app.get("/viewMaterial", (req, res) => {
  const viewMaterial = `SELECT * FROM materials`;
  connection.query(viewMaterial, (err, result) => {
    if (err) return res.json({ error: "error al ver los mecanicos", err });
    return res.json({ materiales: result });
  });
});

app.put("/updateMaterial/:id", (req, res) => {
  const material = req.body.material;
  const precio = req.body.precio;
  const cantidad = req.body.cantidad;  
  const id_materials = req.params.id;

  const updateMaterial = "UPDATE materials SET material = ?, precio = ?, cantidad = ? WHERE id_materials = ?";

  connection.query(
      updateMaterial,
      [material, precio, cantidad, id_materials],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar", err });
          return res.json({ material: result });
      }
  );
});

app.delete('/delateMaterial/:id',(req,res)=>{
  const id_materials = req.params.id;
  const deleteMaterial = `DELETE FROM materials WHERE id_materials = ?`;
  connection.query(deleteMaterial, [id_materials], (err, result) => {
    if (err) return res.json({ error: "error al eliminar material", err });
    return res.json({ material: result });
  });
})

// !API PARA LOS VEHÍCULOS
app.post("/addVehiculo", (req, res) => {
  const placa = req.body.placa;
  const modelo = req.body.modelo;
  const descripcion = req.body.descripcion;

  const addPlaca = `INSERT INTO vehiculos (placa, modelo, descripcion) VALUES(?, ?, ?)`;

  connection.query(addVehiculo, [placa, modelo, descripcion], (err, result) => {
    if (err) return res.json({ error: "error al agregar vehículo", err });
    return res.json({ vehiculo: result });
  });
});

app.get("/viewVehiculo", (req, res) => {
  const viewVehículo = `SELECT * FROM vehiculos`;
  connection.query(viewVehículo, (err, result) => {
    if (err) return res.json({ error: "error al ver los vehículos", err });
    return res.json({ vehiculos: result });
  });
});

app.put("/updateVehiculo/:id", (req, res) => {
  const placa = req.body.placa;
  const modelo = req.body.modelo;
  const descripcion = req.body.descripcion;  
  const id_vehiculo = req.params.id;

  const updateMaterial = "UPDATE vehiculos SET placa = ?, modelo = ?, descripcion = ? WHERE id_vehiculo  = ?";

  connection.query(
      updateMaterial,
      [placa, modelo, descripcion, id_vehiculo],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar vehículo", err });
          return res.json({ vehiculo: result });
      }
  );
});

app.delete('/delateVehiculo/:id',(req,res)=>{
  const id_vehiculo = req.params.id;
  const deleteVehiculo = `DELETE FROM vehiculo WHERE id_vehiculo = ?`;
  connection.query(deleteVehiculo, [id_vehiculo], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el vehículo", err });
    return res.json({ vehiculo: result });
  });
})

// ! APIS PARA TIPO  DE REPARACIONES
app.post("/addTipoReparacion", (req, res) => {
  const nombre_tipo_reparacion = req.body.nombre_tipo_reparacion;
  const detalles_tipo_reparacion = req.body.detalles_tipo_reparacion;
  const precio_tipo_reparacion = req.body.precio_tipo_reparacion;
 

  const addReparacion = `INSERT INTO tipo_reparacion (nombre_tipo_reparacion, detalles_tipo_reparacion, precio_tipo_reparacion) VALUES(?, ?, ?)`;

  connection.query(addReparacion, [nombre_tipo_reparacion, detalles_tipo_reparacion, precio_tipo_reparacion], (err, result) => {
    if (err) return res.json({ error : "error el tipo de reparacion", err });
    return res.json({ tipo_reparacion : result });
  });
});

app.get("/viewTipoReparacion", (req, res) => {
  const viewVehículo = `SELECT * FROM tipo_reparacion`;
  connection.query(viewVehículo, (err, result) => {
    if (err) return res.json({ error: "error al ver las reparaciones", err });
    return res.json({ tipo_reparacion: result });
  });
});

app.put("/updateTipoReparacion/:id", (req, res) => {
  const nombre_tipo_reparacion = req.body.nombre_tipo_reparacion;
  const detalles_tipo_reparacion = req.body.detalles_tipo_reparacion;
  const precio_tipo_reparacion = req.body.precio_tipo_reparacion;  
  const id_tipo_reparacion = req.params.id;

  const updateTipoReparacion = "UPDATE tipo_reparacion SET nombre_tipo_reparacion = ?, detalles_tipo_reparacion = ?, precio_tipo_reparacion = ? WHERE id_tipo_reparacion  = ?";

  connection.query(
      updateTipoReparacion,
      [nombre_tipo_reparacion, modelo, descripcion, id_vehiculo],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar el tipo de reparacion", err });
          return res.json({ tipo_reparacion: result });
      }
  );
});

app.delete('/delateTipoReparacion/:id',(req,res)=>{
  const id_tipo_reparacion = req.params.id;
  const deleteTipoReparacion = `DELETE FROM tipo_reparacion WHERE id_tipo_reparacion = ?`;
  connection.query(deleteTipoReparacion, [id_tipo_reparacion], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el tipo de reparacion", err });
    return res.json({ tipo_reparacion: result });
  });
})


// ! API PARA TRABAJO


// ! API REPARACIÓN - MATERIAL


