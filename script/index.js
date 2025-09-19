const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then(response => response.json()) // promise of json
        .then(json => displayLesson(json.data)) 
}
const loadLevelWord = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayWords(data.data))
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
    }
    words.forEach((word) => {
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
        <div class="bg-white rounded-xl text-center space-y-4 py-10 px-5 shadow-sm">
          <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="text-lg font-medium">Meaning /Pronounciation</p>
          <div class="font-bangla text-2xl font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `
        wordContainer.appendChild(wordCard)
    })
}

// loadLevelWord()
const displayLesson = (lessons) => {
    // 1. get the element and empty the inner html
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    
    // 2. get into every lesson
    for (let lesson of lessons) {
        console.log(lesson);
        
        // 3.create a element 
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `
        // 4. append the child
        const appendChild = lessonContainer.append(btnDiv);
        console.log(appendChild);
    }
}
    
loadLessons();