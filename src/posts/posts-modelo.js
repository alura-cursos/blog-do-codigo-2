const postsDao = require('./posts-dao');
const validacoes = require('../validacoes-comuns');

class Post {
  constructor(post) {
    this.titulo = post.titulo;
    this.conteudo = post.conteudo;
    this.valida();
  }

  adiciona() {
    return postsDao.adiciona(this);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.titulo, 'titulo');
    validacoes.campoTamanhoMinimo(this.titulo, 'titulo', 5);

    validacoes.campoStringNaoNulo(this.conteudo, 'conteudo');
    validacoes.campoTamanhoMaximo(this.conteudo, 'conteudo', 140);
  }

  static lista() {
    return postsDao.lista();
  }
}

module.exports = Post;
