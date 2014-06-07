/**
 * Created by mishrab on 6/7/14.
 */

var http = require('http');

exports.getStateInfo = function(state_code, callback){
    http.get('http://api.sba.gov/geodata/city_county_links_for_state_of/' + state_code + '.json', function(res){
        console.log(res.statusCode);
        var response = '';
        res.on('data', function(chunk){
            response += chunk;
        });
        res.on('end', function(){
            console.log(response);
        });
    });
};

