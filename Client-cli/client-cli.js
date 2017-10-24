var admin = require('firebase-admin');

var serviceAccount = require("./qualygame-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://qualygame.firebaseio.com/"
});

console.log("Qualygame Client-CLI Started \n");
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
    console.log("User found! \n");    
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
                            activeIteration = key;
                            return true;
                        }
                    }
                }
            });

            if(activeIteration != null)
            {
                console.log("Iteration found!");
                prepareCommitedArtifacts(user, activeIteration);
            }
        }
    });
}

function prepareCommitedArtifacts(user, activeIteration)
{
    admin.database().ref("/artifacts")
    .once("value", ( result ) => {
        let artifacts = result.val();
        
        let files = gitlogfiles.split(",");

        let commitedArtifacts =  [];

        for(let key in artifacts)
        {
            for(let i = 0; i < files.length; i++)
            {
                let commitedFile = files[i].split("/");
                let commitedFileName = commitedFile[commitedFile.length - 1];
                
                if(artifacts[key].code == commitedFileName.split("-")[0])
                {
                    commitedArtifacts.push({
                        artifact: artifacts[key].code,
                        filePath: files[i],
                        status: 0
                    });
                }
            }
        };

        console.log("Commit created!");
        persistCommit(user, activeIteration, commitedArtifacts);

    });
}

function persistCommit(user, activeIteration, commitedArtifacts)
{
    let commit = {
        date: new Date(date).getTime(),
        hash: hash,
        iteration: activeIteration,
        message: message,
        status: 0,
        user: user.nickname
    }

    admin.database().ref("/commits/"+commit.hash)
    .set(commit)
    .then( ( result ) => {
        admin.database().ref("/commits/"+commit.hash+"/commitedArtifacts")
        .set(commitedArtifacts)
        .then( (result) => {
            if(commitedArtifacts.length == 0)
            {   
                persistCommitPontuation(user, commit, "COMMIT_WITHOUT_ARTIFACT");
                console.log("Persisting commit with positive pontuation!");
            }
            else
            {
                console.log("Persisting commit with negative pontuation!");
                persistCommitPontuation(user, commit, "COMMIT");
            }
        })
        .catch( ( exception ) => {
            console.error(exception);
        });
    });
}

function persistCommitPontuation(user, commit, actionName)
{
    admin.database().ref("/actions")
    .once("value", ( result ) => {
        let action = null;

        for(let key in result.val())
        {
            if(result.val()[key].name == actionName)
            {
                action = result.val()[key];
            }
        }

        let pontuation = {
            action: action.name,
            commit: commit.hash,
            status: 0,
            timestamp: new Date().getTime(),
            value: action.pontuation
        }

        admin.database().ref("/users/"+user.nickname+"/pontuation")
        .push(pontuation)
        .then( ( result ) => {
            console.log("Commit and pontuation persisted! Hash: "+commit.hash);
            process.exit(0);
        });
    });
}