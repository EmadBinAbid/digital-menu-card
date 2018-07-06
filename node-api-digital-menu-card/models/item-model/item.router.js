/*
@author: Emad Bin Abid
@date: July 06, 2018
*/

//Establishing the routes for item model

//Dependencies
const fs = require('fs');
const config = require('../../config');
const itemModel = require('./item.model');

const ItemModel = itemModel.ItemModel;

/*
method: addItem(expressInstance, jwtInstance, verifyToken)
url: domain/item
request object: expects a json object of type object
response type: sends a json object of type { "item": object }. Else sends "Unauthorized"
*/
addItem = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.post('/item', verifyToken, (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, adminData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                ItemModel.findOne({ name: req.body.name }, (err, itemObject) => {
                    if(err)
                    {
                        console.log(itemObject);
                        res.status(400).send("Bad request");
                    }
                    else
                    {
                        if(itemObject === null)
                        {
                            var newItem = new ItemModel(req.body);
                            
                            newItem.save( (err, itemObject) => {
                                if(err)
                                {
                                    res.status(400).send("Bad request");
                                }
                                else
                                {
                                    res.json({ "item": itemObject });
                                }
                            });
                        }
                        else
                        {
                            res.status(400).send("Bad request");
                        }
                    }
                } );
            }
        });
    });
}

/*
method: updateItem(expressInstance, jwtInstance, verifyToken)
url: domain/item?name
request object: expects a json object of type { "item": object }
response type: sends a json object of type { "item": object }. Else sends "Unauthorized"
*/
updateItem = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.put('/item', verifyToken, (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, adminData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                const query = { name: req.query.name };
                const options = { new: true };

                ItemModel.findOneAndUpdate(query, req.body.item, options, (err, itemObject) => {
                    if (err) 
                    {
                        res.status(400).send("Bad request");
                    }
                    else 
                    {
                        res.json({ "item": itemObject });
                    }
                });
            }
        });
    });
}

/*
method: deleteItem(expressInstance, jwtInstance, verifyToken)
url: domain/item?name
request object: expects a json object of type { "item": object }
response type: sends a json object of type { "item": object }. Else sends "Unauthorized"
*/
deleteItem = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.delete('/item', verifyToken, (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, adminData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                const query = { name: req.query.name };
                ItemModel.remove(query, (err, itemObject) => {
                    if(err)
                    {
                        res.status(400).send("Bad request");
                    }
                    else
                    {
                        res.json({ "item": itemObject });
                    }
                });
            }
        });
    });
}

/*
method: getItemByName(expressInstance)
url: domain/item?name
response type: sends a json object of type { "item": object }. Else sends "Bad request"
*/
getItemByName = function(expressInstance)
{
    expressInstance.get('/item', (req, res) => {
        ItemModel.findOne({ name: req.query.name }, (err, itemObject) => {
            if(err)
            {
                res.status(400).send("Bad request");
            }
            else
            {
                res.json({ "item": itemObject });
            }
        });
    });
}

/*
method: getAllItems(expressInstance)
url: domain/item/all-items
response type: sends a array of json objects of type { "item": object }[]. Else sends "Unauthorized"
*/
getAllItems = function(expressInstance)
{
    expressInstance.get('/item/all-items', (req, res) => {
        ItemModel.find({ }, (err, itemObject) => {
            if(err)
            {
                res.status(400).send("Bad request");
            }
            else
            {
                res.json({ "item": itemObject });
            }
        });
    });
}

//CRUD operations at one place
exports.createRoutes = function(expressInstance, jwtInstance, verifyToken)
{
    addPlot(expressInstance, jwtInstance, verifyToken);
    updatePlot(expressInstance, jwtInstance, verifyToken);
    deletePlot(expressInstance, jwtInstance, verifyToken);
    getPlotById(expressInstance);
    getAllPlots(expressInstance);
}