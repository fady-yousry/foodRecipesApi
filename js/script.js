// global variables
let recipesRow = document.getElementById("recipesRow");
let lightBoxContainer = document.getElementById("lightBoxContainer");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let recipeDetails =document.getElementById("recipeDetails");
let closeBtn=document.getElementById("closeBtn");
let loadingScreen=document.getElementById("loading");

// header typing effect "never miss a recipe !"
(function type() /* self invoked function*/
{
    let i = 0;
    let txt = 'Never Miss a Recipe!'; 
    let speed = 150; /* The speed/duration of the effect in milliseconds */
    
    (function typeWriter() { /*self envoked function*/
      if (i < txt.length) {
        document.getElementById("typingEffect").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    })(); 
})(); 


let allRecipes = []; /* the array that we will recive the response of all recipes from api in it */

// getRecipes() function that Get recipes data from api url and transform it to json() 
async function getRecipes(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes;
    displayRecipes();
}
getRecipes("steak"); /* default value to Get and display */ 

//function to display recipes on html 
function displayRecipes() {
    let  container = ``; /*the variable which contain recipes data in each loop */
    for (let i = 0; i < allRecipes.length; i++) {
        let myId = "'"+allRecipes[i].recipe_id+"'"; 
        /*myId : is to convert the id into string to solve the problem of ids that contains letters */
        container += `
        <div class="col-md-4 recipe">
            <div class="item p-3" onclick="getRecipeDetails(${myId})" >
                <img src="${allRecipes[i].image_url}" alt="">
                <h2 class="text-danger  text-center pt-4">${allRecipes[i].title}</h2>
                <p class="text-center lead ">${allRecipes[i].publisher}</p>
            </div>
        </div>
      `
    }
    recipesRow.innerHTML = container; /* put the data in html element "recipesRow" */ 
}

//click event on search btn to call getRecipes and pass search input value as a parameter.
searchBtn.addEventListener('click', function () {
    getRecipes(searchInput.value);
})

let details = {}; /* the object that we will recive the response of recipeDetails from api in it */ 

//getRecipeDetails function that Get recipe details by id from api url and transform it to json()
async function getRecipeDetails(id) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    details = await apiResponse.json();
    details = details.recipe;
    displayRecipeDetails();
}

//displayRecipeDetails function to display Recipe Details on html 
function displayRecipeDetails() {
    let ingredients = ``; /* variable which contain all ingredients of the recipe */
    for (let i of details.ingredients) {
        ingredients += `
        <li>
            <span class="fa-li">
                <i class="fas fa-utensil-spoon d-flex py-2 align-items-center"></i>
            </span>
            ${i}
        </li>
        `;
    }
    /*detailsContainer variable which contain recipe details */
    let detailsContainer = ` 
    <div class="itemDetails">
        <h2 class="py-3">${details.title}</h2>
        <h6 class="pb-5">Publisher : ${details.publisher}</h6>
        <div class="container h-75">
            <div class="row">
                <div class="col-md-5">
                    <img class="detailsImage" src="${details.image_url}" alt="">
                </div>
                <div class="col-md-7 pt-3">
                    <ul class="fa-ul">
                    ${ingredients}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;
    recipeDetails.innerHTML = detailsContainer; /* put the data in html element "recipeDetails" */ 
    lightBoxContainer.classList.replace("d-none", "d-flex"); /* show lightBoxContainer */
}

//close lightBoxContainer (recipeDetails) 
function close()
{
lightBoxContainer.classList.replace("d-flex","d-none"); /* hide lightBoxContainer */
}

closeBtn.addEventListener("click",close); /*close by click on x icon */

document.addEventListener("keydown",function(e)   /* close by Esc button */
{
    if(e.key === "Escape") {
        close();
      }
});



    

  