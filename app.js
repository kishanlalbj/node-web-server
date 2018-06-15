const express = require('express')
const path = require('path')
const hbs = require('hbs')
const favicon = require('serve-favicon')
const fs = require('fs')
const port = process.env.PORT || 3000

var app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon-blogger.png')))
hbs.registerPartials(path.join(__dirname,'views/partials'))
app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    var log = `${new Date().toString()}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log + '\n',(err) => {
        if(err) {
            console.log('unable to write log file',err);
        }
    })
    next();
})
// app.use((req,res,next)=> {
//     res.render('maintenance.hbs')
//     next();
// })
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
})


app.get('/',(req,res) => {
    res.render('home.hbs',{
        heading: 'Welcome to Home Page',
        title:'Node Web server',
        brand:'Express'
    })
})

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        brand:'Express',
        title:'Node Web server',
        heading: 'About page'
       
    })
})

app.listen(port,(err,res)=> {
    if(err) {
        console.log(err)
    } else {
        console.log(`Server started on port ${port}`)
    }
})

