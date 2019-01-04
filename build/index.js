"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./api/v1/users"));

var _meetups = _interopRequireDefault(require("./api/v1/meetups"));

var _questions = _interopRequireDefault(require("./api/v1/questions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = 3000;
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));
app.use(_bodyParser.default.text());
app.use('/', _users.default);
app.use('/', _meetups.default);
app.use('/', _questions.default);
app.get('/', function (req, res) {
  res.send('ROOT');
});
app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("I'M LIVE ON PORT ".concat(port));
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map