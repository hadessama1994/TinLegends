const express =  require ('express');
const routes = require('./routes');
const app = express();
const mongoose = require('mongoose')
const PORT = '3333'
const cors = require('cors')


mongoose.connect('mongodb+srv://hades:hades@cluster0.1astg.mongodb.net/tindev?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true   
})

app.use(cors());
app.listen(PORT);
app.use(express.json());
app.use(routes);
