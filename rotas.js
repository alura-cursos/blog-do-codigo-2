const posts = require('./src/posts');
const usuarios = require('./src/usuarios');

module.exports = app => {
  posts.rotas(app);
  usuarios.rotas(app);
};