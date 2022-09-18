const express = require('express')
const bodyParser = require('body-parser')
const request1 = require('request-promise');

const app = express() 
const port = process.env.VCAP_APP_PORT || 5000 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()) 


app.post('/test', (req, res) => {
  console.log(req.body)

  res.send({
    replies: [{
      type: 'text',
      content: 'Roger that',
    }], 
    conversation: {
      memory: { key: 'value' }
    }
  })
})


app.post('/welcome', (req, res) => {
  console.log(req.body)

  res.send({
    replies: [{
      type: 'text',
      content: 'Hello Amar Medavarapu',
    }], 
    conversation: {
      memory: { userid: 'AMAR04',
                userName: "Amar Medavarapu" }
    }
  })
})


app.post('/bookcar', (req, res) => {
  console.log(req.body)
  console.log('Inside POST request ------------->>')

  var userName  = req.body.conversation.memory.userName;
  var city      = req.body.conversation.memory.v_city.raw;
  var carType   = req.body.conversation.memory.v_cartype.raw;
  var startDate = req.body.conversation.memory.v_startdate.iso;
  var endDate   = req.body.conversation.memory.v_enddate.iso;


// var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://b961c55etrial-ddd-carrental-srv.cfapps.us10.hana.ondemand.com/catalog/carBooking',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "carID": 1,
    "customerName": userName,
    "carlocation": city,
    "carType": carType,
    "startDate": startDate,
    "endDate": endDate
  })


};
request1(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

  res.send({
    replies: [{
      type: 'text',
      content: 'Your booking got confirmed!',
    }], 
    conversation: {
      memory: { booking: 'confirmed' }
    }
  })
})



app.post('/confirmation-notebook', (req, res) => {
    console.log(req.body)
    console.log('Inside POST request ------------->>')
  
    var lv_userName       = req.body.conversation.memory.userName;
// var lv_productid      = req.body.conversation.memory.v_productid.raw;
// var lv_productname    = req.body.conversation.memory.v_productname.raw;
// var lv_model          = req.body.conversation.memory.v_model.raw;
    var lv_shiptocity     = req.body.conversation.memory.v_shiptocity.raw;
    var lv_promocode      = req.body.conversation.memory.v_promocode.raw;

  
  // var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://b961c55etrial-ddd-carrental-srv.cfapps.us10.hana.ondemand.com/catalog/Computers',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "productid": 2,                //lv_productid,
      "customerName": lv_userName,
      "productname": 'Surface Go 3', //lv_productname,
      "model": 'TTT',                //lv_model,
      "shiptocity": lv_shiptocity,
      "promocode": lv_promocode
    })
  
  };
  request1(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  
    res.send({
      replies: [{
        type: 'text',
        content: 'Your booking got confirmed!',
      }], 
      conversation: {
        memory: { booking: 'confirmed' }
      }
    })
  })




app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send() 
}) 

app.listen(port, () => { 
  console.log('Server is running on port 5000') 
})