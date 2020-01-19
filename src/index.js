const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');


const app = express();

mongoose.connect('mongodb+srv://Pablo:mongodb_123@cluster0-f6fsm.mongodb.net/dbDevRadar?retryWrites=true&w=majority',{
   useNewUrlParser: true,
   useUnifiedTopology: true 
});

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3333);

