/*
@author: Emad Bin Abid
@date: July 06, 2018
*/

//Dependencies
const config = require('./config');
const adminModel = require('./models/admin-model/admin.model');

const AdminModel = adminModel.AdminModel;

//Validating Admin on /login request.
/*
method: validateAdmin(expressInstance, jwtInstance)
url: domain/login
request object: expects a json object of type { "admin": object }
response object: sends a json object of type { "admin": object, "token": token }. If error, then sends "Unauthorized"
*/
exports.validateAdmin = function(expressInstance, jwtInstance)
{
    //Validating Admin
    expressInstance.post('/login', (req, res) => 
    {
        if(req.body.admin.username && req.body.admin.password)
        {
            AdminModel.findOne({ username: req.body.admin.username }, (err, adminObject) => 
            {
                if(err)
                {
                    res.status(401).send('Unauthorized');
                }
                else
                {
                    if(adminObject === null)
                    {
                        res.status(401).send('Unauthorized');
                    }
                    else
                    {
                        const signObject = { "admin": dbObject };
                        jwtInstance.sign(signObject, config.jwt_key, (err, token) => 
                        {
                            if(err)
                            {
                                res.status(401).send('Unauthorized');
                            }
                            else
                            {
                                res.json({ "admin": dbObject, "token": token });
                            }
                        });
                    }
                }
            });
        }
    });
}

//Verifying the token
exports.verifyToken = function(req, res, next)
{
    const authHeader = req.headers['authorization'];
    //authHeader is a string containing token under the Authorization Header sent by the client.

    if(typeof authHeader !== 'undefined')
    {
        req.token = authHeader;
        next();
    }
    else
    {
        res.status(401).send('Unauthorized');
    }
}