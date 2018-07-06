/*
@author: Emad Bin Abid
@date: July 06, 2018
*/

//Establishing the routes for admin model

//Dependencies
const config = require('../../config');
const adminModel = require('./admin.model');

const AdminModel = adminModel.AdminModel;

/*
method: addAdmin(expressInstance)
url: domain/admin
response type: sends a json object of type { "admin": object } if it doesn't exist already. Else sends "Unauthorized"
*/
addAdmin = function(expressInstance)
{
    expressInstance.post('/admin', (req, res) => {

        //Checking if Admin already exists.
        AdminModel.findOne( { "username": req.body.username },  (err, adminObject) => 
        {
            if(err)
            {
                res.status(400).send("Bad request");
            }
            else
            {
                if(adminObject === null)
                {
                    //Adding Admin if it doesn't exist.
                    AdminModel.create(req.body.admin, (err, adminObject) => 
                    {
                        if(err)
                        {
                            res.status(400).send("Bad request");
                        }
                        else
                        {
                            res.json( { "admin": adminObject } );
                        }
                    });
                }
                else
                {
                    res.status(401).send("Unauthorized");
                }
            }
        });
    });
}

/*
method: getAdmin(expressInstance)
url: domain/admin?username
response type: sends a json object of type { "admin": object } if it exists. Else sends { "admin": null }
*/
getAdmin = function(expressInstance)
{
    expressInstance.get('/admin', (req, res) => {
        AdminModel.findOne( { "username": req.query.username },  (err, adminObject) => 
        {
            if(err)
            {
                res.status(400).send("Bad request");
            }
            else
            {
                res.json( { "admin": adminObject } );
            }
        });
    });
}

/*
method: getAllAdmins(expressInstance)
url: domain/admin/all-admins
response type: sends an array of objects of type { "admin": object }[] if it exists. Else sends "Bad Request"
*/
getAllAdmins = function(expressInstance)
{
    expressInstance.get('/admin/all-admins', (req, res) => {
        AdminModel.find( (err, adminObject) => 
        {
            if(err)
            {
                res.status(400).send("Bad Request");
            }
            else
            {
                res.json( { "admin": adminObject } );
            }
        });
    });
}

//CRUD operations at one place
exports.createRoutes = function(expressInstance, jwtInstance, verifyToken)
{
    addAdmin(expressInstance);
    getAdmin(expressInstance);
    getAllAdmins(expressInstance);
}