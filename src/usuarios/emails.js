const nodemailer = require('nodemailer');

class ConfiguracaoEmail {
  constructor() {
    this.host = process.env.EMAIL_HOST;
    this.auth = {
      user: process.env.EMAIL_USUARIO,
      pass: process.env.EMAIL_SENHA
    };
    this.secure = true;
  }
}

class ConfiguracaoEmailTeste {
  constructor(contaTeste) {
    this.host = 'smtp.ethereal.email';
    this.auth = contaTeste;
  }
}

async function criaConfiguracaoEmail() {
  if (process.env.NODE_ENV === 'production') {
    return new ConfiguracaoEmail();
  } else {
    const contaTeste = await nodemailer.createTestAccount();
    return new ConfiguracaoEmailTeste(contaTeste);
  }
}

class Email {
  async enviaEmail() {
    const configuracaoEmail = await criaConfiguracaoEmail();
    const transportador = nodemailer.createTransport(configuracaoEmail);
    const info = await transportador.sendMail(this);

    if (process.env.NODE_ENV !== 'production') {
      console.log('URL:' + nodemailer.getTestMessageUrl(info));
    }
  }
}

class EmailVerificacao extends Email {
  constructor(usuario, endereco) {
    super();
    this.from = '"Blog do Código" <noreply@blogdocodigo.com.br>';
    this.to = usuario.email;
    this.subject = 'Verificação de e-mail';
    this.text = `Olá! Confirme seu e-mail aqui: ${endereco}.`;
    this.html = `<h1>Olá!</h1> Confirme seu e-mail aqui: ${endereco}.`;
  }
}

class EmailAtualizacaoSenha extends Email {
  constructor(usuario, endereco) {
    super();
    this.from = '"Blog do Código" <noreply@blogdocodigo.com.br>';
    this.to = usuario.email;
    this.subject = 'Atualização de senha';
    this.text = `Olá! Atualize sua senha aqui: ${endereco}.`;
    this.html = `<h1>Olá!</h1> Atualize sua senha aqui: ${endereco}.`;   
  }
}

module.exports = { EmailVerificacao, EmailAtualizacaoSenha };

