const mongoose = require('mongoose');
const validator = require('validator');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
    
const scoresSchema = new mongoose.Schema({

    id_competition :{
        type: ObjectId,
      //  required : true

    },

    id_team: {
        type: String,
        trim : true,
      //  required : true

    },
    points:{
      type:Number

    }

})

const Scores = mongoose.model('Scores',scoresSchema);
module.exports = Scores;