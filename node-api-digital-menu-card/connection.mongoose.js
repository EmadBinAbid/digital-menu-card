/*
@author: Emad Bin Abid
@date: July 06, 2018
*/

//Creating database connection

const dbName = "DigitalMenuCardApp";
const port = "27017";

exports.connect = function(mongooseInstance)
{
    mongooseInstance.connect(`mongodb://localhost/${dbName}`, (err) => {
        if(err)
        {
            console.log(`[-]: Error in MongoDB connection: ${dbName}, PORT: ${port}`);
        }
        else
        {
            console.log(`[+]: Connected to MongoDB: ${dbName}, PORT: ${port}`);
        }
    });
}