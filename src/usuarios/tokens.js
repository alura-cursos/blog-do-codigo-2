const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const allowlistRefreshToken = require('../../redis/allowlist-refresh-token');


function criaTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
  const payload = { id };
  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: tempoQuantidade + tempoUnidade });
  return token;
}

async function criaTokenOpaco(id, [tempoQuantidade, tempoUnidade], allowlist) {
  const tokenOpaco = crypto.randomBytes(24).toString('hex');
  const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade).unix();
  await allowlist.adiciona(tokenOpaco, id, dataExpiracao);
  return tokenOpaco;
}

module.exports = {
  access: {
    expiracao: [15, 'm'],
    cria(id) {
      return criaTokenJWT(id, this.expiracao);
    }
  },
  refresh: {
    lista: allowlistRefreshToken,
    expiracao: [5, 'd'],
    cria(id) {
      return criaTokenOpaco(id, this.expiracao, this.lista);
    }
  }
}