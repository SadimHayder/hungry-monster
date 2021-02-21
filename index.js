const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealEl =document.getElementById('meals')
const resultHeading =document.getElementsByClassName('result-heading');
const single_mealEl = document.getElementById(
    "single-meal"
);

// search meals
function searchMeal(e) {
    e.preventDefault();

    // clear single meal
    single_mealEl.innerHTML="";
    
    //get search meal
    // console.log(search.value);
    const term = search.value;
    
    // check for empty
    if(term.trim()) {
        fetch(
              `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
        )
          .then((res) => res.json())
         .then((data) => {
            resultHeading.innerHTML = `<h2>search Result for ${term}`;
            if(data.meals === null){
                resultHeading.innerHTML = `<h2>There Are No Result for ${term}`;
            } else {
                 mealEl.innerHTML = data.meals.map(
                    (meal) => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info" data-mealId="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                     </div>
                     `
                 )
                 .join("");
             }
         });
     } else {
        alert("please insert a value in Search");
     }
}

// fetch meal by id
function getMealById(mealID) {
    fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
     )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}
// add meal to dom
// function addMealToDOM(meal) {
//     const ingredients = [];
//     for(let i=0; i <=20; i++){
//         if (meal[`strIngredients${i}`])
//         ingredients.push(`
//         ${meal[`strIngredients${i}`]} - ${meal[`strMeasure${i}`]}
//         `);
//         }else {
//           break;
//     }
  
// }

// event listerners
submit.addEventListener("submit", searchMeal);
mealEl.addEventListener("click", (e) => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains("meal-info");
        } else {
            return false;
        }
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }
});
