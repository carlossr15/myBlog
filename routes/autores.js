const express = require('express');
const router = express.Router();
const pool = require('../db'); // Conexión a la base de datos

// Obtiene los autores
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM autores');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener autores' });
    }
});

// Crear un autor
router.post('/', async (req, res) => {
    const { nombre, email, imagen } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({ message: 'Nombre y email son obligatorios' });
    }
    try {
        const [result] = await pool.query('INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)', [nombre, email, imagen]);
        res.status(201).json({ id: result.insertId, nombre, email, imagen });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear autor', error: err.message });
    }
});

module.exports = router;