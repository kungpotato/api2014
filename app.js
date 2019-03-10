const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const cookieParser = require('cookie-parser')

const MemoryStore = require('session-memory-store')(session)

var app = express()
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

var dbURI = 'mongodb://kungpotato:kungPRS2008@ds037283.mlab.com:37283/db_mfcaa'
mongoose.connect(dbURI, { useNewUrlParser: true }, (err) => {
  err ? console.log('Some problem with the connection ' + err) : console.log('The Mongoose connection is ready')
})

//  ********   Model define ***************
var modelInputMaterialAndCost = require('./models/InputMaterialAndCost')
var modelDepartment = require('./models/MasterDepartment')
var modelMaterial = require('./models/MasterMaterial')
var modelUnit = require('./models/MasterUnit')
var modelUser = require('./models/MasterUser')

var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  name: 'JSESSION',
  secret: 'kungpotato',
  store: new MemoryStore(60 * 60 * 12),
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  (username, password, done) => {
    modelUser.findOne({ username: username }, (err, user) => {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      if (!user.verifyPassword(password)) { return done(null, false) }

      return done(null, user)
    })
  }
))
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  console.log('deserializeUser')
  done(null, user)
})

app.get('/', (req, res) => {
  res.send('welcome to web API!')
})
app.post('/api/login',
  passport.authenticate('local', { session: true }),
  (req, res) => {
    res.send(req.session.passport.user)
  }
)
app.post('/api/logout', function (req, res) {
  req.logout()
  req.session.destroy()
})

//  ********   Routes define ***************
const InputMaterialAndCostRouter = require('./Routes/InputMaterialAndCostRoutes')(modelInputMaterialAndCost)
const DepartmentRouter = require('./Routes/deptRoutes')(modelDepartment)
const MaterialRouter = require('./Routes/materialRoutes')(modelMaterial)
const UnitRouter = require('./Routes/unitRoutes')(modelUnit)
const UserRouter = require('./Routes/userRoutes')(modelUser)

app.use('/api/input', InputMaterialAndCostRouter)
app.use('/api/department', DepartmentRouter)
app.use('/api/material', MaterialRouter)
app.use('/api/unit', UnitRouter)
app.use('/api/register', UserRouter)
// *******************************************

app.listen(port, () => {
  console.log('Gulp is running my app on  PORT: ' + port)
})

module.exports = app
