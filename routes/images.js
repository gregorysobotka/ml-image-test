var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/location/:cityName', function(req, res, next){

    const cityName = req.params.cityName;

    res.json({destination: stubbedCityData(cityName)});

});

module.exports = router;

function stubbedCityData(cityName){

    const stubbedData = {

        "seattle": [
            {
                url: "http://media.royalcaribbean.com/content/shared_assets/images/ports/hero/SEA_01.jpg",
                tags: ["mountain","city"],
                id: 1,
                score: 0,
                lowScore: 0
            },
            {
                url: "http://www.brittluneborg.com/wp-content/uploads/2011/11/Seattle-Skyline.jpg",
                tags: ["city"],
                id: 2,
                score: 0,
                lowScore: 0
            },
            {
                url: "http://www.atmos.washington.edu/~mdwarner/research/pnw_snow/noaaproject/images/seattle.jpg",
                tags: ["city","snow","cold"],
                id: 3,
                score: 0,
                lowScore: 0
            },
            {
                url: "https://blog.boatsetter.com/wp-content/uploads/sites/2/2016/07/Seattle-boat-rentals.jpg",
                tags: ["city","water","warm"],
                id: 4,
                score: 0,
                lowScore: 0
            },
            {
                url: "http://www.guidepupseattle.org/images/karen_spaceneedle.jpg",
                tags: ["puppy","city","cold"],
                id: 5,
                score: 0,
                lowScore: 0
            },
            {
                url: "http://uploads.visitseattle.org/2015/02/MtRainier_RickBergstrom-1024x627.jpg",
                tags: ["cold","nature"],
                id: 5,
                score: 0,
                lowScore: 0
            },
            {
                url: "https://static.rootsrated.com/image/upload/s--SW4gyoYZ--/t_rr_large_traditional/uexda0bua3lnisuiwqt1.jpg",
                tags: ["nature","water"],
                id: 5,
                score: 0,
                lowScore: 0
            }
        ]

    };


    return (stubbedData.hasOwnProperty(cityName)) ? stubbedData[cityName] : {};

};
