 db.matchs.aggregate(

   [

    {

         $project:

           {

               

             "team_visitor": 1,

               "score.number_goal_team_visitor":1,

               "score.number_goal_team_local":1,

        "goals_team_visitor":"$score.number_goal_team_visitor", "goals_conceded2":"$score.number_goal_team_local",

                       "goals_team_local":"$score.number_goal_team_local", "goals_conceded1":"$score.number_goal_team_visitor",

team:"$team_local", team2:"$team_visitor",


       "points2":

               {

                 $cond:              

                 { 

                "if": { "$gt": [ "$score.number_goal_team_visitor", "$score.number_goal_team_local" ]  }, 

                "then": 3,

                "else": {

                    "$cond": {

                        "if": { "$eq": [ "$score.number_goal_team_visitor", "$score.number_goal_team_local" ] }, 

                        "then": 1, 

                        "else": 0

                    }


               }

           }

      } ,

          "points":

               {

                 $cond:              

                 { 

                "if": { "$gt": [ "$score.number_goal_team_local", "$score.number_goal_team_visitor" ]  }, 

                "then": 3,

                "else": {

                    "$cond": {

                        "if": { "$eq": [ "$score.number_goal_team_local", "$score.number_goal_team_visitor" ] }, 

                        "then": 1, 

                        "else": 0

                    }

               }

           }

      } 

  }} , { "$group": {

        _id:"$team2",  goals_scored: {$sum:"$goals_team_local"}, goals_conceded : {$sum:"$goals_team_visitor"}, 

      //  points : {$sum:"$points"},
        points2 : {$sum:"$points2"}

        }}, 

       

        {$sort: {"points":-1, "goals_difference":-1}}
        

      ])