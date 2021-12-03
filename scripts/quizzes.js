// When the user clicks home/back, confirm that they actually want to leave.
function confirmation_box() {
  if (confirm(
      "You will have to pay another entrance fee to take the quiz again! Are you sure you want to leave?")) {
    window.location.href = "/gameplay.html"
  }
}

// declare an array, and have one randomly picked index get compared with a randomly generated number
var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
// declare a series of global variables
var first = "";
var second = "";
var third = "";
var fourth = "";
var fifth = "";
var sixth = "";

// this function will randomly grab a quiz from firebase
function getRandomQuestion() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("Quiz_Questions")
        .where("position", ">", Math.floor(Math.random() * myArray.length))
        .limit(1)
        .onSnapshot(docs => {
          docs.forEach(doc => {
            first = doc.data().question;
            second = doc.data().option_one;
            third = doc.data().option_two;
            console.log(third)
            fourth = doc.data().option_three;
            fifth = doc.data().option_four;
            sixth = doc.data().answer;
            if (second == sixth || third == sixth || fourth == sixth || fifth == sixth) {
              console.log('wow does that work?')
            }
            $("#first-goes-here").text(first);
            $("#second-goes-here").text(second);
            $("#third-goes-here").text(third);
            $("#fourth-goes-here").text(fourth);
            $("#fifth-goes-here").text(fifth);
          })
        })
    } else {
      // No user is signed in.
    }
  });
}
getRandomQuestion();