const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const http = require('http').createServer(app);
// const io = require('socket.io')(http);

require('./config/config');

if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./routes/routes')(app);

http.listen(process.env.NODE_PORT, (err) => {
  if (err) throw err;
  else console.log(`Server online - http://localhost:${process.env.NODE_PORT} - Enviroment: ${process.env.NODE_ENV}`);
});
