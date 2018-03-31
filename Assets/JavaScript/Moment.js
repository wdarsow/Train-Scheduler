'use strict';

// variables
let trainName;
let destination;
let firstTrainTime;
let frequency;

 // Initialize Firebase
 const config = {
    apiKey: "AIzaSyDv_9RkoH8UC1m6XzmJIegpE4nqHOoczsw",
    authDomain: "wade-s-train-scheduler.firebaseapp.com",
    databaseURL: "https://wade-s-train-scheduler.firebaseio.com",
    projectId: "wade-s-train-scheduler",
    storageBucket: "",
    messagingSenderId: "412558807343"
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  $(document).on('click', "#submitButton", function() {

    trainName = $("#trainInput").val();
    destination = $("#trainInput2").val();
    firstTrainTime = $("#trainInput3").val();
    frequency = $("#trainInput4").val();
    
    database.ref().push ({
      fireTrainName: trainName,
      fireDestination: destination,
      fireFirstTrainTime: firstTrainTime,
      fireFrequency: frequency
    }); 

    $("#tableBody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + 
      frequency + "</td><td>" + "next arrival" + "</td><td>" + "minutes away" + "</td></tr>");
    
    // console.log(trainName, destination, firstTrainTime, frequency);
    clearFields();
  })

  const clearFields = function(){
    $("#trainInput").val("");
    $("#trainInput2").val("");
    $("#trainInput3").val("");
    $("#trainInput4").val("");
  };
  
