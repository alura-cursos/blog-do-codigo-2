const Post = require('./posts-modelo');
const { InvalidArgumentError } = require('../erros');

module.exports = {
  async adiciona(req, res) {
    try {
      const post = new Post(req.body);
      await post.adiciona();

      res.status(201).json(post);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },

  async lista(req, res) {
    try {
      const posts = await Post.lista();
      res.json(posts);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
};
