const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = 'mongodb+srv://singh:ranveer@cluster0.auuzisr.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0' // Customer change url to your db you created in atlas
// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = function(callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err) => {
        if (err) {
            console.log("---" + err);
            callback(err);
        } else {
            console.log("connected to mongo");

            try {
                const foodCollection = mongoose.connection.db.collection("food_items");
                const categoryCollection = mongoose.connection.db.collection("foodCategory");

                const foodData = await foodCollection.find({}).toArray();
                const categoryData = await categoryCollection.find({}).toArray();

                callback(null, foodData, categoryData);
            } catch (err) {
                console.error("Error retrieving data:", err);
                callback(err);
            }
        }
    });
};