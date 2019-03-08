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


const peopleFeria = [];
const peopleMFeria = [];
const peopleBasket = [];
const peopleSBasket = [];
const peopleWild = [];
const move = [];
const shot = [];
let wild = undefined;

io.on('connection', (client) => {
  //WILDWEST
  client.on('clickedW', () => {
    console.log("clica")
    if(peopleWild.indexOf(client.id) == -1) peopleWild.push(client.id);
    client.emit('clickedW', peopleWild);
  });
  client.on("wildWest",()=>{
    if(!wild){
      wild = client.id
      io.emit('wildWest', wild);
    } 
  })
  //FERIA
  client.on('clickedF', () => {
    if(peopleFeria.indexOf(client.id) == -1) peopleFeria.push(client.id);
    client.emit('clickedF', peopleFeria);
  });
  client.on("feria",(obj)=>{
    let exists = false;
    move.forEach(elem => {
      if(elem.id == client.id){
        exists = true;
        if(elem.score < (obj.speedX + obj.speedY + obj.speedZ)) elem.score = obj.speedX + obj.speedY + obj.speedZ
      } 
    })
    if(!exists && ((obj.speedX + obj.speedY + obj.speedZ) > 40)){
      peopleMFeria.push(client.id)
      move.push({id: client.id, score: obj.speedX + obj.speedY + obj.speedZ})
    } 
    move.sort((a,b) => {
      if(a.score > b.score) return -1
      if(a.score < b.score) return 1
    })
    if(move.length == peopleFeria.length-1) client.emit('feria', {finish:true, id: client.id, score: obj.speedX + obj.speedY + obj.speedZ});
    else client.emit('feria', { id: client.id, score: obj.speedX + obj.speedY + obj.speedZ});
  })
  client.on("feriaAll", () => {
    peopleFeria.forEach(person=>{
      if(peopleMFeria.indexOf(person) == -1) io.to(`${person}`).emit('feriaAll', {finish:true, move:move})
    })
  })
  //BASKET
  client.on('clickedB', () => {
    if(peopleBasket.indexOf(client.id) == -1) peopleBasket.push(client.id);
    client.emit('clickedB', peopleBasket);
  });
  client.on("basket",(obj)=>{
    let exists = false;
    let fail = false;
    let can = true;
    const sumaScore = Math.floor(obj.speedX + obj.speedY + obj.speedZ)
    shot.forEach(elem => {
      if(elem.id == client.id && elem.round != obj.round){
        exists = true;
        let num = calcPoints(obj.distance)
        if(num == 0) fail = true
        elem.score += num
        elem.round++
      } 
    })
    if(!exists && ((sumaScore) > 40)){
      peopleSBasket.push(client.id)
      let num = calcPoints(obj.distance)
      if(num==0) fail = true;
      shot.push({id: client.id, score: num, round:obj.round })
    } 
    shot.forEach( elem => {
      if(elem.round != obj.round) can = false;
    })
    if(shot.length == peopleBasket.length-1 && can){
      client.emit('basket', {finish:true, id: client.id, score: sumaScore, fail});
    } 

    else client.emit('basket', {id: client.id, score: sumaScore, fail});
    
    function calcPoints(distance){
      let num = Math.abs((distance*2)-sumaScore)
      if(num == 0) num = 5;
      else if(num <= 4) num = 3
      else if(num <= 10) num = 1
      else num = 0
      return num
    }
  })
  client.on("basketAll",() => {
    peopleBasket.forEach(person=>{
      if(peopleSBasket.indexOf(person) == -1) {
        io.emit('basketAll', {finish:true, shot})
      }
    })
  });
  //ALL
  client.on('disconnect', function () {
    peopleFeria.splice(peopleFeria.indexOf(client.id,1));
    peopleMFeria.splice(peopleMFeria.indexOf(client.id,1));
    peopleBasket.splice(peopleBasket.indexOf(client.id,1));
    peopleSBasket.splice(peopleSBasket.indexOf(client.id,1));
    move.forEach((elem,idx) => {
      if(elem.id == client.id) move.splice(idx,1);
    })
    shot.forEach((elem,idx) => {
      if(elem.id == client.id) shot.splice(idx,1);
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

