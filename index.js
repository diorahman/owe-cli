var request = require('request');
var cheerio = require('cheerio');

module.exports = owe;

function parse(url, cb) {
  var r = request({ method : 'POST', url : 'http://w.blankon.in/'}, cb);
  var form = r.form();
  form.append('url', url); 
}

function crunch(data) {
  var $ = cheerio.load(data);
  var el = $('.success > input')['1'];
  if (!el) {
    return;
  }
  return { location: el.attribs.value};
}

function owe(program, cb) {
  if (program.args.length != 1) {
    return cb(new Error('should have a valid url.'));
  }
  parse(program.args.pop(), function(err, resp, data){
    if (err) {
      return cb(err);
    }
    var location = crunch(data);
    cb(!location ? new Error('Invalid url') : null, location); 
  });
}
