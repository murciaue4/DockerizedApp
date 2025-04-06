const express = require('express');
const path = require('path');
const adminRoute = require('./modules/clients/routes/CLIENTS.routes');
const userRoute = require('./modules/users/routes/USER.routes');
const authRoute = require('./modules/auth/routes/AUTH.routes');
const { uploader } = require('./middlewares');
const cors = require('cors');
const morgan = require('morgan');








//initializing
const app = express();


//settings

app.set('port', process.env.PORT || 3333);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(uploader);
app.use(express.static(path.join(__dirname, 'static')));


//router
app.use('/api', adminRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute); 


app.listen(app.get('port'), "0.0.0.0", () => {
    console.log(`Server running on port`, app.get('port'));
});
