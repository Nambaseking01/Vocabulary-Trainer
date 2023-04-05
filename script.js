// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBWBp147C5vJDwe3T-5L9ehXiP1n0lqLDc",
  authDomain: "vocabulary-project-a52a8.firebaseapp.com",
  projectId: "vocabulary-project-a52a8",
});

// Get a reference to the "words" collection in Firestore
const db = firebase.firestore();
const wordsRef = db.collection("words");

// Function to get a random word from the database and display its definition
function getRandomWord() {
  // Query the database for a random word
  wordsRef.get().then((querySnapshot) => {
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomWord = querySnapshot.docs[randomIndex];
    // Display the word and its definition
    const wordDefinition = document.getElementById("word-definition");
    wordDefinition.textContent = `${randomWord.data().word}: ${randomWord.data().definition}`;
  });
}

// Function to add a new word to the database
function addWord() {
  // Get the word and definition from the input fields
  const wordInput = document.getElementById("new-word-input");
  const definitionInput = document.getElementById("new-definition-input");
  const word = wordInput.value;
  const definition = definitionInput.value;
  // Add the word and definition to the database
  wordsRef.add({
    word: word,
    definition: definition,
  }).then(() => {
    // Clear the input fields
    wordInput.value = "";
    definitionInput.value = "";
  });
}
