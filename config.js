var debug = require('debug')('truskawka');
var fs = require('fs');
var prompt = require('prompt');

var configFile='nomina';
var configFileJson=configFile+'.json';

var generateConfigFile = function(){
  debug('generating default configuration...');
  var configurationSchema = {
    properties: {
      url: {
        description: "URL del servicio de nóminas",
        message: "es obligatorio",
        default: "https://www.a3erp-portalempleado.net/indexc.html",
        required: true
      },
      client: {
        description: "Código de cliente proporcionado por administración",
        message: "es obligatorio",
        required: true
      },
      user: {
        description: "Código de usuario proporcionado por administración",
        message: "es obligatorio",
        required: true
      },
      password: {
        description: "Contraseña proporcionada por administración",
        message: "es obligatorio",
        required: true,
        hidden: true
      },
      dropboxPath: {
        description: "Ruta de dropbox para guardar las nóminas",
        required: false
      }
    }
  };
  prompt.message = "mns>";
  prompt.start();
  prompt.get(configurationSchema, function (err, result) {
    fs.writeFile(configFileJson, JSON.stringify(result, null, 2), function(err){
      if(err) reset();
      debug("configuration file created");
      debug("re-run the app to load and get all documents");
    });
  });
};

var reset = function(){
  debug('reset');
  fs.unlink(configFileJson, function(err){
    debug('successfully deleted '+configFile);
  });
};

var check = function () {
  if(fs.existsSync(configFileJson)){
    debug('configuration loaded: ');
    var config = require('./'+configFile);
    debug(JSON.stringify(config, null, 2));
    return config;
  }else{
    generateConfigFile();
    return ('./'+configFile);
  }
};

module.exports = check();
