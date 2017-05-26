var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var machinelearning = new AWS.MachineLearning({
    endpoint: process.env.endpoint,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
});

/* GET users listing. */
router.get('/:tag', function(req, res, next) {
    'use strict';

    let tag = req.params.tag,
        uid = ( typeof req.query.uid !== "undefined" ) ? req.query.uid : "3";

    var params = {
        MLModelId: process.env.MLModelId,
        PredictEndpoint: process.env.PredictEndpoint,
        Record: {
            uid: uid,
            tag: tag,
            age: "21",
            brand: "expedia"
        }
    };

    machinelearning.predict(params, function(err, data) {
        'use strict';
        let prediction = (err) ? { message: err } : data;
        res.send(prediction);
    });

});

module.exports = router;
