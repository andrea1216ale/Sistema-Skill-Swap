const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Servidor Skill Swap funcionando");
});

app.get("/api/usuarios", (req, res) => {
  const sql = "SELECT id, nombre, correo, edad, nivel, creado_en FROM usuarios";
  db.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
    res.json(results);
  });
});

app.get("/api/usuario/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, nombre, correo, edad, nivel, creado_en FROM usuarios WHERE id = ?";
  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error al obtener usuario" });
    }
    if (!results.length) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(results[0]);
  });
});

app.post("/api/registro", async (req, res) => {
  const datos = req.body;
  if (!datos.nombre || !datos.correo || !datos.password) {
    return res.status(400).json({ mensaje: "Faltan datos requeridos" });
  }

  try {
    const hashedPassword = await bcrypt.hash(datos.password, 10);
    const sql = `INSERT INTO usuarios (nombre, correo, password, edad, nivel) VALUES (?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [datos.nombre, datos.correo, hashedPassword, datos.edad, datos.nivel],
      (error, result) => {
        if (error) {
          console.error(error);
          if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ mensaje: "El correo ya está registrado" });
          }
          return res.status(500).json({ mensaje: "Error al registrar usuario" });
        }
        res.json({ mensaje: "Usuario registrado correctamente", usuarioId: result.insertId });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno al procesar registro" });
  }
});

app.post("/api/login", (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) {
    return res.status(400).json({ mensaje: "Correo y password son obligatorios" });
  }

  const sql = "SELECT id, nombre, correo, password, edad, nivel FROM usuarios WHERE correo = ?";
  db.query(sql, [correo], async (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error al autenticar usuario" });
    }
    if (!results.length) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const { password: _, ...userData } = user;
    res.json({ mensaje: "Login exitoso", usuario: userData });
  });
});

app.put("/api/usuario/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, correo, edad, nivel } = req.body;
  const sql = "UPDATE usuarios SET nombre = ?, correo = ?, edad = ?, nivel = ? WHERE id = ?";
  db.query(sql, [nombre, correo, edad, nivel, id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error al actualizar usuario" });
    }
    if (!result.affectedRows) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario actualizado correctamente" });
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor iniciado en http://${HOST}:${PORT}`);
});
