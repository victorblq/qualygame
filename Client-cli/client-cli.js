var admin = require('firebase-admin');

var serviceAccount = require("./qualygame-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://qualygame.firebaseio.com/"
});

let user = process.argv[2];

admin.database().ref("/commits/Pigmeo/hashTeste123")
.set({"teste": "teste"})
.then( (result) => {
    console.log(result);
    process.exit(0);
})
.catch( (exception) => {
    console.log(exception);
    process.exit(1);
});

