/*
@author: Emad Bin Abid
@date: July 06, 2018
*/

//Application dependencies
    //custom dependencies
const server = require('./server');
const connection = require('./connection.mongoose');
const authentication = require('./authentication.mongoose');
const adminRouter = require('./models/admin-model/admin.router');
const itemRouter = require('./models/item-model/item.router');

    //npm dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

//Routes
userRouter.createRoutes(app, jwt, authentication.verifyToken);

//Middlewares
app.use(express.json());    //To parse json objects sent by the client.
app.use(cors());            //To resolve cross-origin browser issues.

//Creating routes
adminRouter.createRoutes(app, jwt, authentication.verifyToken);
itemRouter.createRoutes(app, jwt, authentication.verifyToken);


//Validating the admin on Login
authentication.validateAdmin(app, jwt);

//Running the server
server.run(app, 3000);

//Connecting to database
connection.connect(mongoose);