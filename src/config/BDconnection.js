const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);

module.exports = (function () {mongoose.connect("mongodb+srv://ItaProject:ItaProject@itaproject-jefce.gcp.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true})})();