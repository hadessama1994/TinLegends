const {Schema, model} = require('mongoose');

const PlayerSchema = new Schema ({
   riotId:{
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   level: String,
   rankingElo: String,   
   avatar: {
      type: String,
      required: true
   },
   likes: [{
      type: Schema.Types.ObjectId,
      ref: 'Player'
   }],
   dislikes: [{
      type: Schema.Types.ObjectId,
      ref: 'Player'
   }]

},{
   timestamps: true //create auto CreatedAt and UpdatedAt
});

module.exports = model ('Player', PlayerSchema);