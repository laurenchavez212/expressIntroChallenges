var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.get('/hello', (req, res)=> {
  res.send('Hello!')
});

app.post('/create/:name', (req, res)=> {
  var hi = {
    "id":1,
    "name": req.params.name,
  };
  res.json(hi)
});

app.get('/', (req, res)=> {
  var data = fs.readFileSync("part1/index.html", 'utf8');
  res.send(data)
})

app.get('/verify/:age', (req, res)=> {
  if(req.params.age > 13) {
    res.send(200)
  } else (res.send(403))
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
