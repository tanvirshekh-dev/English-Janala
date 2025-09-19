const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then(response => response.json()) // promise of json
        .then(json => displayLesson(json.data)) 
}

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
        <button href="" class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button
                >
        `
        // 4. append the child
        const appendChild = lessonContainer.append(btnDiv);
        console.log(appendChild);
    }
}
    
loadLessons();