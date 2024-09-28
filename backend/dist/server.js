"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var port = process.env.PORT || 3005;
// const port =  3001;

//create app
var app = (0, _express["default"])();

//serve static page into public directory
app.use(_express["default"]["static"]("frontend/public"));
app.listen(port, function () {
  console.log("Listening on port: localhost:".concat(port));
});

//docker build -t image .

//docker run --name express -p 3005:3000 image