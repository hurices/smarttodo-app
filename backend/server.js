const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Vérifier connexion
db.connect((err) => {
  if (err) {
    console.error('Erreur MySQL:', err);
    return;
  }
  console.log('✅ Connecté à MySQL');
});

// Routes

// 1. Récupérer toutes les tâches
app.get('/api/todos', (req, res) => {
  db.query('SELECT * FROM todos ORDER BY created_at DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// 2. Ajouter une tâche
app.post('/api/todos', (req, res) => {
  const { task, due_date } = req.body;
  
  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'La tâche ne peut pas être vide' });
  }
  
  db.query(
    'INSERT INTO todos (task, due_date) VALUES (?, ?)',
    [task.trim(), due_date || null],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: result.insertId,
        task: task.trim(),
        due_date: due_date || null,
        completed: false
      });
    }
  );
});

// 3. Modifier statut (complété/non complété)
app.put('/api/todos/:id/toggle', (req, res) => {
  const { id } = req.params;
  
  db.query(
    'UPDATE todos SET completed = NOT completed WHERE id = ?',
    [id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Statut mis à jour' });
    }
  );
});

// 4. Supprimer une tâche
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Tâche supprimée' });
  });
});

// 5. Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API SmartTodo fonctionne!' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend sur http://localhost:${PORT}`);
});