const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res){
    
    
    const queryCity = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity +"&units=metric&appid=d26a08a0c3e11c8dcdad32a25544a562"
    https.get(url, function(response){
        console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The weather description is currently " + desc + "</h1>");
            res.write("<p>The Temperature in " + queryCity + " is " + temp + " degree Celcius </p>");
            res.write("<img src=" + image + ">");
            res.send();
        });
    });
});




app.listen(3000, function(){
    console.log("Server is running in post 3000")
})