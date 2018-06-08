const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append file log');
        }
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        welcomeMessage: 'Welcome to the website!',
        pageTitle: 'Home Page',
    })
});

app.get('/about', (req, res)=>{
    // res.send("About Page");
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: "Ooops.. something went wrong!"
    });
});

//Local port (first arg) would be 3000
app.listen(port, () =>{
    console.log(`Server is up on port ${port}`)
});