// We're initializing firebase here as a test
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// //

//This is the html list in leaderboard.html
const rankList = document.querySelector('#ranks');

//data injection function
function createRanks(doc){
  //this creates our variables to implement into our rankList
  let li = document.createElement('li');
  let name = document.createElement('span');
  let score = document.createElement('span');
  let managers = document.createElement('span');

  //We set each variable above with information from firebase
  li.setAttribute('rankInfo', doc.id);
  name.textContent = doc.data().name;
  score.textContent = doc.data().score;
  managers.textContent = doc.data().manager;

  //We append the now-populated variables to the main li variable in line 18
  li.appendChild(name);
  li.appendChild(score);
  li.appendChild(managers);

  //We append the list variable to the current html element
  rankList.appendChild(li);
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