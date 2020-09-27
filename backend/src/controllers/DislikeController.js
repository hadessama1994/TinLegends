const Player = require('../models/Player')


module.exports= {
   async store (req, res){

      const likeSent = req.headers.user;
      const likeRecieved = req.params.PlayerId;
            
      const loggedUser = await Player.findById(likeSent);
      const targetUser = await Player.findById (likeRecieved);

      if(!targetUser){
         return res.status(404).json({error: "Player doesn't exist."});
      }

      loggedUser.dislikes.push(targetUser._id);
      await loggedUser.save();

      return res.json(loggedUser);

   }
}