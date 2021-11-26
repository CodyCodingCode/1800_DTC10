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
let managerButton = document.querySelector('#hireManager');
//Score Display
let manager_tally = document.querySelector("#manager");
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


//let pausebutt = document.querySelector("#pause");
//let playbutton = document.querySelector("#play");

//-----------------------------------------------//
//-- The following checks Firebase for data and--//
//-- Adds it to the user's data if missing     --//
//-----------------------------------------------//

//====================================================================================
//====================================================================================
//Potentially making a money manager?
let managers;
let managerIncrement = 5000;

//does this need to go into a function? Can be included in point/quiz score above^^
// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     currentUser = db.collection("users").doc(user.uid);

//     currentUser.get()
//       .then(userDoc => {

//         var manager = userDoc.data().moneyManager;

//         if (manager == null) {
//           currentUser.update({
//             manager: 0,
//           });
//         } else {
//           console.log("Manager Total present in database");
//         }
//       });
//   }
// });

//This works, but currently will always run, constantly
//Should do two things - increase increment above 1000ms, and build mechanism to purchase
//'campaign managers' so that it starts as 'off' and is a late-game feature.

setInterval(function () {
   firebase.auth().onAuthStateChanged(user => {
     if (user) {
       currentUser = db.collection("users").doc(user.uid);
       
       db.collection('users').doc(user.uid)
       .onSnapshot((doc) => { 
         managers = doc.get('manager');
       });

       if (managers > 0) {
         console.log("Manager Conducting Misinformation Campaign for you.")
         currentUser.update({
           score: firebase.firestore.FieldValue.increment(managers)
         })
       }
     }
   })
 }, managerIncrement);


//====================================================================================
//====================================================================================

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
          var currentMgmt = userDoc.data().manager;
          var increment = userDoc.data().incrementScore;
          //this should display the numbers
          score_tally.innerHTML = currentScore;
          quiz_tally.innerHTML = currentQuiz;

          
          //make our button clickable
          mainbutton.onclick = () => addPoints(currentUser, increment);
          localNews.onclick = () => upgradePurchase(currentUser, -15, redirecttoquiz(), false);
          socialBots.onclick = () => upgradePurchase(currentUser, -115, redirecttoquiz2(), false);
          cabelNews.onclick = () => upgradePurchase(currentUser, -315, redirecttoquiz3(), false);
          blogs.onclick = () => upgradePurchase(currentUser, -515, redirecttoquiz4(), false);
          celebs.onclick = () => upgradePurchase(currentUser, -715, redirecttoquiz5(), false);
          altnews.onclick = () => upgradePurchase(currentUser, -915, redirecttoquiz6(), false);
          podcasts.onclick = () => upgradePurchase(currentUser, -1115, redirecttoquiz7(), false);
          adverts.onclick = () => upgradePurchase(currentUser, -1315, redirecttoquiz8(), false);
          //Set low for testing purposes
          managerButton.onclick = () => upgradePurchase(currentUser, -100, true);


          





        })
    }
  }) 
};

//Calls function to display clicker game scores
displayScores();


//====================================================================================
//====================================================================================
//increment our main score
function addPoints(currentUser, increment) {
  console.log("inside");
  //update the value stored in the score field associated with the user
  currentUser.update({
    score: firebase.firestore.FieldValue.increment(increment),
  });
}; 

//====================================================================================
//====================================================================================
//Reduce our main score
function upgradePurchase(currentUser, amount, functionName, manager) {
  //update the value stored in the score field associated with the user
  currentUser.update({
    score: firebase.firestore.FieldValue.increment(amount),
  });
  functionName;
  console.log('test button');
  if (manager == true) {
    console.log('test manager');
    currentUser.update({
      manager: firebase.firestore.FieldValue.increment(1),
    });
  }
}

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

  //---- Campaign Manager
  if (score >= 100) {
    activateButton(managerButton);
    console.log('Campaign Manager is Activated')
  } else if (score < 100) {
    deactivateButton(managerButton);
    console.log('Campaign Manager is Deactivated')
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
        manager.innerHTML = doc.get('manager');
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

// functions that redirects to a quiz page
function redirecttoquiz() {
  window.location.href="Quizzes/Quiz_1/Quiz_1_question_1.html";
}

function redirecttoquiz2() {
  window.location.href="Quizzes/Quiz_2/Quiz_2_question_1.html"
}

function redirecttoquiz3() {
  window.location.href="Quizzes/Quiz_3/Quiz_3_question_1.html"
}

function redirecttoquiz4() {
  window.location.href="Quizzes/Quiz_4/Quiz_4_question_1.html"
}

function redirecttoquiz5() {
  window.location.href="Quizzes/Quiz_5/Quiz_5_question_1.html"
}

function redirecttoquiz6() {
  window.location.href="Quizzes/Quiz_6/Quiz_6_question_1.html"
}

function redirecttoquiz7() {
  window.location.href="Quizzes/Quiz_7/Quiz_7_question_1.html"
}

function redirecttoquiz8() {
  window.location.href="Quizzes/Quiz_8/Quiz_8_question_1.html"
}