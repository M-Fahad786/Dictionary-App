const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const audio = document.getElementById("sound");

btn.addEventListener("click", () => {
  let search_box = document.getElementById("search-box").value;
  fetch(`${api}  ${search_box}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `<div class="word">
      <h3>${search_box}</h3>
      <button onClick="playSound()">
        <i class="fa-solid fa-volume-high"></i>
      </button>
    </div>
    <div class="details">
      <p>${data[0].meanings[0].partOfSpeech}</p>
      <p>${data[0].meanings[0].synonyms.slice(0, 2)}</p>
    </div>
    <p class="word-meaning">
      ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">
       ${data[0].meanings[0].definitions[0].example || ""}
    </p>`;
    })
    .catch(() => {
      result.innerHTML = `
      <h3 class="error-msg">No Definition Found</h3> 
      <p class="error-para"> Sorry,we could'nt find the word you're looking for.`;
    });
});

const textToSpeech = (text) => {
  let speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech);
};

const playSound = () => {
  let search_box = document.getElementById("search-box").value;
  textToSpeech(search_box);
};
