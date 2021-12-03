var currentUser;

function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
    //Check if user is signed in:
    if (user) {

      //go to correct user document by referencing to userid
      currentUser = db.collection("users").doc(user.uid)
      //get the document from the current user
      currentUser.get()
        .then(userDoc => {
          //get the data fields of the user
          var userName = userDoc.data().name;
          var userCountry = userDoc.data().country;
          var userInterests = userDoc.data().interests;

          //If the data fields are not empty, then write them in to the form'
          if (userName != null) {
            document.getElementById("usernameInput").value = userName;
          }

          if (userCountry != null) {
            document.getElementById("countryInput").value = userCountry;
          }

          if (userInterests != null) {
            document.getElementById("interestsInput").value = userInterests;
          }

        })
    } else {
      // No user is signed in.
      console.log("No User is signed in")
    }
  });
}

//call function to run it
populateInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
  userName = document.getElementById('usernameInput').value;
  userCountry = document.getElementById('countryInput').value;
  userInterests = document.getElementById('interestsInput').value;

  currentUser.update({
      name: userName,
      country: userCountry,
      interests: userInterests,
    })

    .then(() => {
      console.log("Document successfully updated!")

    })

  document.getElementById("personalInfoFields").disabled = true;

}




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