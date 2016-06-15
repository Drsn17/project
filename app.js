
var express  = require('express'),
   mongoose = require('mongoose'),
   bodyParser = require('body-parser'),
    ejs      = require('ejs')

    // Mongoose Schema definition
//Update user model (todo)
    Schema = new mongoose.Schema({
        fname      : String,
        lname      : String,
        dob        : String,
        email      : String,
        address    : String,
        password   : String,
        contact_no : String    
    }),

  User = mongoose.model('User', Schema);

    mongoose.connect( 'mongodb://darsh:1234@ds013574.mlab.com:13574/darsh_niet_db');


    var app = express()
    
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({extended: true}));
 

  app.get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

app.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    User.find({}, function ( err, users ){
        if(!err && users){
            res.render('users.ejs',{
                data :  users
            })
        } else {
            console.log(err)
        }
    });

});

  app.post('/api/user', function (req, res) {

      //update post function as per new model (todo)
        var user = new User(
        {
        fname      : req.body.fname,
            lname  : req.body.lname,
            dob   : req.body.dob,
            email : req.body.email,
            address : req.body.address,
            password : req.body.password,
            contact_no : req.body.contact_no
        }
    );
  
    // http://mongoosejs.com/docs/api.html#model_Model-save
    user.save(function (err, data) {
        if(!err && data){
            console.log('Data added successfully');
            res.redirect('/')
        } else {
            res.json(500, {msg: 'Something went wrong' });
            console.log(err)
        }
      
    });
  })

  //userdeatails router
  
  
  app.delete('/api/users', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    User.remove({ isPassedOut: true }, function ( err ) {
        if(!err){
            console.log("User deleted successfully")
        } else{
            console.log(err)
        }
    });
  })
  app.get('/adduser',function(req, res){
      res.render('addUser.ejs')
  })

  app.get('/userdetails/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
        if(!err && user){
            res.render("userDetail.ejs",{
                data : user
            })
        } else {
            console.log(err)
        }
    });
  })

  
  //route difine user EDit
  
  app.get('/useredit/:id',function(req,res){
      User.findById(req.params.id, function(err,user){
          if (!err && user){
      res.render('editUser.ejs',{
          data : user
      })
       }
          else{
              console.log(err)
          }
      });
  })
  
  
  app.post('/api/edituser/:id',function(req, res){
      User.findById(req.params.id, function (err,user){
          console.log(user)
          user.fname = req.body.fname
          user.lname = req.body.lname;
          
          //http://mongooesjs.com/docs.api.html#model_model-save
          user.save(function ( err,data){
              if(!err && data ){
                  res.redirect('/')
              }
              else{
                  console.log(err)
              }
              
          });
      });
  });
  
  
  app.put('/api/users/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
      user.isPassedOut = req.body.completed;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      user.save( function ( err, data ){
          if(!err && data){
           res.status(200).json(data)
          } else {
              console.log(err)
          }
       
      });
    });
  });


//delete data

 app.get('/api/deleteuser/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
      // http://mongoosejs.com/docs/api.html#model_Model-save
      user.remove( function (err){
          console.log("user deleted successfully")
          res.redirect('/')
       
      });
    });
  })

  app.delete('/api/users/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      user.remove( function ( err ){
           res.status(200, {msg: 'User deleted successfully'})
      });
    });
  })

app.listen(1338);
console.log('Magic happens on port 1338');