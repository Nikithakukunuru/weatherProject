const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey="143c26f2be8719cb298e280c3c9f18b5"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/find?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temp=weatherData.message;
            console.log(temp);
            const temp1=weatherData.list[0].main.temp;
            console.log(temp1);
            const temp2=weatherData.list[0].weather[0].description;
            console.log(temp2);
            
            const icon=weatherData.list[0].weather[0].icon
            console.log(icon);
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p> the weather is currently"+temp2+"<p>")
            res.write("<h1>the temperature is currently"+temp1+"degrees celcius.</h1>")
            res.write("<img src="+imageURL+">");
            res.send();
        })
    })
})

   



app.listen(3000,function(){
    console.log("server is running on 3000");
})