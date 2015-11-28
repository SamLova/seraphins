var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // mongo connection
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // used to manipulate POST

console.log('load user modle');
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        //look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//built the REST operation at the base for users
//this will be accessible from http://127.0.0.1:/3000/users if the defaults* 
//route for / is left unchanged
router.route('/')
//    GET  all users
        .get(function(req, res, next){
//            retrieve all users from Mongo
            mongoose.model('User').find({}, function(err, users){
                if (err) {
                    return console.error(err);
                }
                else{
//                    respond to both HTML and JSON. JSON responses require  'Accept : application/json;' in the Request Handler'  
//                    res.format({
//                        html : function(){
//                            res.render('Users/index',{
//                                title : 'All my users',
//                                'users' : users
//                            });
//                        },
//                        json : function(){
                            res.json(users);
//                        }
//                    });
                }
            });
        }) // end get()
        // POST a new user
        .post(function(req, res){
            var username  = req.body.username;
            var password  = req.body.password;
            // ccall the create function  for our database
            mongoose.model('User').create({
                username : username,
                password : password,
                date_add : new Date(),
                active :  false
            }, function(err, user){
                if (err) {
                    console.error(err);
                    res.send('There was a problem adding the information in the database.');
                } else {
                    // User has been created
                    console.log('POST created new User : '+ user);
                    res.format({
                         //HTML response will set the location and redirect back to the home page. 
                         //You could also create a 'success' page if that's your thing
                         html : function(){
                             // If it worked, set the header so the address bar doesn't still say /adduser
                             res.location("users");
                             res.redirect('/users');
                         },
                         // JSON response will show the newly created user
                         json : function(){
                             res.json(user);
                         }
                    });
                }
            });
        }); // end post
        
router.get('/new', function(req, res){
    res.render('users/new', { title : 'Add new user'});
});


// router middleware to  validate :id
router.param('id', function(req, res, next, id){
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('User').findById(id, function(err, user){
        if (err){
            console.log(id + ' was not found');
            // send 404
            res.status(404);
            var err = new Error('Not found');
            err.status = 404;
            res.format({
                html : function(){
                    next(err);
                },
                json : function(){
                    res.json({ message : err.status + '' + err });
                }
            });
        // if it is found we confinue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(user);
            // once validation is done save the new item in the req
            req.id = id;
            // go to next  thing
            next();
        }
    });
});

/**
 * Find one by id
 */
router.route('/:id')
    .get(function(req, res){
        mongoose.model('User').findById(req.id, function(err, user){
                if (err) {
                    console.log('GET Error : There was a problem retrieving : ' + err);
                } else {
                    console.log('GET retrieveing ID : '+ user._id);
                    var userdob =  user.dob.toISOString();
                    userdob = userdob.substring(0, userdob.indexOf('T'));
                    res.format({
                        html : function(){
                            res.render('users/show',{
                                "userdob" : userdob,
                                "user" : user
                            });
                        },
                        json : function(){
                            res.json(user);
                        }
                    });
                }
        });
    });
    
/**
 * API
 * Find one by id
 */
router.route('/api/:id')
    .get(function(req, res){
        mongoose.model('User').findById(req.id, function(err, user){
            if (err) {
                console.log('GET Error : There was a problem retrieving : ' + err);
            } else {
                console.log('GET retrieveing ID : '+ user._id);
                res.json(user);
            }
        });
    }
);
    
    
//GET the individual user by Mongo ID
router.get('/:id/edit', function(req, res){
    mongoose.model('User').findById(req.id, function(err, user){
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            // Return the user
            console.log('GET Retrieving ID: ' + user._id);
            console.log(user);
            //Format the date properly for the value to show correctly in our edit form 
            res.format({
                //HTML response will render the 'edit.jade' template
                html : function(){
                    res.render('users/edit',{
                        title : 'User' + user._id,
                        "user" : user
                    });
                },
                // JSON response will return the JSON output
                json : function(){
                    res.json(user);
                }
            });
        }
    });
});

//PUT to update a user by ID
router.put('/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var username = req.body.username;
    var password = req.body.password;
    var active = req.body.active;
    console.log(req.body.username);

   //find the document by ID
    mongoose.model('User').findById(req.id, function (err, user) {
        //update it
        user.update({
            username : username,
            password : password,
            date_upd : new Date,
            active : active
        }, function (err, userID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } 
            else {
                //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                res.format({
                    html: function(){
                         res.redirect("/users/" + user._id);
                   },
                   //JSON responds showing the updated values
                  json: function(){
                         res.json(user);
                   }
                });
           }
        });
    });
});

//PUT to update a user by ID
router.put('/api/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var username = req.body.username;
    var password = req.body.password;
    var active = req.body.active;

   //find the document by ID
    mongoose.model('User').findById(req.id, function (err, user) {
        //update it
        user.update({
            username : username,
            password : password,
            date_upd : new Date,
            active : active
        }, function (err, userID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } 
            else {
                //JSON responds showing the updated values
                res.json(user);
            }
        });
    });
});
    
    
//DELETE a User by ID
router.delete('/:id/edit', function(req, res){
//    find  user by ID
    mongoose.model('User').findById(req.id, function(err, user){
        if (err) {
            return console.error(err);
        } else {
            // remove it fro mongo
            user.remove(function(err, user){
                if (err) {
                    return console.error(err);
                } else {
                    console.log('DELETE... removing ID: ' + user._id);
                    res.format({
                        html : function(){
                            res.redirect('/users');
                        },
                        json : function(){
                            res.json({ message : 'Deleted', item : user});
                        }
                    });
                }
            });
        }
    });
});
   

router.post('/api/new', function(req, res){
    
})

module.exports = router;