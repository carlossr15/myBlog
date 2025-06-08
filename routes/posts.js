const express = require('express');
const router = express.Router();
const pool = require('../db'); // Conexión a la base de datos

// Obtener todos los posts con los datos del autor 
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM posts
            JOIN autores ON posts.autor_id = autores.id
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener posts' });
    }
});

// Crear un nuevo post
router.post('/', async (req, res) => {
    const { titulo, descripcion, categoria, autor_id } = req.body;
    if (!titulo || !autor_id) {
        return res.status(400).json({ message: 'Título y ID de autor son obligatorios' });
    }
    try {
        const [result] = await pool.query('INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)', [titulo, descripcion, categoria, autor_id]);
        res.status(201).json({ id: result.insertId, titulo, descripcion, categoria, autor_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear post', error: err.message });
    }
});

// Obtener posts por autor 
router.get('/autor/:autorId', async (req, res) => {
    const { autorId } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT * FROM posts
            JOIN autores ON posts.autor_id = autores.id
            WHERE autores.id = ?`, [autorId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron posts para este autor' });
        }
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener posts por autor' });
    }
});

module.exports = router;