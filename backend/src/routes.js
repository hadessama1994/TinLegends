const express =  require ('express');
const routes = express.Router();
const PlayerController = require ('./controllers/PlayerController');
const LikeController = require ('./controllers/LikeController');
const DislikeController = require ('./controllers/DislikeController');


routes.post('/players', PlayerController.store);
routes.get('/players/:id', PlayerController.show);
routes.get('/players', PlayerController.index);
///
routes.post('/players/:PlayerId/likes', LikeController.store);
routes.post('/players/:PlayerId/dislikes', DislikeController.store);


module.exports = routes;