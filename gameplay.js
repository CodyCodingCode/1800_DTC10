// We're initializing firebase here as a test
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// //

//-----------------------------------------------//
//-- The following is the Account Profile form --//
//-----------------------------------------------//
//insert score and quizvalue for user
var currentUser;

// define variables associated with each button in the game
// these are global scope (I think)
//Main Clicker
let mainbutton = document.querySelector("#mainbutton");
//Score Display
let score_tally = document.querySelector("#score");
let quiz_tally = document.querySelector("#quiz");
//Quiz Buttons
let localNews = document.querySelector("#localnews");
let socialBots = document.querySelector("#socialbots")
let cabelNews = document.querySelector("#cablenews")
let blogs = document.querySelector("#blogs")
let celebs = document.querySelector("#celebs")
let altnews = document.querySelector("#altnews")
let podcasts = document.querySelector("#podcasts")
let adverts = document.querySelector("#advertisements")

//Click incrementer
let pointIncrement = 1;

//let pausebutt = document.querySelector("#pause");
//let playbutton = document.querySelector("#play");

//-----------------------------------------------//
//-- The following checks Firebase for data and--//
//-- Adds it to the user's data if missing     --//
//-----------------------------------------------//
function insertScoreVals() {
  //check user authentication with firebase
  firebase.auth().onAuthStateChanged(user => {
    //if the user is logged in/exists within firestore
    if (user) {
      //access the userid fields
      currentUser = db.collection("users").doc(user.uid)
      currentUser.get()
        .then(userDoc => {
          // I believe these are local scope variables
          // These will store whatever is in these fields (if they exist)
          var totalScore = userDoc.data().score;
          var totalQuizzes = userDoc.data().quizTotal;
          
          //If either of the fields don't exist, create them in firestore
          if (totalScore == null) {
            currentUser.update({
              score: 0,
            });
          } else {
            console.log("Score present in database.")
          };
          if (totalQuizzes == null) {
            currentUser.update({
              quizTotal: 0,
            });
          } else {
            console.log("Quiz Total present in database.")
          }
        })
    } else {
      console.log("No user is signed in")
    }
  });
}

//calls function to ensure scores present in firebase/firestore
//insertScoreVals();




//display the scores
function displayScores() {
  //authenticate user
  firebase.auth().onAuthStateChanged(user => {
    //if logged in/exists
    if (user) {
      currentUser = db.collection("users").doc(user.uid)
      //check the current score, quiz totals
      currentUser.get()
        .then(userDoc => {
          //local scope variables
          var currentScore = userDoc.data().score;
          var currentQuiz = userDoc.data().quizTotal;
          //this should display the numbers
          score_tally.innerHTML = currentScore;
          quiz_tally.innerHTML = currentQuiz;
          
          //make our button clickable
          mainbutton.onclick = () => addPoints(currentUser);

        })
    }
  }) 
};

//calls function to ensure scores present in firebase/firestore

insertScoreVals();
//Calls function to run clicker game - this works, but does not update the printout
displayScores();


//====================================================================================
//====================================================================================
//increment our main score
function addPoints(currentUser) {
  console.log("inside");
  //update the value stored in the score field associated with the user
  currentUser.update({
    score: firebase.firestore.FieldValue.increment(pointIncrement)
  })
}; 

//====================================================================================
//====================================================================================
//define functions to use in our listener
function activateButton(button) {
  button.disabled = false;
};

function deactivateButton(button) {
  button.disabled = true;
};

//====================================================================================
//====================================================================================
// Control the buttons in our game
function buttonController(score) {
  //---- Local News Updgrade
  if (score >= 15) {
    activateButton(localNews);
    console.log('Local News is Activated');

  } else if (score < 15) {
    deactivateButton(localNews);
    console.log('Local News is Deactivated');
  }

  //---- Social bots upgrade
  if (score >= 115) {
    activateButton(socialBots);
    console.log('Social Bots is Activated');
  } else if (score < 115) {
    deactivateButton(socialBots);
    console.log('Social Bots is Deactivated');
  }

  //---- Cable News Upgrade
  if (score >= 315) {
    activateButton(cabelNews);
    console.log('Cable News is Activated');

  } else if (score < 315) {
    deactivateButton(cabelNews);
    console.log('Cable News is Deactivated');
  }

  //---- Blogs Upgrade
  if (score >= 515) {
    activateButton(blogs);
    console.log('Blogs is Activated');

  } else if (score < 515) {
    deactivateButton(blogs);
    console.log('Blogs News is Deactivated');
  }

  //---- Celebs Upgrade
  if (score >= 715) {
    activateButton(celebs);
    console.log('Celebreties is Activated');

  } else if (score < 715) {
    deactivateButton(celebs);
    console.log('Celebrities is Deactivated');
  }

  //---- Alt News Upgrade
  if (score >= 915) {
    activateButton(altnews);
    console.log('Alternative News is Activated');

  } else if (score < 915) {
    deactivateButton(altnews);
    console.log('Alternative News is Deactivated');
  }

  //---- Podcasts upgrade
  if (score >= 1115) {
    activateButton(podcasts);
    console.log('Podcasts is Activated');

  } else if (score < 1115) {
    deactivateButton(podcasts);
    console.log('Podcasts is Deactivated');
  }

  //---- Adverts Upgrade
  if (score >= 1315) {
    activateButton(adverts);
    console.log('Adverts is Activated');

  } else if (score < 1315) {
    deactivateButton(adverts);
    console.log('Adverts is Deactivated');
  }
};

//====================================================================================
//====================================================================================
// Real-time, user-specific score, quiz listener
// This actually listens to the specific user's data, not all users for changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid)
      .onSnapshot((doc) => {
        score_tally.innerHTML = doc.get('score');
        quiz_tally.innerHTML = doc.get('quizTotal');
        console.log("current data ", doc.data());

        // We're adding functionality to this listener.
        // If the score hits a threshold, we will unlock buttons
        buttonController(doc.get('score'));

        // A quiz score tracker will sync with a increment increase function
        });
  }
});


//copy for safekeeping - original listener for points
// db.collection('users').onSnapshot(snapshot => {
//   let changes = snapshot.docChanges();
//   changes.forEach(change => {
//     console.log(change.doc.data());
//     score_tally.innerHTML = change.doc.get('score');
//     quiz_tally.innerHTML = change.doc.get('quizTotal')
//   })
// })


//--------------------------------------------------------------------
//--------------------------------------------------------------------
//----------------------Non-Game Related JS---------------------------
//Create Logout button functionality
function logout() {
  console.log("Logging out a user.");
  firebase.auth().signOut().then(() => {
    // Succesful logout
    window.location.href = "login.html";
  }).catch((error) => {
    // an error occurred
    console.log("Unknown Error!")
  });
}

// function that redirects to a quiz page
function redirecttoquiz() {
  window.location.assign("Quiz_Page.html")
}