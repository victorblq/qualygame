var admin = require('firebase-admin');

var serviceAccount = require("./qualygame-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://qualygame.firebaseio.com/"
});

let hash = process.argv[2];
let userEmail = process.argv[3];

console.log(hash);
console.log(userEmail);
// admin.database().ref("/commits/")
// .set({"teste": "teste"})
// .then( (result) => {
//     console.log(result);
//     process.exit(0);
// })
// .catch( (exception) => {
//     console.log(exception);
//     process.exit(1);
// });

