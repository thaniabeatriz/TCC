const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Define a pasta onde estão suas páginas HTML e recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Rota para página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages', 'index.html'));
  });

// Rota para página sobre
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages', 'sobre.html'));
  });

// Rota para página ongs
app.get('/ongs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages', 'ongs.html'));
  });
  
// Rota para página de contribuição
  app.get('/contribuir', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages', 'contribuir.html'));
  });
    
  // Inicia o servidor
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });