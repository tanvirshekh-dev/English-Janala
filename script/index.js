const createHtmlElement = (arr) => {
    const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElement.join(" ");
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinning = (status) => {
  if (status === true) {
    document.getElementById("spinning").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")
  }
  else {
    document.getElementById("word-container").classList.remove("hidden")
    document.getElementById("spinning").classList.add("hidden")
  }
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then(response => response.json()) // promise of json
        .then(json => displayLesson(json.data)) 
}

const removeActiveButton = () => {
    const lessonButtons = document.querySelectorAll(".lesson-button")
    lessonButtons.forEach((btn) => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
    manageSpinning(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveButton(); //remove all active class
            const lessonClickBtn = document.getElementById(`lesson-btn-${id}`)
            lessonClickBtn.classList.add("active") // add active class
            displayWords(data.data)
        })
}


// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }
const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
    console.log(word);
    const wordContainer = document.getElementById("details-container")
    wordContainer.innerHTML = `
            <div class="">
              <h2 class="text-2xl font-bold">
                ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
              </h2>
            </div>
            <div class="space-y-2">
              <h4 class="font-bold text-lg">Meaning</h4>
              <p class="mb-7">${word.meaning}</p>
            </div>
            <div class="space-y-2">
              <h4 class="font-bold text-lg">Example</h4>
              <p class="mb-7">${word.sentence}</p>
            </div>
            <div class="space-y-2 ">
              <p class="font-bold text-lg">সমার্থক শব্দ গুলো</p>
              <div class="space-x-3">
                ${createHtmlElement(word.synonyms)}
              </div>
            </div>
    `;
    document.getElementById("word_modal").showModal();
}
// {
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"
// }

const displayWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full text-center py-10 space-y-6">
          <img class="mx-auto" src="./assets/alert-error.png" alt="When here is empty then show the alert icon">
          <p class="font-bangla text-lg text-gray-500 font-normal">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-4xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        `;
      manageSpinning(false)
      return;
    }
    words.forEach((word) => {
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
        <div class="bg-white rounded-xl text-center space-y-4 py-10 px-5 shadow-sm">
          <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="text-lg font-medium">Meaning /Pronounciation</p>
          <div class="font-bangla text-2xl font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `
        wordContainer.appendChild(wordCard)
    })
  manageSpinning(false)
}

// loadLevelWord()
const displayLesson = (lessons) => {
    // 1. get the element and empty the inner html
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    
    // 2. get into every lesson
    for (let lesson of lessons) {
        // console.log(lesson);
        
        // 3.create a element 
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" 
                class="btn btn-outline btn-primary lesson-button">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `
        // 4. append the child
        const appendChild = lessonContainer.append(btnDiv);
        console.log(appendChild);
    }
}
    
loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActiveButton();
  const input = document.getElementById("input-search");
  const searchValue = input.value;
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue));
      displayWords(filterWords)
    });
})