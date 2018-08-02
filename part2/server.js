var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.post('/create/:name/:age', (req, res)=> {
  var obj = {
    name: req.params.name,
    age: parseInt(req.params.age),
  };
  fs.readFile("storage.json", 'utf8', (err, data)=> {
    let arr = JSON.parse(data);
    arr.push(obj);
    fs.writeFile('./storage.json', JSON.stringify(arr), (err, data)=> {
      if(err){
        throw err;
      }
      res.sendStatus(200)
    })
  })
})

app.get('/', (req, res)=> {
  fs.readFile('storage.json', 'utf8', (err, data)=> {
    res.send(data)
  })
})

app.get('/:name', (req, res)=> {
  fs.readFile('storage.json', 'utf8', (err, data)=>{
    let pd = JSON.parse(data);
    let match = pd.filter((item)=> {
      return item.name == req.params.name;

    });
    if(match.length >= 1) {
      res.send(match[0])
    } else {
      res.sendStatus(400)
    }
  })
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
