// We're initializing firebase here as a test
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// //

//-----------------------------------------------//
//-- The following is the Account Profile form --//
//-----------------------------------------------//
//Initialize currentUser var
var currentUser;

// define variables associated with each button in the game

//Main Clicker and Manager button
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

//-----------------------------------------------------//
//-- The following creates a money manager feature-----//
//-- that the player can use to increase score faster--//
//----------------------------------------------------//

let managers;
let managerIncrement = 1000;

// managerIncremenet set to 1000ms for demo purposes. True gameplay should set this higher (5000+) and implement mechanism to decrease managerIncrement for faster score accrual.
// This will not do anything until a player purchases a money manager. Once the number of managers is above zero, 
// the function will run once per managerIncrement, and increase the user's score based on how many managers they hire.
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


//---------------------------------------------------------//
//-- The following function displays the user's scores-----//
//-- as stored in the firestore database------------------//
//-------------------------------------------------------//

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
          
          //make our button clickable - on a click event, the cost of the quiz is removed from the user's score (reflected immediately in firebase)
          mainbutton.onclick = () => addPoints(currentUser, increment);
          localNews.onclick = () => upgradePurchase(currentUser, -15, redirecttoquiz(), false);
          socialBots.onclick = () => upgradePurchase(currentUser, -20, redirecttoquiz2(), false);
          cabelNews.onclick = () => upgradePurchase(currentUser, -25, redirecttoquiz3(), false);
          blogs.onclick = () => upgradePurchase(currentUser, -30, redirecttoquiz4(), false);
          celebs.onclick = () => upgradePurchase(currentUser, -30, redirecttoquiz5(), false);
          altnews.onclick = () => upgradePurchase(currentUser, -30, redirecttoquiz6(), false);
          podcasts.onclick = () => upgradePurchase(currentUser, -30, redirecttoquiz7(), false);
          adverts.onclick = () => upgradePurchase(currentUser, -30, redirecttoquiz8(), false);
          
          //Set low for testing purposes
          managerButton.onclick = () => upgradePurchase(currentUser, -10, null, true);
        })
    }
  }) 
};

//Calls function to display clicker game scores
displayScores();


//====================================================================================
//====================================================================================
//increment our main score on each click of the main gameplay button
function addPoints(currentUser, increment) {
  console.log("inside");
  //update the value stored in the score field associated with the user
  currentUser.update({
    score: firebase.firestore.FieldValue.increment(increment),
  });
}; 

//====================================================================================
//====================================================================================
//Reduce our main score by the cost of the quiz or manager
function upgradePurchase(currentUser, amount, functionName, manager) {
  //update the value stored in the score field associated with the user (parameter 'amount' will be a negative integer in this function)
  currentUser.update({
    score: firebase.firestore.FieldValue.increment(amount),
  });
  //If the manager value is true, meaning a manager has been 'hired' by the user, then the manager value is increased
  console.log('test button');
  if (manager == true) {
    console.log('test manager');
    currentUser.update({
      manager: firebase.firestore.FieldValue.increment(1),
    });
    //This will link the player to whichever quiz they intended to do
  functionName;
  }
}

//====================================================================================
//====================================================================================
//define functions to use in our listener - this will activate or deactive quiz buttons based on the user's points
function activateButton(button) {
  button.disabled = false;
};

function deactivateButton(button) {
  button.disabled = true;
};

//====================================================================================
//====================================================================================
// Control the buttons in our game - each integer in the if-elif conditionals below reflects the cost of the applicable quiz
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
  if (score >= 20) {
    activateButton(socialBots);
    console.log('Social Bots is Activated');
  } else if (score < 20) {
    deactivateButton(socialBots);
    console.log('Social Bots is Deactivated');
  }

  //---- Cable News Upgrade
  if (score >= 25) {
    activateButton(cabelNews);
    console.log('Cable News is Activated');

  } else if (score < 25) {
    deactivateButton(cabelNews);
    console.log('Cable News is Deactivated');
  }

  //---- Blogs Upgrade
  if (score >= 30) {
    activateButton(blogs);
    console.log('Blogs is Activated');

  } else if (score < 30) {
    deactivateButton(blogs);
    console.log('Blogs News is Deactivated');
  }

  //---- Celebs Upgrade
  if (score >= 30) {
    activateButton(celebs);
    console.log('Celebreties is Activated');

  } else if (score < 30) {
    deactivateButton(celebs);
    console.log('Celebrities is Deactivated');
  }

  //---- Alt News Upgrade
  if (score >= 30) {
    activateButton(altnews);
    console.log('Alternative News is Activated');

  } else if (score < 30) {
    deactivateButton(altnews);
    console.log('Alternative News is Deactivated');
  }

  //---- Podcasts upgrade
  if (score >= 30) {
    activateButton(podcasts);
    console.log('Podcasts is Activated');

  } else if (score < 30) {
    deactivateButton(podcasts);
    console.log('Podcasts is Deactivated');
  }

  //---- Adverts Upgrade
  if (score >= 30) {
    activateButton(adverts);
    console.log('Adverts is Activated');

  } else if (score < 30) {
    deactivateButton(adverts);
    console.log('Adverts is Deactivated');
  }

  //---- Campaign Manager
  if (score >= 10) {
    activateButton(managerButton);
    console.log('Campaign Manager is Activated')
  } else if (score < 10) {
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


        // If the score hits a threshold, the listener will also unlock buttons for the user
        buttonController(doc.get('score'));


        });
  }
});

//--------------------------------------------------------------------
//--------------------------------------------------------------------
//----------------------Non-Game Related JS---------------------------
//Create Logout button functionality
function logout() {
  console.log("Logging out a user.");
  firebase.auth().signOut().then(() => {
    // Succesful logout
    window.location.href = "index.html";
  }).catch((error) => {
    // an error occurred
    console.log("Unknown Error!")
  });
}

// functions that redirects to a quiz page
function redirecttoquiz() {
  window.location.href="/Quizzes/Quiz-1/Quiz-1-Question-1.html";
}

function redirecttoquiz2() {
  window.location.href="Quizzes/Quiz-2/Quiz-2-question-1.html";
}

function redirecttoquiz3() {
  window.location.href="Quizzes/Quiz-3/Quiz-3-question-1.html";
}

function redirecttoquiz4() {
  window.location.href="Quizzes/Quiz-4/Quiz-4-question-1.html";
}

function redirecttoquiz5() {
  window.location.href="Quizzes/Quiz-5/Quiz-5-question-1.html";
}

function redirecttoquiz6() {
  window.location.href="Quizzes/Quiz-6/Quiz-6-question-1.html";
}

function redirecttoquiz7() {
  window.location.href="Quizzes/Quiz-7/Quiz-7-question-1.html";
}

function redirecttoquiz8() {
  window.location.href="Quizzes/Quiz-8/Quiz-8-question-1.html";
}

//-------------------------------------------
//help pop-up
var helpModal = document.querySelector("#helpModal");
var helpButton = document.querySelector("#helpMech");
var helpSpan = document.querySelector(".helpClose");

helpButton.onclick = function () {
  helpModal.style.display = "block";
}

helpSpan.onclick = function () {
  helpModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == helpModal) {
    helpModal.style.display = "none";
  }
}

//about website pop-up
var aboutModal = document.querySelector("#aboutModal");
var aboutButton = document.querySelector("#aboutTheGame");
var aboutSpan = document.querySelector("#aboutClose");

aboutButton.onclick = function () {
  aboutModal.style.display = "block";
}

aboutSpan.onclick = function () {
  aboutModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == aboutModal) {
    aboutModal.style.display = "none";
  }
}

// this function creates a dropdown hamburger event for our navbar
function mynavbar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}