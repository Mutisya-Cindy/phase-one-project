//ensure the  DOM is fully loadec and declaration of two variables to store data
  document.addEventListener("DOMContentLoaded", function() {
    const cocktailList = document.getElementById("cocktail-list");
    const users = []; 
  
    // Function to fetch cocktails from the API to make a GET request
    function collectCocktails() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
            .then(response => response.json())
            .then(data => showCocktails(data.drinks))
            .catch(error => console.error('Error fetching cocktails:', error));
    }
  
    // Function to showcase cocktails
    function showCocktails(cocktails) {
        cocktailList.innerHTML = "";
        cocktails.forEach(cocktail => {
            const drinkObject = createCocktailObject(cocktail);
            cocktailList.appendChild(drinkObject);
        });
    }
  
    // Function to create a cocktail articles and addition of edit and delete to be able to interact  with the cocktails
    function createCocktailObject(cocktail) {
        const cocktailItem = document.createElement('div');
        cocktailItem.classList.add('cocktail-item');
        cocktailItem.innerHTML = `
            <h2>${cocktail.strDrink}</h2>
            <p>${cocktail.strInstructions}</p>
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;
  
        // Add event listener to delete button so that it can be added to every list
        const deleteButton = cocktailItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            cocktailList.removeChild(cocktailItem);
        });
  
        // Add event listener to edit button to enable user to edit the recipe
        const editButton = cocktailItem.querySelector('.edit-btn');
        editButton.addEventListener('click', function() {
            // Get current values by selecting h2 elements in the html file 
            const name = cocktailItem.querySelector('h2').textContent;
            const instructions = cocktailItem.querySelector('p').textContent;
  
            // Prompt user for new values so as to enable them to add new values
            const newName = prompt("Enter new name:", name);
            const newInstructions = prompt("Enter new instructions:", instructions);
  
            // Update values
            cocktailItem.querySelector('h2').textContent = newName;
            cocktailItem.querySelector('p').textContent = newInstructions;
        });
  
        return cocktailItem;
    }
  
    // Function to handle form submission for creating a new cocktail
    function createCocktailItem(cocktail) {
        const cocktailItem = document.createElement('div');
        cocktailItem.classList.add('cocktail-item');
        cocktailItem.innerHTML = `
            <h2>${cocktail.name}</h2>
            <p>${cocktail.recipe}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;
        // adding  thye edit and delete for the new recipe to work like other ones
        // Add event listener to delete button
        const deleteButton = cocktailItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            cocktailList.removeChild(cocktailItem);
        });
  
        // Add event listener to edit button
        const editButton = cocktailItem.querySelector('.edit-btn');
        editButton.addEventListener('click', function() {
            // Get current values
            const name = cocktailItem.querySelector('h2').textContent;
            const recipe = cocktailItem.querySelector('p').textContent;
  
            // Prompt user for new values
            const newName = prompt("Enter new name:", name);
            const newRecipe = prompt("Enter new recipe:", recipe);
  
            // Update values
            cocktailItem.querySelector('h2').textContent = newName;
            cocktailItem.querySelector('p').textContent = newRecipe;
        });
  
        return cocktailItem;
    }
  
    const recipeForm = document.getElementById('cocktail-form');
  
    // Function to handle form submission
    recipeForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
  
        // Get user inputs
        const nameInput = document.getElementById('cocktail-name');
        const recipeInput = document.getElementById('cocktail-recipe');
  
        // Create new cocktail object
        const cocktail = {
            name: nameInput.value,
            recipe: recipeInput.value
        };
  
        // Add the cocktail to the list
        const cocktailItem = createCocktailItem(cocktail);
        cocktailList.appendChild(cocktailItem);
  
        // Reset form inputs
        recipeForm.reset();
    });
  
    const loginForm = document.getElementById('login-form');
    // Function to handle form submission for creating an account
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
  
        // Get user inputs
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
  
        // Create new user object
        const newUser = {
            username: usernameInput.value,
            password: passwordInput.value
        };
  
        // Add the new user to the array of users
        users.push(newUser);

  
        // Reset the form
        loginForm.reset();
    });
  
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
  
        // Get the values from the form
        const orderName = document.getElementById('order-name').value;
        const orderCocktail = document.getElementById('order-cocktail').value;
        const otherPreferences = document.getElementById('other-preferences').value;
  
        // Create an object to hold the order information
        const order = {
            name: orderName,
            cocktail: orderCocktail,
            preferences: otherPreferences
        };
  
        // sending the order to the server after submitting your order
        console.log('Order placed:', order);
  
        // reset after an order is placed so as to refresh the page
        orderForm.reset();
    });
  
    // Calling the fetched function
    collectCocktails();
});
