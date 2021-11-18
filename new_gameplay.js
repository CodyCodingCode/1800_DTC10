// We're initializing firebase here as a test

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());


// //
//insert score and quizvalue for user
var currentUser;


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
          localnews.onclick = () => addPoints(currentUser);
          // New addition - calls function recursively?
          // Would a conditional work here?
          displayScores();
        })
    }
  }) 
};

//Calls function to run clicker game - this works, but does not update the printout
displayScores();

// function incrementer(){
//   firebase.auth().onAuthStateChanged(user => {
//     //if logged in/exists
//     if (user) {

//       var i = db.collection("users").doc("quizTotal").get()
//       console.log(i);
//       //check the current score, quiz totals
//       currentUser.get()
//         .then(userDoc => {
//         })
//     }
//   }) 
// };
// incrementer();

var i = 1;
//increment our main score
function addPoints(currentUser) {
  console.log("inside");
  //update the value stored in the score field associated with the user
  currentUser.update({
    score: firebase.firestore.FieldValue.increment(i)
  })
};