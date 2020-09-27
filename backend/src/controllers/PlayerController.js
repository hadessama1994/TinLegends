require('dotenv').config()
const Player = require('../models/Player');
const LeagueJS = require('leaguejs');
const leagueJs = new LeagueJS(process.env.LEAGUE_API_KEY);



module.exports = {
   async store(req, res){

      const { username } = req.body;      
      //const lolData = await leagueJs.ChampionMastery.gettingBySummoner('9c2AnHUbJ7eeglXAnTh9vVhF69g-DsntVREtg4iJ20G_8AE')

      try {
         const {id: riotId, name, summonerLevel: level, profileIconId} = await leagueJs.Summoner.gettingByName(username)

         const rankingElo = await checkRanking(riotId)

         const userAlreadyExists = await Player.findOne({riotId})
         if (!userAlreadyExists) {
            const player = await Player.create({
               riotId,
               name,
               level,
               rankingElo,
               avatar: `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${profileIconId}.png`
            })
            return res.json(player);
         }
            return res.json({
               status: 'User already taken.',
               _id: userAlreadyExists._id,
         })

      } catch (error) {
         return res.status(404).json({error: "Player doesn't exist."})
      } 

   },

   async show(req, res){    
      const { id } = req.params;       
      const userData = await Player.findById(id)
      if (userData){
       return res.json(userData)
      }     
    },

    async index(req, res){    
     const {user} = req.headers;

     const loggedUser = await Player.findById(user);

     const users = await Player.find({
        $and: [ //&& all //NE Not Equal // NI Not Included
           {_id: {$ne: user}} ,
           {_id: {$nin: loggedUser.likes}},
           {_id: {$nin: loggedUser.dislikes}}
        ]
     })

     return res.json (users)

    },

}
         
      async function checkRanking(riotId){
         const playerElo = await leagueJs.League.gettingLeagueEntriesForSummonerId(riotId)
         if (!playerElo[0]){
            return 'https://vignette.wikia.nocookie.net/leagueoflegends/images/3/38/Season_2019_-_Unranked.png'
         }
         else {
            switch (playerElo[0].tier) {
               case "IRON":
                 return "https://vignette.wikia.nocookie.net/leagueoflegends/images/0/03/Season_2019_-_Iron_1.png"
               case "BRONZE":
                 return "https://vignette.wikia.nocookie.net/leagueoflegends/images/5/5a/Season_2019_-_Bronze_4.png"
               case "SILVER":
                  return "https://vignette.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png";
               case "GOLD":
                 return "https://vignette.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png";
               case "PLATINUM":
                 return "https://vignette.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png";
               case "DIAMOND":
                 return "https://vignette.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png";
               case "MASTER":
                 return "https://vignette.wikia.nocookie.net/leagueoflegends/images/1/11/Season_2019_-_Master_1.png";
             }
            //return `${playerElo[0].tier} - ${playerElo[0].rank}`
         }
      }


   