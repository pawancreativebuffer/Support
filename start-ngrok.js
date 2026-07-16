const ngrok = require('ngrok');

(async function() {
  try {
    const url = await ngrok.connect(3000);
    console.log("=========================================");
    console.log("NGROK_URL:" + url);
    console.log("=========================================");
  } catch (err) {
    console.error("Error starting ngrok:", err);
  }
})();
