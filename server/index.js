const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true}).then(() => {
    console.log("MongoDB Connected")
}).catch(err => console.log(err));

//using of routes
app.use('/api/users', userRoute);
app.use('/api/pin', pinRoute);

PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})