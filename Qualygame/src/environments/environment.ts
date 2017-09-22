// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyD8TEuhL0uel77yA6yds1p20Da2OVBAF6s",
        authDomain: "qualygame.firebaseapp.com",
        databaseURL: "https://qualygame.firebaseio.com",
        projectId: "qualygame",
        storageBucket: "qualygame.appspot.com",
        messagingSenderId: "325735704243"
    }
};