module.exports = {
    "extends": "airbnb-base",
    "env": {
      "browser": true,
      "mocha": true,
    },
    "rules":{
      "linebreak-style": 0,
      "no-underscore-dangle": [
        "error", { "allowAfterThis": true }
      ]
    },
};