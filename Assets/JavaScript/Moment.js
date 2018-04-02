'use strict';

// initial variable declarations 
let trainName;
let destination;
let firstTrainTime;
let frequency;
let dateAdded;
let curTime = Date.now();
let firstTrainTimeConvert;

// for reference purposes set the current time on the DOM
$("#curTimeSpan").append(moment(curTime).format("hh:mm"));
console.log(curTime);

 // Initialize Firebase
 const config = {
  apiKey: "AIzaSyBzjsT2V650WhxxEumIYFNQQM6VerW2QaE",
  authDomain: "wadenewtrainscheduler.firebaseapp.com",
  databaseURL: "https://wadenewtrainscheduler.firebaseio.com",
  projectId: "wadenewtrainscheduler",
  storageBucket: "",
  messagingSenderId: "23811656871"
  };

  firebase.initializeApp(config);

  let database = firebase.database();

  // set initial values and listen for new values
  database.ref().on("child_added", function(childTrainSnapshot) {

    // the specified time of the first train - 1 year
    firstTrainTimeConvert = moment(childTrainSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
    
    // set the curTime variable to the current time and format it to hh:mm
    curTime = moment();

    // calculate the difference between the specified time of the first train and the current time in minutes
    let calcTime = moment().diff(moment(firstTrainTimeConvert), "minutes");

    // take the difference between the times and divide that by the train frequency to get the remainder
    let remainder = calcTime % childTrainSnapshot.val().frequency

    // calculate how many minutes it will be before the next train arrives
    let trainArrival = childTrainSnapshot.val().frequency - remainder;

    // calculates the next time the train will arrive
    let nextTrainArrival = moment().add(trainArrival, "minutes");

    // formats the next time the train will arrive into a new variable
    let nextTrainArrivalFormatted = moment(nextTrainArrival).format("hh:mm");

    $("#tableBody").append("<tr><td>" + childTrainSnapshot.val().trainName + "</td><td>" + childTrainSnapshot.val().destination + "</td><td>" + 
    childTrainSnapshot.val().frequency + "</td><td>" + nextTrainArrivalFormatted + "</td><td>" + trainArrival + "</td></tr>");

  // error handler
  }, function(errors) {
    console.log("Errors handled: " + errors.code);
  });

  // when the submit button is clicked update the DOM and clear the form values
  $(document).on('click', "#submitButton", function() {

    trainName = $("#trainInput").val();
    destination = $("#trainInput2").val();
    firstTrainTime = $("#trainInput3").val();
    frequency = $("#trainInput4").val();

    let newTrainObject = {
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      dateAdd: firebase.database.ServerValue.TIMESTAMP
    };
    
    database.ref().push(newTrainObject);

    clearFields();
  });

  // this function clears the form fields
  const clearFields = function(){
    $("#trainInput").val("");
    $("#trainInput2").val("");
    $("#trainInput3").val("");
    $("#trainInput4").val("");
  };
