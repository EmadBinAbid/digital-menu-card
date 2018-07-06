/*
@author: Emad Bin Abid
@date: July 06, 2018
*/

//Dependencies
const mongoose = require('mongoose');

//Defining Schema --> TENTATIVE ADMIN SCHEMA
const adminSchema = mongoose.Schema(
    {
        //adminId --> auto-generated

        firstName: 
        {
            type: String,
            required: true
        },
        lastName: 
        {
            type: String,
            required: true
        },
        username:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        }
    }
);

const AdminModel = exports.AdminModel = mongoose.model('AdminModel', adminSchema);