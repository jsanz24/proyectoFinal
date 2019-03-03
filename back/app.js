require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require("express-session");
const MongoStore   = require('connect-mongo')(session);
const flash        = require("connect-flash");
const app          = express();
const http         = require('http');
let server         = http.createServer(app);
const io           = require('socket.io')(server);

mongoose
  .connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


const people = [];
const clicks = [];
const move = [];

io.on('connection', (client) => {
  people.push(client.id);
  client.on('clicked', () => {
    let exists = false;
    clicks.forEach(elem => {
      if(elem.id == client.id) exists = true;
    })
    if(!exists) clicks.push({id: client.id, time:new Date().getTime()})
    if(clicks.length == people.length) {
      io.emit('clicked', clicks);
    }
    else client.emit('clicked', clicks);
  });
  
  client.on("move",(obj)=>{
    //if(people.indexOf(client.id) == -1) people.push(client.id);
    let exists = false;
    move.forEach(elem => {
      if(elem.id == client.id){
        exists = true;
        if(elem.score < obj.speedX + obj.speedY + obj.speedZ) elem.score = obj.speedX + obj.speedY + obj.speedZ
      } 
    })
    if(!exists && (obj.speedX + obj.speedY + obj.speedZ) > 35) move.push({id: client.id, score: obj.speedX + obj.speedY + obj.speedZ})
    move.sort((a,b) => {
      if(a.score > b.score) return -1
      if(a.score < b.score) return 1
    })
    if(move.length == people.length-1){
      client.emit('move', { id: client.id, score: obj.speedX + obj.speedY + obj.speedZ});
      io.emit('moveAll', {finish:true, move});
    } 
    else client.emit('move', { id: client.id, score: obj.speedX + obj.speedY + obj.speedZ});
  })
  
  client.on('disconnect', function () {
    people.splice(people.indexOf(client.id,1));
    clicks.forEach((elem,idx) => {
      if(elem.id == client.id) clicks.splice(idx,1);
    })
    move.forEach((elem,idx) => {
      if(elem.id == client.id) move.splice(idx,1);
    })
  });
});



app.use(cors({
  credentials: true,
  origin: [process.env.CORS_PORT]
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});
  

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);
    

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
      
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
 });



module.exports =  {app,server};

