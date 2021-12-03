var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {

      var user = authResult.user;

      if (authResult.additionalUserInfo.isNewUser) { //if new user
        db.collection("users").doc(user.uid).set({ //write to firestore
            name: user.displayName, //"users" collection
            email: user.email //with authenticated user's ID (user.uid)
          }).then(function () {
            console.log("New user added to firestore");
            window.location.assign("main.html"); //re-direct to index.html after signup
          })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {

      document.getElementById('loader').style.display = 'none';
    }
  },

  signInFlow: 'popup',
  signInSuccessUrl: 'main.html',
  signInOptions: [

    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);