var https = require('https');

exports.handler = (event, context) => {
  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`);
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Hi Trang, well com to your home", 
true),
            {}
          )
        )
      break;
    

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`);
        var stateOn = 'on'; 
        var stateOff = 'off';
        var stateStart = 'start';
        var stateStop = 'stop';

        switch(event.request.intent.name){

          case "demo": 
            var state = event.request.intent.slots.state.value;

            if(state == 'on'){
                var endpoint = 
"https://api.thingspeak.com/update?api_key=F3S8JXCDUB6YEY94&field1=0";
                https.get(endpoint, function (result) {
                console.log('Success, with: ' + result.state);
                var x = context.succeed(
                    generateResponse( 
                    buildSpeechletResponse("the light is turned on", 
true),
                        {}
                    )
                );
                console.log(x);
                }).on('error', function (err) {
                console.log('Error, with: ' + err.message);
                context.done("Failed");
                });
            }else if(state =='off'){
                var endpoint = 
"https://api.thingspeak.com/update?api_key=F3S8JXCDUB6YEY94&field1=1";
                https.get(endpoint, function (result) {
                console.log('Success, with: ' + result.state);
                var y = context.succeed(
                    generateResponse( 
                    buildSpeechletResponse("the light is turned off", 
true),
                        {}
                    )
                );
                console.log(y);
                }).on('error', function (err) {
                console.log('Error, with: ' + err.message);
                context.done("Failed");
                });
            }
            //
            if(state == 'start'){
                var endpoint = 
"https://api.thingspeak.com/update?api_key=F3S8JXCDUB6YEY94&field2=0";
                https.get(endpoint, function (result) {
                console.log('Success, with: ' + result.state);
                var x = context.succeed(
                    generateResponse( 
                    buildSpeechletResponse("the fan is started", true),
                        {}
                    )
                );
                console.log(x);
                }).on('error', function (err) {
                console.log('Error, with: ' + err.message);
                context.done("Failed");
                });
            }else if(state =='stop'){
                var endpoint = 
"https://api.thingspeak.com/update?api_key=F3S8JXCDUB6YEY94&field2=1";
                https.get(endpoint, function (result) {
                console.log('Success, with: ' + result.state);
                var y = context.succeed(
                    generateResponse( 
                    buildSpeechletResponse("the fan is stopped", true),
                        {}
                    )
                );
                console.log(y);
                }).on('error', function (err) {
                console.log('Error, with: ' + err.message);
                context.done("Failed");
                });
            }
               
            break;

            
            } 
        
      break;

      case "SessionEndedRequest":
      
        console.log(`SESSION ENDED REQUEST`);
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}


buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}
