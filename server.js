var express = require('express');
var app = express();
var queryString = require('querystring');
var https = require('https');
var request = require('request');
var resultsArr = [];
var mongodb = require('mongodb');
var mongo_url = 'mongodb://eric8ah:mySecretPass23@ds153775.mlab.com:53775/search-history';
var MongoClient = mongodb.MongoClient;
var string;
var historyArr = [];
var historyObj;


function printResults(values) {
      for (var i=0;i<values.length;i++) {
        var name = values[i].name;
        var image = values[i].contentUrl;
        var webURL = values[i].webSearchUrl;
        var imageResult = {name, image, webURL};
        resultsArr.push(imageResult);
  }
}

var insertSearchTerm = function(db, callback) {
    db.collection('history').insertOne( 
        {
        "term": string,
        "timestamp": new Date(Date.now()).toISOString()
    }, function(err, result) {
        if (err) throw new Error(err);
        console.log('Inserted a record of search term \"' + string + '\"' );
        callback();
    });
};

var getSearchHistory = function(db, callback) {
    var cursor = db.collection('history').find({}, {term: 1, timestamp: 1}).limit(10);
    cursor.each(function(err, doc) {
        if (err) {
            return err;
        } else if (doc !== null) {
            console.dir(doc);
            console.log('doc was found?');
            historyObj = { "term": doc.term, "timestamp": doc.timestamp };
            historyArr.push(historyObj);
            console.log(historyArr);
        } else {
            console.log('doc was not found?');
            callback();
}
});
};

app.get('/api/imagesearch/:query',function(req, res) {
   MongoClient.connect(mongo_url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongo_url);
resultsArr = [];
var options = {};
var offsetVal;
string = req.params.query;
offsetVal = req.query.offset;
if (offsetVal !== undefined) {
  options = { method: 'GET',
                url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
                qs: { q: string, count: '10', offset: offsetVal},
                headers: 
               { 'postman-token': '409cff25-9099-a85f-4d72-777283d089cd',
                 'cache-control': 'no-cache',
                 'ocp-apim-subscription-key': '55ce1008e1094a11bf1480a3e648f087' } };
} else {
  options = { method: 'GET',
                url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
                qs: { q: string, count: '10'},
                headers: 
               { 'postman-token': '409cff25-9099-a85f-4d72-777283d089cd',
                 'cache-control': 'no-cache',
                 'ocp-apim-subscription-key': '55ce1008e1094a11bf1480a3e648f087' } };
}
console.log(options);


request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var newBody = JSON.parse(body);
  var values = newBody['value'];
  printResults(values);
  console.log(resultsArr);
  res.send(resultsArr);
  insertSearchTerm(db, function() {
  });
  db.close();
});
}
});
});

app.get('/api/latest/imagesearch', function(req, res) {
    MongoClient.connect(mongo_url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongo_url);
    getSearchHistory(db, function() {
        res.send(historyArr);
        console.log(historyArr);
    });
    db.close();
}
});
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Server has been started');
});