const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'sabor_do_brasil'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

// Endpoint para buscar publicações
app.get('/api/publicacoes', (req, res) => {
  db.query('SELECT * FROM Publicacao', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint para adicionar interação (like/dislike)
app.post('/api/interacao', (req, res) => {
  const { id_usuario, id_publicacao, tipo } = req.body;
  db.query(
    'INSERT INTO Interacao (id_usuario, id_publicacao, tipo, data) VALUES (?, ?, ?, NOW())',
    [id_usuario, id_publicacao, tipo],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Interação registrada' });
    }
  );
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));