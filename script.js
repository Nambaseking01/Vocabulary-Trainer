// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWBp147C5vJDwe3T-5L9ehXiP1n0lqLDc",
  authDomain: "vocabulary-project-a52a8.firebaseapp.com",
  projectId: "vocabulary-project-a52a8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get a reference to the "words" collection in Firestore
const wordsRef = db.collection("words");

// Function to add a new word to the database
function addWord() {
  // Get the word and definition inputs
  const wordInput = document.getElementById("new-word-input");
  const definitionInput = document.getElementById("new-definition-input");
  const word = wordInput.value;
  const definition = definitionInput.value;

  // Clear the input fields
  wordInput.value = "";
  definitionInput.value = "";

  // Add the new word to the database
  wordsRef.add({
    word: word,
    definition: definition
  })
  .then(() => {
    console.log("Word added to database");
  })
  .catch((error) => {
    console.error("Error adding word to database: ", error);
  });
}

// Function to get a random word from the database and display its definition
function getRandomWord() {
  // Query the database for a random word
  wordsRef.get().then((querySnapshot) => {
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomWord = querySnapshot.docs[randomIndex];
    // Display the word and its definition
    const wordDefinition = document.getElementById("word-definition");
    wordDefinition.textContent = `${randomWord.data().word}: ${randomWord.data().definition}`;
  })
  .catch((error) => {
    console.error("Error getting random word from database: ", error);
  });
}
