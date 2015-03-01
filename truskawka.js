#!/usr/bin/env node
var debug = require('debug')('truskawka');
var config = require('./config');
var Horseman = require('node-horseman');
var horseman = new Horseman();

horseman.on('consoleMessage', function(msg){
  console.log(msg);
});

if(config.url !== undefined){
  var data = horseman
    .open(config.url)
    .manipulate(function(){
      $('#Login').contents().find('input[name=CC]').val(config.client);
      $('#Login').contents().find('input[name=UserID]').val(config.user);
      $('#Login').contents().find('input[name=UserPass]').val(config.password);
      $('#Login').contents().find('input[name=Login]').click();
    })
    .waitFor(function(){
      $('#WorkArea').contents().find('#HomePageTable').find('.seccion').find('h1').text() === "MIS DATOS PERSONALESMI GESTIÓN DEL TIEMPOMI COMPAÑÍA"
    }, true)
    .manipulate(function(){
      $('#WorkArea').contents().find('#HomePageTable').find('.seccion').find('li :nth-child(2)')[1].click();
    })
    .waitForNextPage()
    .manipulate(function(){
      $('#WorkArea').contents().find('#A3TblPayrollSheet_PBt').click();
    })
    .evaluate(function(){
      return $('#WorkArea').contents().find('#HomePageTable').find('.seccion').find('li :nth-child(2)').text();
    });

    /*
    Download pdf??
    https://github.com/johntitus/node-horseman/issues/3
    1. "https://www.a3erp-portalempleado.net/A3LabSupportPages/A3LabDownloadFile.as…20Salario%20.pdf&FileName=Hoja%20Salario&mustDeleteFile=True&OnlyOpen=true"

    */

  debug("horseman scrapper: "+data);
  horseman.close();
}
