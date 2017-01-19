var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var questoes = require('./data/questoes.js');

app.set('port', (process.env.PORT));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/home');
});

app.post('/contato', function(req, res) {
  if(!req.body || !req.body.email || !req.body.name || !req.body.message) {
  	return res.sendStatus(400);
  }
  
  var email = new sendgrid.Email();
  email.addTo(process.env.CONTACT_EMAIL);
  email.setFrom('no-reply@cultivaridiomas.com.br');
  email.setSubject('Novo contato do seu site!');
  email.setText('Olá,\n\n' + req.body.name + ' entrou em contato com você.\n' + 'E-mail de contato: ' + req.body.email + '\n\nMensagem: ' + req.body.message);

  sendgrid.send(email, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
  
  return res.sendStatus(200);
});

app.post('/teste', function(req, res) {
  if(!req.body || !req.body.name || !req.body.email || !req.body.phone || !req.body.correct || !req.body.language) {
    return res.sendStatus(400);
  }
  /*
  var email = new sendgrid.Email();
  email.addTo(process.env.CONTACT_EMAIL);
  email.setFrom('no-reply@cultivaridiomas.com.br');
  email.setSubject('Novo teste realizado no seu site!');
  email.setText('Olá,\n\n' + req.body.name + ' fez um teste de ' + req.body.language.\n' + 'E-mail de contato: ' + req.body.email + '\n\nTelefone: ' + req.body.phone + '\n\nAcertos: ' + req.body.correct);

  sendgrid.send(email, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
  */
  return res.sendStatus(200);
});

app.get('/quem-somos', function(request, response) {
  response.render('pages/quem_somos');
});
app.get('/cursos', function(request, response) {
  response.render('pages/cursos');
});

app.get('/depoimentos', function(request, response) {
  response.render('pages/depoimentos');
});

app.get('/escolas-e-localizacao', function(request, response) {
  response.render('pages/escolas_e_localizacao');
});

app.get('/contato', function(request, response) {
  response.render('pages/contato');
});

app.get('/teste-ingles', function(request, response) {
  response.render('pages/teste', { questoes: questoes.ingles, idioma: 'inglês' });
});

app.get('/teste-alemao', function(request, response) {
  response.render('pages/teste', { questoes: questoes.alemao, idioma: 'alemão' });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


