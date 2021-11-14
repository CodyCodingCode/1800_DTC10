// variables
let player_score;
let cost_increase;
let pause = false;

// constants

const localnews = document.querySelector("#localnews");
const socialbots = document.querySelector("#socialbots");
const cablenews = document.querySelector("#cablenews");
const blogs = document.querySelector("#blogs");
const celebs = document.querySelector("#celebs");
const altnews = document.querySelector("#altnews");
const podcasts = document.querySelector("#podcasts");
const adverts = document.querySelector("#adverts");
const pausebutt = document.querySelector("#pause");

//this is how we set our increment to count by
const scroll_speed = 1;

// not sure if this is needed - update, it is (but not sure if it should be const?)
const score = document.querySelector("#score");

//Number formatter for readability - using this breaks the incrementer. Not sure why.
let formatNumbers
formatNumbers = new Intl.NumberFormat('en-us');
//---------------------------------------------------------
//These set the speed and initial costs - will need to be updated with other
//vars for additional purchases
let localnewscost = 10;

let increment_score = 1;
let count_timer = 500;

//------------------------------------------------------
//counter function - MAIN GAME FUNCTION
const updateScore = () => {
  // This is a quadrillion - the player will 'win' if they manage to hit this
  const target = 1000000000000000;

  //This updates the score (the '+' tells javascript it's a number, not string)
  let current_score = +score.innerText;

  //------------------------------------------------
  //Increment is how much the counter increases by
  //count_timer is how often (lower is faster)

  // ok, I moved these outside of the function and now the if statement
  // below (for the button) actually works. 
  // let increment_score = 1;
  // let count_timer = 500;

  //This can be commented out/deleted - it is for testing
  console.log(increment_score);


  //This is the if-else statement that "runs" the game.
  //I think this is recursive (setTimeout calls the main function),
  //but the tutorial I used to help make this was not clear on that.
  
  if(current_score < target) {
    score.innerText = current_score + increment_score;

    //This function listens for a button click
    localnews.addEventListener('click', (event) => {
      //if the 
      if(current_score > localnewscost) {
        //this should reduce current score by localnewscost
        current_score = current_score - localnewscost;

        // this should increase increment score by 1
        increment_score = increment_score + 1;

        //this increases cost of localnewscost each time
        localnewscost = localnewscost + 10;
        //test print for confirmation
        console.log("new local cost" + localnewscost)
        //this should print score less the cost of the upgrade
        //For some reason, the function is automatically purchasing as many
        //upgrades as possible - needs to be debugged.
        score.innerText = current_score;
      }
    });
    

    setTimeout(updateScore, count_timer);
  } else {
    score.innerText = "You Win!";
  }
};

//This calls the main function.
updateScore();


//Okay this is called 'pause' but I'm thinking it would be
//better to use it as a 'save' button. Reason being is that the way
//the increment function works, It...does not stop. Will take some Tinkering.
//Could be used to send data to Firebase though (e.g. 'hit save before quitting')
pausebutt.addEventListener('click', (event) => {
  if (pausebutt.checked == true) {
    pause = true;
    //if pause true, then the counter is off/paused
  }
    else {
      //if pause is false, the counter is on/counting
      pause = false;
      
  }
});

// // localnews.addEventListener('click', (event) => {
// //   console.log("haha");;
// // });

// //test
// if (pause == false) {
//   play();
// };

// function play() {
//   //player_score = 0;
//   //cost_increase = 0;
//   //score.innerHTML = player_score;



// }