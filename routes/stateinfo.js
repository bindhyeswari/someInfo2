/**
 *
 * /states/ --> give back a list of all states and state codes
 * /states/:stateid --> give back county information for that state
 *  example: /states/ca
 *
 *
 * */

var stateInfo = require('../data/statecodes.js');
var http = require('http');

// Return all state codes
exports.getStateCodes = function(req, res){
    res.json(200, stateInfo.state_codes);
};

exports.cache = {};

// Return county information for a state code
exports.getCountyInfo = function(req, res){

    if (typeof exports.cache[req.params.stateid] === 'undefined'){

        http.get('http://api.sba.gov/geodata/city_county_links_for_state_of/' + req.params.stateid + '.json', function(response){
            console.log(response.statusCode);


            var complete_response = '';
            response.on('data', function(chunk){
                complete_response += chunk;
            });
            response.on('end', function(){
                exports.cache[req.params.stateid] = complete_response;
                res.json(200, {
                    sba_gov_statusCode: response.statusCode,
                    data: complete_response
                });
            });


        });


    } else {
        res.json(200, {
            sba_gov_statusCode: 200,
            data: exports.cache[req.params.stateid]
        });
    }


};