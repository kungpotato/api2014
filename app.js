var express = require('express'),
    cors = require('cors');
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    cookieParser = require('cookie-parser')

// var MemoryStore = require('session-memory-store')(session);

var dbURI='mongodb://kungpotato:kungPRS2008@ds037283.mlab.com:37283/db_mfcaa';
var db
db = mongoose.connect(dbURI,{useNewUrlParser: true},function(err){    
    if(err){
    console.log('Some problem with the connection ' +err)   
    } 
    else {
    console.log('The Mongoose connection is ready')  
    }

})

//  ********   Model define ***************
var modelInputMaterialAndCost = require('./models/InputMaterialAndCost');
var modelDepartment = require('./models/MasterDepartment');
var modelMaterial = require('./models/MasterMaterial');
var modelUnit = require('./models/MasterUnit');
var modelUser = require('./models/MasterUser');

var app = express();
app.use(cors());

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({
//   name: 'JSESSION',
//   secret: 'kungpotato',
//   store: new MemoryStore(60 * 60 * 12),
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     modelUser.findOne({ username: username }, function (err, user) {
//       //console.log(user)
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }

//       return done(null, user);
//     });
//   }
// ));
// passport.serializeUser(function(user, done) {
//   //console.log('serializeUser')
//   done(null, user);
// });
// passport.deserializeUser(function(user, done) {
//   console.log('deserializeUser')
//   done(null, user);
// });

app.get('/', function(req, res){
    res.send('welcome to web API!');
});
// app.post('/api/login',
//   passport.authenticate('local', { session: true }),
//   function(req, res) {
//     res.send(req.session.passport.user);
//   }
// );
// app.post('/api/logout', function (req, res) {
//   req.logout()
//   req.session.destroy(function (err) {
//     res.redirect("/")
//   })
// })

//  ********   Routes define ***************
InputMaterialAndCostRouter = require('./Routes/InputMaterialAndCostRoutes')(modelInputMaterialAndCost)
DepartmentRouter = require('./Routes/deptRoutes')(modelDepartment)
MaterialRouter = require('./Routes/materialRoutes')(modelMaterial)
UnitRouter =  require('./Routes/unitRoutes')(modelUnit)
UserRouter =  require('./Routes/userRoutes')(modelUser)

// app.use('/api/input', InputMaterialAndCostRouter);
// app.use('/api/department', DepartmentRouter);
// app.use('/api/material', MaterialRouter);
// app.use('/api/unit', UnitRouter);
// app.use('/api/register', UserRouter);
// *******************************************


app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;