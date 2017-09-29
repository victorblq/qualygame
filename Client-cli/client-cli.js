var admin = require('firebase-admin');

var serviceAccount = require("./qualygame-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://qualygame.firebaseio.com/"
});

//argv[0] is the nodejs home 
//argv[1] is the script directory (full path)
let hash = process.argv[2];
let message = process.argv[3];
let userEmail = process.argv[4];
let date = process.argv[5];
let gitlogfiles = process.argv[6];

admin.database().ref("/users")
.orderByChild("email")
.equalTo(userEmail)
.once("child_added", ( result ) => {
    var user = result.val();

    findTeamInteration(user);
});

function findTeamInteration(user)
{
    admin.database().ref("/teams")
    .once("value", ( result ) => {
        let teams = result.val();

        let foundTeam = null;

        for(let index in teams)
        {
            for(let j = 0; j < teams[index].members.length; j++)
            { 
                if(teams[index].members[j] == user.nickname)
                {
                    foundTeam = teams[index];
                }
            }
        }

        if(foundTeam != null)
        {
            let activeIteration = null;

            foundTeam.projects.find( ( projectToFind ) => {
                for( let i = 0; i < foundTeam.projects.length; i++ )
                {
                    for( let key in foundTeam.projects[i].iterations)
                    {
                        if(foundTeam.projects[i].iterations[key].status == 1)
                        {
                            activeIteration = foundTeam.projects[i].iterations[key];
                            return true;
                        }
                    }
                }
            });

            if(activeIteration != null)
            {
                prepareCommitedArtifacts(user, activeIteration);
            }
        }
        process.exit(0);
    });
}

function prepareCommitedArtifacts(user, activeIteration)
{

}
// admin.database().ref("/testes/")
//     .set({
//         hash: hash,
//         message: message,
//         userEmail: userEmail,
//         date: new Date(date).getTime(),
//         gitlogfiles: gitlogfiles
//     })
//     .then((result) => {
//         console.log(result);
//         process.exit(0);
//     })
//     .catch((exception) => {
//         console.log(exception);
//         process.exit(1);
//     });