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

//ALL MATERIAL
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





//ALL VEHÍCULOS
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

app.get("/viewVehículo", (req, res) => {
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
    return res.json({ material: result });
  });
})

//ALL REPARACIONES
app.post("/addReparacion", (req, res) => {
  const reparacion = req.body.reparacion;
  const detalles = req.body.detalles;
  const precio_reparaciones = req.body.precio_reparaciones;
  const costo_material = req.body.costo_material;
  const hora_inicio = req.body.hora_inicio;
  const hora_final = req.body.hora_final;
  const mechanic_id = req.body.mechanic_id;
  const state_id = req.body.state_id;
 

  const addReparacion = `INSERT INTO reparaciones (reparacion, detalles, precio_reparaciones, costo_material, hora_inicio, hora_final, mechanic_id, state_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(addReparacion, [reparacion, detalles, precio_reparaciones, costo_material, hora_inicio, hora_final, mechanic_id, state_id], (err, result) => {
    if (err) return res.json({ error: "error al agregar vehículo", err });
    return res.json({ vehiculo: result });
  });
});

app.get("/viewVehículo", (req, res) => {
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
    return res.json({ material: result });
  });
})


app.listen(8082, () => {
  console.log("ESCUCHANDO EN EL PUERTO 8082");
});
