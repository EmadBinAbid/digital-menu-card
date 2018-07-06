/*
@author: Emad Bin Abid
@date: July 06, 2018
*/

//Dependencies
const mongoose = require('mongoose');

//Defining Schema --> TENTATIVE ITEM SCHEMA
const itemSchema = mongoose.Schema(
    {
        //itemId --> auto-generated

        name:
        {
            type: String,
            required: true
        },
        category: 
        {
            type: String,
            required: true
        },
        ingredients:
        {
            type: String,
            required: true
        },
        price:
        {
            type: String,
            required: true
        }
    }
);

const ItemModel = exports.ItemModel = mongoose.model('ItemModel', itemSchema);