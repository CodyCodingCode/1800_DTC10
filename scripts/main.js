//main.html scripts

//This greets the user upon logging in and reaching the main/landing page
function insertName() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      // Do something for the current logged-in user here:
      console.log(user.uid);
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          var user_Name = userDoc.data().name;
          //console.log(user_Name);
          // document.getElementById("name-goes-here").innerHTML = name;                     //using javascript
          $("#name-goes-here").text(user_Name); //using jquery
        })
    } else {
      // No user is signed in.
    }
  });
}

//Call the above function
insertName();

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

//This function populates new user's documents in firebase
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
          var manager = userDoc.data().manager;
          var clicks = userDoc.data().clicks;
          var incrementScore = userDoc.data().incrementScore;

          //If these fields don't exist, create them in firestore
          // auto-increment value
          if (manager == null) {
            currentUser.update({
              manager: 0,
            });
          } else {
            console.log("Manager Total present in database");
          }
          //Player score  
          if (totalScore == null) {
            currentUser.update({
              score: 0,
            });
          } else {
            console.log("Score present in database.");
          };
          //Player Quiz Score
          if (totalQuizzes == null) {
            currentUser.update({
              quizTotal: 0,
            });
          } else {
            console.log("Quiz Total present in database.");
          }
          //Total in-game clicks (not site-wide)
          if (clicks == null) {
            currentUser.update({
              clicks: 0,
            });
          } else {
            console.log("Click count present in database.")
          }

          //Increment Score
          if (incrementScore == null) {
            currentUser.update({
              incrementScore: 1,
            });
          } else {
            console.log("Increment Score present in database.")
          }
        });
    } else {
      console.log("No user is signed in");
    }
  });
}

//call the function
insertScoreVals();
