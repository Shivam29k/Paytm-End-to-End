const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes/index')
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());  //Used to enable cors
app.use(express.json()); //Used to parse JSON bodies


app.use('/api/v1', rootRouter);

app.get('/', (req, res) => {
    res.send('Application is up!');
});



app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on port: ${port}`);
})