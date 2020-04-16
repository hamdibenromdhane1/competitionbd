const mongoose = require('mongoose');
const validator = require('validator')
const Scores = require('../models/scores');


/*
matchs:{
    number_round,
    number_game,
    date,
    team_local,
    team_visitor,
    name_stadium,
    name_referee,
    score:{
        number_goal_team_local,
        number_goal_team_visitor,
        
    }
    id_competition
}
*/
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const matchsSchema = new mongoose.Schema({

    number_round: {
        type: Number,
        trim: true,
        //   required : true

    },
    number_game: {
        type: Number,
        trim: true,
        //   required : true
    },
    date: {
        type: Date,
        trim: true,
        //    required : true

    },
    team_local: {
        type: String,
        trim: true,
        //  required : true
    },
    team_visitor: {
        type: String,
        trim: true,
        // required : true

    },
    name_stadium: {
        type: String,
        trim: true,
        //  required : true

    },
    name_referee: {
        type: String,
        trim: true,
        //  required : true

    },
    score: {
        number_goal_team_local: {
            type: Number,
            trim: true,
            default: ""
            // required : true

        },
        number_goal_team_visitor: {
            type: Number,
            trim: true,
            default: ""
            //required : true
        }
    },
    status: {
        type: String,
        trim: true,
        default: "Not Started yet"
    },


    id_competition: {
        type: ObjectId,

    }

})

matchsSchema.pre('save', async function (next) {
    const match = this

    if (match.score.number_goal_team_local > match.score.number_goal_team_visitor) {

        const score = new Scores({
            id_competition: match.id_competition,
            id_team: match.team_local,
            points: 3,

        });
        score.save().then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }
    else if (match.score.number_goal_team_local < match.score.number_goal_team_visitor) {
        
        const score = new Scores({
            id_competition: match.id_competition,
            id_team: match.team_visitor,
            points: 3,

        });
        score.save().then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }
    
    else {

        var score = [{ 
            id_competition: match.id_competition,
            id_team: match.team_visitor,
            points: 1,
             },
             {
                id_competition: match.id_competition,
                id_team: match.team_local,
                points: 1,
                 }];

    Scores.collection.insert(score,function(err,doc){
        
    }) 
      

    }

    next()
})
const Matchs = mongoose.model('Matchs', matchsSchema);
module.exports = Matchs;