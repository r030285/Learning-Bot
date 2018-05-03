const projectId = 'roque-18554';
const sessionId = 'quickstart-session-id';
const query = 'Hello';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient({keyFilename: 'df_bot_learning.json'});

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// 9827ee60f01a9ef53a1b84b4a7644c370847c203
// gcloud iam service-accounts keys create df_bot_learning.json --iam-account dialogflow-atwrfd@roque-18554.iam.gserviceaccount.com
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    console.log(JSON.stringify(responses));
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
