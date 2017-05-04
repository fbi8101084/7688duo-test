console.log('WWW blink start ...');

var ledPin = 13;
var firmata = require('firmata');

var board = new firmata.Board("/dev/ttyS0", function(err) {
    if (err) {
        console.log(err);
        board.reset();
        return;
    }

    console.log('connected...');
    console.log('board.firmware: ', board.firmware);

    board.pinMode(ledPin, board.MODES.OUTPUT);

    var url = require('url');
    var http = require('http');

    http.createServer(function(request, response) {
        var params = url.parse(request.url, true).query;
        try {
            if (params.value.toLowerCase() == 'high') {
                board.digitalWrite(ledPin, board.HIGH);
            } else if (params.value.toLowerCase() == 'low'){
                board.digitalWrite(ledPin, board.LOW);
            }
        } catch(e) {

        }
        response.writeHead(200);
        response.write("The value written was: " + params.value);
        response.end();
    }.bind(this)).listen(8080);

    console.log('Listening on port 8080 ...');
});