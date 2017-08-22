/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/
var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var multer = require('multer');
 

var upload = multer();

var app = express();

app.set('view engine', 'pug');

app.set('views', './views');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/my_db');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



var Schema = mongoose.Schema;
var personSchema = new Schema({
   name:String,
   age: Number,
   nationality: String
   
});

var Person = mongoose.model('Person', personSchema);


app.get('/person', function(req, res)
{
   
res.render('person');

});

app.get('/enter', function(req, res){
  var user = new Person({
    name: 'vishal',
    age: 20,
    nationality: 'always indian'
    }) ;
    user.save(function(err, user){
      if(err){
        console.log(err);
      }
      else
      {
        console.log('inserted');
        console.log(user);
      }
    });

})

app.post('/person', function(req, res,done)
{
   
  var personInfo = req.body; //Get the parsed information
   console.log(personInfo.name);
   console.log(personInfo.age);
   console.log(personInfo.nationality);
 if(!personInfo.name || !personInfo.age || !personInfo.nationality)
 {
      
   res.render('show_message', {

   message: "Sorry, you provided worng info", type: "error"});

 } 
else 
{
      
  var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      
  newPerson.save(function(err, Person){
         if(err)
            
  res.render('show_message', {message: "Database error", type: "error"});
         
  else
  console.log('+++++++++');          
  res.render('show_message', {
               
  message: "New person added", type: "success", person: personInfo});
      });
     /* if(err){
								console.log(err);
								return done(null, false, { message: 'Database error' });
							}
							return done(null,newPerson);
		});	
		res.render('show_message', {
               
  message: "New person added", type: "success", person: personInfo});*/
      				
   }
})  ;

  

//app.listen(5000);
module.exports = app;