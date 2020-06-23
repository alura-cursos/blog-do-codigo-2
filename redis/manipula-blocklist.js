const blocklist = require('./blocklist');

const { promisify } = require('util');
const existsAsync = promisify(blocklist.exists).bind(blocklist);
const setAsync = promisify(blocklist.set).bind(blocklist);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

function geraTokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

module.exports = {
  async adiciona(token) {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await setAsync(tokenHash, '');
    await blocklist.expireat(tokenHash, dataExpiracao);
  },
  async contemToken(token) {
    const tokenHash = geraTokenHash(token);
    const resultado = await existsAsync(tokenHash);
    return resultado === 1;
  },
};
