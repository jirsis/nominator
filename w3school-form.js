var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.open("http://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_submit", function(status) {
  console.log(status);
  if ( status === "success" ) {
    page.includeJs("http://code.jquery.com/jquery-2.1.3.min.js", function() {
      console.log("inject jquery OK!");
      page.injectJs('waitFor.js', function(){
        console.log("inject waitFor OK!");
        page.evaluate(function(){
            console.log("filling form OK!");
            $('#iframeResult').contents().find('input[name=firstname]').val('jirsis');
            $('#iframeResult').contents().find('input[name=lastname]').val('sisrij');
            $('#iframeResult').contents().find('input[type=submit]').click();
            waitFor(function() {
              return page.evaluate(function() {
                  return $('#iframeResult').contents().find('div').is(':visible');
              });
            }, function() {
              console.log("The sign-in dialog should be visible now.");
              phantom.exit();
          });
        });
      })

    });
  }
});
