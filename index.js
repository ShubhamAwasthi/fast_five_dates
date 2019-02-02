var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});


app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});
