document.addEventListener("DOMContentLoaded", function() {
    const cocktailList = document.getElementById("cocktail-list");
    const users = []; 
  
    // Function to fetch cocktails from the API
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
  
    // Function to create a cocktail articles
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
            // Get current values
            const name = cocktailItem.querySelector('h2').textContent;
            const instructions = cocktailItem.querySelector('p').textContent;
  
            // Prompt user for new values
            const newName = prompt("Enter new name:", name);
            const newInstructions = prompt("Enter new instructions:", instructions);
  
            // Update values
            cocktailItem.querySelector('h2').textContent = newName;
            cocktailItem.querySelector('p').textContent = newInstructions;
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
  
        // Optionally, you can save the users array to localStorage or a server
        // localStorage.setItem('users', JSON.stringify(users));
        // Or send the data to a server for storage
  
        // Reset the form
        loginForm.reset();
    });
  
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior
  
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