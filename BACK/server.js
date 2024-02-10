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
  const id_mechanic = req.body.id;
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

//!API STATE
app.get("/viewState", (req, res) => {
  const viewState = `SELECT * FROM state`;
  connection.query(viewState, (err, result) => {
    if (err) return res.json({ error: "error al ver los status", err });
    return res.json({ mecanicos: result });
  });
});

// ! APIS PARA LOS  MATERIAES
app.post("/addMaterial", (req, res) => {
  const material = req.body.material;
  const precio = req.body.precio;
  const Cantidad = req.body.Cantidad;

  const addMaterial = `INSERT INTO materials (material, precio, Cantidad) VALUES(?, ?, ?)`;

  connection.query(addMaterial, [material, precio, Cantidad], (err, result) => {
    if (err) return res.json({ error: "error al agregar material", err });
    return res.json({ material: result });
  });
});

app.get("/getMaterial/:id", (req, res) => {
  const id_materials = req.params.id;
  const getMaterial = `SELECT * FROM materials WHERE id_materials = ?`;
connection.query(getMaterial, [id_materials], (err, result) => {
  if (err) {
    return res.json({ error: "Error al ver los materiales por id", err });
  } else {
    return res.json({ materiales: result });
  }
});
});
app.get("/viewMaterial", (req, res) => {
  const viewMaterial = `SELECT * FROM materials`;
  connection.query(viewMaterial, (err, result) => {
    if (err) return res.json({ error: "error al ver los materiales", err });
    return res.json({ materiales: result });
  });
});

app.put("/updateMaterial/:id", (req, res) => {
  const material = req.body.material;
  const precio = req.body.precio;
  const Cantidad = req.body.Cantidad;  
  const id_materials = req.params.id;

  const updateMaterial = "UPDATE materials SET material = ?, precio = ?, Cantidad = ? WHERE id_materials = ?";

  connection.query(
      updateMaterial,
      [material, precio, Cantidad, id_materials],
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

app.get("/getVehiculo/:id", (req, res) => {
  const id_vehiculos = req.params.id;
  const getVehiculo = `SELECT * FROM vehiculos WHERE id_vehiculos = ?`;
connection.query(getVehiculo, [id_vehiculos], (err, result) => {
  if (err) {
    return res.json({ error: "Error al ver el vehículo por id", err });
  } else {
    return res.json({ vehiculo: result });
  }
});
});

app.get("/viewVehiculo", (req, res) => {
  const viewVehiculo = `SELECT * FROM vehiculos`;
  connection.query(viewVehiculo, (err, result) => {
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

app.delete('/deleteVehiculo/:id',(req,res)=>{
  const id_vehiculos = req.params.id;
  const deleteVehiculo = `DELETE FROM vehiculos WHERE id_vehiculos = ?`;
  connection.query(deleteVehiculo, [id_vehiculos], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el vehículo", err });
    return res.json({ vehiculos: result });
  });
})

// ! APIS REPARACIONES
app.post("/addReparacion", (req, res) => {
  const reparacion = req.body.reparacion;
  const detalles = req.body.detalles;
  const precio_reparacion = req.body.precio_reparacion;
 

  const addReparacion = `INSERT INTO reparaciones (reparacion, detalles, precio_reparacion) VALUES(?, ?, ?)`;

  connection.query(addReparacion, [reparacion, detalles, precio_reparacion], (err, result) => {
    if (err) return res.json({ error : "error el tipo de reparacion", err });
    return res.json({ reparaciones : result });
  });
});

app.get("/getReparacion/:id", (req, res) => {
  const id_reparacion = req.params.id;
  const getReparacion = `SELECT * FROM reparaciones WHERE id_reparacion = ?`;
connection.query(getReparacion, [id_reparacion], (err, result) => {
  if (err) {
    return res.json({ error: "Error al ver los materiales por id", err });
  } else {
    return res.json({ reparaciones: result });
  }
});
});

app.get("/viewReparacion", (req, res) => {
  const viewReparacion = `SELECT * FROM reparaciones`;
  connection.query(viewReparacion, (err, result) => {
    if (err) return res.json({ error: "error al ver las reparaciones", err });
    return res.json({ reparaciones : result });
  });
});

app.put("/updateReparacion/:id", (req, res) => {
  const reparacion = req.body.reparacion;
  const detalles = req.body.detalles;
  const precio_reparacion = req.body.precio_reparacion;  
  const id_reparacion = req.params.id;

  const updateReparacion = "UPDATE reparaciones SET reparacion = ?, detalles = ?, precio_reparacion = ? WHERE id_reparacion  = ?";

  connection.query(
      updateReparacion,
      [reparacion, detalles, precio_reparacion, id_reparacion],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar el tipo de reparacion", err });
          return res.json({ reparaciones: result });
      }
  );
});

app.delete('/deleteReparacion/:id',(req,res)=>{
  const id_reparacion = req.params.id;
  const deleteReparacion = `DELETE FROM reparaciones WHERE id_reparacion = ?`;
  connection.query(deleteReparacion, [id_reparacion], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el tipo de reparacion", err });
    return res.json({ reparaciones: result });
  });
})

//!Apis para TRABAJOS

app.post("/addTrabajo", (req, res) => {
  const mechanic_id = req.body.mechanic_id;
  const reparacion_vehiculo_id = req.body.reparacion_vehiculo_id;
  const state_id = req.body.state_id;

  const addTrabajo = "INSERT INTO trabajos (mechanic_id, reparacion_vehiculo_id, state_id) VALUES ( ?, ?, ?);";

  connection.query(addTrabajo, [mechanic_id, reparacion_vehiculo_id, state_id], (err, result) => {
    if (err) return res.json({ error : "error al agregar trabajo", err });
    return res.json({ trabajo : result });
  });
});

app.get("/viewTrabajos", (req, res) => {
  const viewTrabajos = "SELECT * FROM trabajos;";
  connection.query(viewTrabajos, (err, result) => {
    if (err) return res.json({ error: "error al ver los trabajos", err });
    return res.json({ trabajo: result });
  });
});

app.put("/updateTrabajos/:id", (req, res) => {
  const mechanic_id = req.body.mechanic_id; 
  const reparacion_vehiculo_id = req.body.reparacion_vehiculo_id; 
  const state_id = req.body.state_id;
  const id_trabajo = req.params.id;

  const updateTrabajo = "UPDATE trabajos SET mechanic_id = ?, reparacion_vehiculo_id = ?, state_id = ? WHERE id_trabajo  = ?";

  connection.query(
      updateTrabajo,
      [mechanic_id, reparacion_vehiculo_id, id_trabajo, state_id],
      (err, result) => {
          if (err) return res.status(500).json({ error: "Error al editar el tipo de reparacion", err });
          return res.json({ trabajo: result });
      }
  );
});


app.delete('/deleteTrabajos/:id',(req,res)=>{
  const id_trabajo = req.params.id;
  const deleteTrabajos = `DELETE FROM trabajos WHERE id_trabajo = ?`;
  connection.query(deleteTrabajos, [id_trabajo], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el trabajo", err });
    return res.json({ trabajo: result });
  });
})

// //!APIS PARA REPARACION MATERIAL

// app.post("/addReparacionMaterial", (req, res) => {
//   const materials_id = req.body.materials_id;
//   const reparaciones_id = req.body.reparaciones_id;
//   const precio_reparacion = req.body.precio_reparacion;
//   const horas_reparacion =  req.body.horas_reparacion;

//   const addReparacionMaterial = `INSERT INTO reparaciones_material (materials_id, reparaciones_id, precio_reparacion, horas_reparacion) VALUES(?, ?, ?, ?)`;

//   connection.query(addReparacionMaterial, [materials_id, reparaciones_id, precio_reparacion, horas_reparacion], (err, result) => {
//     if (err) return res.json({ error : "error al agregar Reparacion Material", err });
//     return res.json({ reparaciones_material : result });
//   });
// });

// app.get("/viewReparacionMaterial", (req, res) => {
//   const viewReparacionMaterial = 'CALL obtenerReparacionesMaterial();';
//   connection.query(viewReparacionMaterial, (err, result) => {
//     if (err) return res.json({ error: "error al ver los Reparacion Material", err });
//     return res.json({ reparaciones_material: result });
//   });
// });

// app.put("/updateReparacionMaterial/:id", (req, res) => {
//   const materials_id = req.body.materials_id;
//   const reparaciones_id = req.body.reparaciones_id;
//   const precio_reparacion = req.body.precio_reparacion;
//   const horas_reparacion =  req.body.horas_reparacion;
//   const id_reparacion_material = req.params.id;

//   const updateReparacionMaterial = "UPDATE reparaciones_material SET materials_id = ?, reparaciones_id = ?, precio_reparacion = ?, horas_reparacion = ? WHERE id_reparacion_material  = ?";

//   connection.query(
//       updateReparacionMaterial,
//       [materials_id, reparaciones_id, precio_reparacion, horas_reparacion, id_reparacion_material],
//       (err, result) => {
//           if (err) return res.status(500).json({ error: "Error al editar la reparacion material", err });
//           return res.json({ reparaciones_material: result });
//       }
//   );
// });

// app.delete('/deleteReparacionMaterial/:id',(req,res)=>{
//   const id_reparacion_material = req.params.id;
//   const deleteReparacionMaterial = `DELETE FROM reparaciones_material WHERE id_reparacion_material = ?`;
//   connection.query(deleteReparacionMaterial, [id_reparacion_material], (err, result) => {
//     if (err) return res.json({ error: "error al eliminar el trabajo", err });
//     return res.json({ reparaciones_material: result });
//   });
// })




//! API REPARACION VEHÍCULO ()

app.post("/addTrabajo", (req, res) => {
  const reparacion = req.params.reparacion_id;
  const costo_total = req.body.costo_total;
  
  const addTrabajo = `INSERT INTO reparaciones_vehiculo (reparacion_id, costo_total,) VALUES(?, ?)`;
  connection.query(addTrabajo, [reparacion, costo_total], (err, result) => {
    if (err) return res.json({ error : "error al agregar trabajo", err });
    return res.json({ trabajo : result });
  });
});

app.put('/actualizarHoraFinal/:id',(req,res)=>{
  const id_reparacion_vehiculo_id = req.params.id
  
  const horaFinal = 'CALL ActualizarHoraFinal(?)'

  connection.query(horaFinal, [id_reparacion_vehiculo_id], (error, result) => {
    if (error) {
      console.error('Error al llamar al procedimiento almacenado:', error);
      throw error;
    }
    console.log('Hora final actualizada correctamente');
  });

})

app.put('/actualizarHoraInicial/:id',(req,res)=>{
  const id_reparacion_vehiculo_id = req.params.id
  
  const horaInicial = 'CALL ActualizarHoraInicial(?)'

  connection.query(horaInicial, [id_reparacion_vehiculo_id], (error, result) => {
    if (error) {
      console.error('Error al llamar al procedimiento almacenado:', error);
      throw error;
    }
    console.log('Hora final actualizada correctamente');
  });

})


app.get("/viewReparaciones", (req, res) => {
  const sql = `CALL ObtenerReparacionesConVehiculo()`;

  connection.query(sql, (err, result) => {
    if (err) {
      return res.json({ error: 'Error en la consulta', err });
    }

    const detalles = result[0];
    const listadoReparacionesFormateado = [];

    detalles.forEach(element => {
      const time = new Date(element.hora_inicio);
      const timeF = new Date(element.hora_final)
      const horaInicioFormateada = `${time.getHours()}:${time.getMinutes()}`;
      const horaFinalFormateada = `${timeF.getHours()}:${timeF.getMinutes()}`;
      const formattedElement = {
        ...element,
        hora_inicio: horaInicioFormateada,
        hora_final: horaFinalFormateada
        // Puedes agregar más campos si es necesario
      };

      listadoReparacionesFormateado.push(formattedElement);
    });

    // Envía la respuesta al cliente después de completar el bucle
    return res.json({ Reparaciones: listadoReparacionesFormateado });
  });
});

//! API VEHICULO MATERIAL (VM)

app.post("/addVM", (req, res) => {
  const costo_material = req.params.costo_material;
  const material_id = req.body.material_id;
  const vehiculos_id = req.body.vehiculos_id;
  
  const addVM = `INSERT INTO vehiculo_material (costo_material, material_id, vehiculos) VALUES(?, ?,?)`;
  connection.query(addVM, [costo_material, material_id, vehiculos_id], (err, result) => {
    if (err) return res.json({ error : "error al agregar trabajo", err });
    return res.json({ vehiculo_material : result });
  });
});

app.get("/viewVM", (req, res) => {
  const viewVM = "SELECT * FROM vehiculo_material;";
  connection.query(viewVM, (err, result) => {
    if (err) return res.json({ error: "error al ver los vehículos", err });
    return res.json({ vehiculo_material: result });
  });
});

app.get("/getVM/:id", (req, res) => {
  const id_vehiculo_material = req.params.id;
  const getVM = `SELECT * FROM vehiculo_material WHERE id_vehiculo_material = ?`;
connection.query(getVM, [id_vehiculo_material], (err, result) => {
  if (err) {
    return res.json({ error: "Error al ver los vehiculo_material", err });
  } else {
    return res.json({ vehiculo_material: result });
  }
});
});

app.delete('/deleteVM/:id',(req,res)=>{
  const id_vehiculo_material = req.params.id;
  const deleteVM= `DELETE FROM vehiculo_material WHERE id_vehiculo_material = ?`;
  connection.query(deleteTrabajos, [id_vehiculo_material], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el vehiculo_material", err });
    return res.json({ vehiculo_material: result });
  });
})


//! ROL

app.post("/addRol", (req, res) => {
  const rol = req.params.rol;
  
  const addRol = `INSERT INTO rol (rol) VALUES(?)`;
  connection.query(addRol, [rol], (err, result) => {
    if (err) return res.json({ error : "error al agregar rol", err });
    return res.json({ rol : result });
  });
});

app.get("/viewRol", (req, res) => {
  const viewVM = "SELECT * FROM rol;";
  connection.query(viewVM, (err, result) => {
    if (err) return res.json({ error: "error al ver los roles", err });
    return res.json({ vehiculo_material: result });
  });
});

app.get("/getRol/:id", (req, res) => {
  const id_rol = req.params.id;
  const getVM = `SELECT * FROM rol WHERE id_rol = ?`;
connection.query(getVM, [id_rol], (err, result) => {
  if (err) {
    return res.json({ error: "Error al ver los roles", err });
  } else {
    return res.json({ rol: result });
  }
});
});

app.delete('/deleteRol/:id',(req,res)=>{
  const id_rol = req.params.id;
  const deleteRol= `DELETE FROM rol WHERE id_rol = ?`;
  connection.query(deleteRol, [id_rol], (err, result) => {
    if (err) return res.json({ error: "error al eliminar el rol", err });
    return res.json({rol : result });
  });
})
