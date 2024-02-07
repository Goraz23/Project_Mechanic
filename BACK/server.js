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
      console.log(user)
      res.json({ success: true, alias:user.alias, surname: user.surname , role: user.rol_id, token:'isAuth' });
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

app.put("/updateMechanic/:id", (req, res) => {
  const alias = req.body.alias;
  const surname = req.body.surname;
  const email = req.body.email;
  const pass = req.body.pass;
  const id_mechanic = req.params.id;

  const updateMechanic = "UPDATE mechanic SET alias = ?, surname = ?, email = ?, pass = ? WHERE id_mechanic = ?";

  connection.query(
      updateMechanic,
      [alias, surname, email, pass, id_mechanic ],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar", err });
          return res.json({ mechanic: result });
      }
  );
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

  const addVehiculo = `INSERT INTO vehiculos (placa, modelo, descripcion) VALUES(?, ?, ?)`;

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
  const id_vehiculos = req.params.id;

  const updateVehiculo = "UPDATE vehiculos SET placa = ?, modelo = ?, descripcion = ? WHERE id_vehiculos  = ?";

  connection.query(
      updateVehiculo,
      [placa, modelo, descripcion, id_vehiculos],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar vehículo", err });
          return res.json({ vehiculo: result });
      }
  );
});

app.delete('/delateVehiculo/:id',(req,res)=>{
  const id_vehiculos = req.params.id;
  const deleteVehiculo = `DELETE FROM vehiculos WHERE id_vehiculos = ?`;
  connection.query(deleteVehiculo, [id_vehiculos], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el vehículo", err });
    return res.json({ vehiculos: result });
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
      [nombre_tipo_reparacion, detalles_tipo_reparacion, precio_tipo_reparacion, id_tipo_reparacion],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar el tipo de reparacion", err });
          return res.json({ tipo_reparacion: result });
      }
  );
});

app.delete('/deleteTipoReparacion/:id',(req,res)=>{
  const id_tipo_reparacion = req.params.id;
  const deleteTipoReparacion = `DELETE FROM tipo_reparacion WHERE id_tipo_reparacion = ?`;
  connection.query(deleteTipoReparacion, [id_tipo_reparacion], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el tipo de reparacion", err });
    return res.json({ tipo_reparacion: result });
  });
})

//!Apis para TRABAJOS

app.post("/addTrabajo", (req, res) => {
  const nombre_trabajo = req.body.nombre_trabajo;
  const descripcion_trabajo = req.body.descripcion_trabajo;
  const fecha_inicio = req.body.fecha_inicio;
  const fecha_final =  req.body.fecha_final;
  const mechanic_id = req.body.mechanic_id;
  const vehiculos_id = req.body.vehiculos_id;

  const addTrabajo = `INSERT INTO trabajos (nombre_trabajo, descripcion_trabajo, fecha_inicio, fecha_final, mechanic_id, vehiculos_id) VALUES(?, ?, ?, ?, ?, ?)`;

  connection.query(addTrabajo, [nombre_trabajo, descripcion_trabajo, fecha_inicio,fecha_final, mechanic_id, vehiculos_id], (err, result) => {
    if (err) return res.json({ error : "error al agregar trabajo", err });
    return res.json({ trabajo : result });
  });
});

app.get("/viewTrabajos", (req, res) => {
  const viewTrabajos = `SELECT * FROM trabajos`;
  connection.query(viewTrabajos, (err, result) => {
    if (err) return res.json({ error: "error al ver los trabajos", err });
    return res.json({ trabajo: result });
  });
});

app.put("/updateTrabajos/:id", (req, res) => {
  const nombre_trabajo = req.body.nombre_trabajo;
  const detalles_trabajo = req.body.detalles_trabajo;
  const fecha_inicio = req.body.fecha_inicio;  
  const fecha_final = req.body.fecha_final; 
  const mechanic_id = req.body.mechanic_id; 
  const vehiculos_id = req.body.vehiculos_id; 
  const id_trabajo = req.params.id;

  const updateTrabajo = "UPDATE trabajos SET nombre_trabajo = ?, detalles_trabajo = ?, fecha_inicio = ? WHERE id_trabajo  = ?";

  connection.query(
      updateTrabajo,
      [nombre_trabajo, detalles_trabajo, fecha_inicio, fecha_final, mechanic_id, vehiculos_id, id_trabajo],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar el tipo de reparacion", err });
          return res.json({ trabajo: result });
      }
  );
});


app.delete('/delateTrabajos/:id',(req,res)=>{
  const id_trabajo = req.params.id;
  const deleteTrabajos = `DELETE FROM trabajos WHERE id_trabajo = ?`;
  connection.query(deleteTrabajos, [id_trabajo], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el trabajo", err });
    return res.json({ trabajo: result });
  });
})

//!APIS PARA REPARACION MATERIAL

app.post("/addReparacionMaterial", (req, res) => {
  const materials_id = req.body.materials_id;
  const tipo_reparacion_id = req.body.tipo_reparacion_id;
  const precio_reparacion = req.body.precio_reparacion;
  const horas_reparacion =  req.body.horas_reparacion;

  const addReparacionMaterial = `INSERT INTO tipo_reparacion_material (materials_id, tipo_reparacion_id, precio_reparacion, horas_reparacion) VALUES(?, ?, ?, ?)`;

  connection.query(addReparacionMaterial, [materials_id, tipo_reparacion_id, precio_reparacion, horas_reparacion], (err, result) => {
    if (err) return res.json({ error : "error al agregar Reparacion Material", err });
    return res.json({ tipo_reparacion_material : result });
  });
});

app.get("/viewReparacionMaterial", (req, res) => {
  const viewReparacionMaterial = 'CALL obtenerReparacionesMaterial();';
  connection.query(viewReparacionMaterial, (err, result) => {
    if (err) return res.json({ error: "error al ver los Reparacion Material", err });
    return res.json({ tipo_reparacion_material: result });
  });
});

app.put("/updateReparacionMaterial/:id", (req, res) => {
  const materials_id = req.body.materials_id;
  const tipo_reparacion_id = req.body.tipo_reparacion_id;
  const precio_reparacion = req.body.precio_reparacion;
  const horas_reparacion =  req.body.horas_reparacion;
  const id_tipo_reparacion_material = req.params.id;

  const updateReparacionMaterial = "UPDATE tipo_reparacion_material SET materials_id = ?, tipo_reparacion_id = ?, precio_reparacion = ?, horas_reparacion = ? WHERE id_tipo_reparacion_material  = ?";

  connection.query(
      updateReparacionMaterial,
      [materials_id, tipo_reparacion_id, precio_reparacion, horas_reparacion, id_tipo_reparacion_material],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar la reparacion material", err });
          return res.json({ tipo_reparacion_material: result });
      }
  );
});

app.delete('/delateReparacionMaterial/:id',(req,res)=>{
  const id_tipo_reparacion_material = req.params.id;
  const delateReparacionMaterial = `DELETE FROM tipo_reparacion_material WHERE id_tipo_reparacion_material = ?`;
  connection.query(delateReparacionMaterial, [id_tipo_reparacion_material], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el trabajo", err });
    return res.json({ tipo_reparacion_material: result });
  });
})

//! API REPARACION MATERIAL TRABAJO (RMT)
app.post("/addRMT", (req, res) => {
  const tipo_reparacion_material_id = req.body.tipo_reparacion_material_id;
  const trabajo_id  = req.body.trabajo_id ;
  const hora_trabajo_total = req.body.hora_trabajo_total;
  const precio_trabajo_total = req.body.precio_trabajo_total;
  const state_id = req.body.state_id

  const addRMT = `INSERT INTO reparacion_materiales_trabajo (tipo_reparacion_material_id, trabajo_id , hora_trabajo_total, precio_trabajo_total, state_id) VALUES(?, ?, ?, ?, ?)`;

  connection.query(addRMT, [tipo_reparacion_material_id, trabajo_id , hora_trabajo_total, precio_trabajo_total, state_id], (err, result) => {
    if (err) return res.json({ error : "error al agregar RMB", err });
    return res.json({ reparacion_materiales_trabajo : result });
  });
});

app.get("/viewRMT", (req, res) => {
  const viewRMT = `SELECT * FROM reparacion_materiales_trabajo `;
  connection.query(viewRMT, (err, result) => {
    if (err) return res.json({ error: "error al ver los RMB", err });
    return res.json({ reparacion_materiales_trabajo: result });
  });
});


app.put("/updateRMT/:id", (req, res) => {
  const tipo_reparacion_material_id = req.body.tipo_reparacion_material_id;
  const trabajo_id  = req.body.trabajo_id ;
  const hora_trabajo_total = req.body.hora_trabajo_total;
  const precio_trabajo_total = req.body.precio_trabajo_total;
  const state_id = req.body.state_id
  const id_reparacion_materiales_trabajo = req.params.id;

  const updateRMT = "UPDATE reparacion_materiales_trabajo SET tipo_reparacion_material_id = ?, trabajo_id = ?, hora_trabajo_total = ?, horas_reparacion = ?, precio_trabajo_total = ?, state_id = ? WHERE id_reparacion_materiales_trabajo  = ?";

  connection.query(
      updateRMT,
      [tipo_reparacion_material_id, trabajo_id, hora_trabajo_total, horas_reparacion, precio_trabajo_total, state_id, id_reparacion_materiales_trabajo],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar la reparacion material", err });
          return res.json({ reparacion_materiales_trabajo: result });
      }
  );
});

app.delete('/delateRMT/:id',(req,res)=>{
  const id_reparacion_materiales_trabajo = req.params.id;
  const delateRMT = `DELETE FROM reparacion_materiales_trabajo WHERE id_reparacion_materiales_trabajo = ?`;
  connection.query(delateRMT, [id_reparacion_materiales_trabajo ], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el RMT", err });
    return res.json({ reparacion_materiales_trabajo: result });
  });
})