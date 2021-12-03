// We're initializing firebase here as a test
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// //

//This is the html list in leaderboard.html
const nameHeading = document.querySelector("#name");
const scoreHeading = document.querySelector("#score");
const managersHeading = document.querySelector("#managers");

//data injection function
function createRanks(doc){

  //Create new cells
  nameCell = nameHeading.insertCell();
  scoreCell = scoreHeading.insertCell();
  managerCell = managersHeading.insertCell();

  //We set each variable above with information from firebase
  nameCell.innerHTML = doc.data().name;
  scoreCell.innerHTML = doc.data().score;
  managerCell.innerHTML = doc.data().manager;
}

//This queries our user collection for the top three (in descending order from largest to least)
//scores of all current players
function leaderboard(){
  db.collection("users").orderBy('score', 'desc').limit(3).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      createRanks(doc);
    });
  });
}

//call our function on page load
leaderboard();

function mynavbar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}