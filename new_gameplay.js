// We're initializing firebase here as a test

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());


// //
//insert score and quizvalue for user
var currentUser;

function insertScoreVals() {
  firebase.auth().onAuthStateChanged(user => {

    if (user) {

      currentUser = db.collection("users").doc(user.uid)

      currentUser.get()
        .then(userDoc => {
          // I believe these are local scope variables
          var totalScore = userDoc.data().score;
          var totalQuizzes = userDoc.data().quizTotal;

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
insertScoreVals();

// define constants from the html - start with score and with one button
// these are global scope (I think)
let localnews = document.querySelector("#localnews");
let score_tally = document.querySelector("#score");
let quiz_tally = document.querySelector("#quiz");
let pausebutt = document.querySelector("#pause");
let playbutton = document.querySelector("#play");
// This is to run the while loop
let pause = false;

//display the scores
function displayScores() {
  firebase.auth().onAuthStateChanged(user => {

    if (user) {

      currentUser = db.collection("users").doc(user.uid)

      currentUser.get()
        .then(userDoc => {
          //local scope variables
          var currentScore = userDoc.data().score;
          var currentQuiz = userDoc.data().quizTotal;

          //this should display the numbers
          score_tally.innerHTML = currentScore;
          quiz_tally.innerHTML = currentQuiz;
          
          //make our button clickable
          localnews.onclick = () => addPoints(currentUser);
          displayScores();
        })
    }
  }) 
};
displayScores();


//increment our main score
function addPoints(currentUser) {
  console.log("inside");
  currentUser.update({
    score: firebase.firestore.FieldValue.increment(1)
  })
}

