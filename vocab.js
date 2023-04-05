// Initialize Firebase
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Function to add a new word and definition to the database
function addWord() {
  var wordInput = document.getElementById("new-word-input").value;
  var definitionInput = document.getElementById("new-definition-input").value;

  db.collection("words").doc(wordInput).set({
    definition: definitionInput,
  })
    .then(function() {
      console.log("Document successfully written!");
      alert("Word added successfully!");
      document.getElementById("new-word-input").value = "";
      document.getElementById("new-definition-input").value = "";
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
      alert("There was an error adding the word. Please try again later.");
    });
}

// Function to get a random word and its definition from the database
function getRandomWord() {
  db.collection("words").get().then(function(querySnapshot) {
    var wordsArray = [];
    querySnapshot.forEach(function(doc) {
      wordsArray.push(doc.id);
    });
    var randomWord = wordsArray[Math.floor(Math.random()*wordsArray.length)];
    var wordDefinition = querySnapshot.docs.find(function(doc) {
      return doc.id === randomWord;
    }).data().definition;
    document.getElementById("word-definition").innerHTML = randomWord + ": " + wordDefinition;
  })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      alert("There was an error getting a random word. Please try again later.");
    });
}
