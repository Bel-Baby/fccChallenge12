const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;
const products = [
    //You now need to start adding products. Before you do that, you need to consider the structure of your product data. A product will need a unique identifier to distinguish it from other products, a price so people know how much it costs, and a name so people know what they are buying. You should also add a category to each product.Add an object to your products array. Give this object an id property set to the number 1, a name property set to the string "Vanilla Cupcakes (6 Pack)", a price property set to the number 12.99, and a category property set to the string "Cupcake".
    { id: 1, name: "Vanilla Cupcakes (6 Pack)", price: 12.99, category: "Cupcake" },
    { id: 2, name: "French Macaron", price: 3.99, category: "Macaron", },
    { id: 3, name: "Pumpkin Cupcake", price: 3.99, category: "Cupcake", },
    { id: 4, name: "Chocolate Cupcake", price: 5.99, category: "Cupcake", },
    { id: 5, name: "Chocolate Pretzels (4 Pack)", price: 10.99, category: "Pretzel", },
    { id: 6, name: "Strawberry Ice Cream", price: 2.99, category: "Ice Cream", },
    { id: 7, name: "Chocolate Macarons (4 Pack)", price: 9.99, category: "Macaron", },
    { id: 8, name: "Strawberry Pretzel", price: 4.99, category: "Pretzel", },
    { id: 9, name: "Butter Pecan Ice Cream", price: 2.99, category: "Ice Cream", },
    { id: 10, name: "Rocky Road Ice Cream", price: 2.99, category: "Ice Cream", },
    { id: 11, name: "Vanilla Macarons (5 Pack)", price: 11.99, category: "Macaron", },
    { id: 12, name: "Lemon Cupcakes (4 Pack)", price: 12.99, category: "Cupcake", },
];

//Now that you have your list of products, you can use JavaScript to insert them into the HTML. With this approach, if you decide to add more products, the HTML will automatically reflect that.//For the first parameter of your callback function, destructure the name, id, price, and category properties from the object passed in.
products.forEach(({ name, id, price, category }) => {
    //You need to display the available products in your HTML. Start by using the addition assignment operator to add an empty template literal string to the innerHTML property of the dessertCards variable.//In your template literal, create a div element with a class of dessert-card. In that div, create an h2 element and give it the text of the name variable.
    dessertCards.innerHTML += `
        <div class="dessert-card">
            <h2>${name}</h2>
            <p class="dessert-price">$${price}</p>
            <p class="product-category">Category: ${category}</p>
            <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
        </div>
    `;
});

//You are already familiar with an HTML class, but JavaScript also has a class. In JavaScript, a class is like a blueprint for creating objects. It allows you to define a set of properties and methods, and instantiate (or create) new objects with those properties and methods.
class ShoppingCart {
    //Classes have a special constructor method, which is called when a new instance of the class is created. The constructor method is a great place to initialize properties of the class.Add an empty constructor method to the ShoppingCart class.
    constructor() {
        //The this keyword in JavaScript is used to refer to the current object. Depending on where this is used, what it references changes. In the case of a class, it refers to the instance of the object being constructed. You can use the this keyword to set the properties of the object being instantiated.In your constructor, use the this keyword to set the items property to an empty array. Also, set the total property to 0, and the taxRate property to 8.25.
        this.items = [];
        this.total = 0;
        this.taxRate = 8.25;
    }
    //Your ShoppingCart class needs the ability to add items. Create an empty addItem method, which takes two parameters: id and products.The first parameter, id, is the id of the product the user has added to their cart. The second parameter, products, is an array of product objects. By using a parameter instead of directly referencing your existing products array, this method will be more flexible if you wanted to add additional product lists in the future.
    addItem(id, products) {
        //You need to find the product that the user is adding to the cart. Remember that arrays have a .find() method. In your addItem function, declare a product variable, and assign it the value of calling the .find() method on the products array.For the callback to .find(), pass a function that takes a single parameter item, and returns whether the id property of item is strictly equal to the id parameter passed to addItem.
        const product = products.find((item) => item.id === id);
        //Use const and destructuring to extract name and price variables from product.
        const { name, price } = product;
        //Now you need to push the product into the cart's items array. Remember to use the this keyword.
        this.items.push(product);
        //You now need a total count of each product that the user has in the cart. Declare a totalCountPerProduct variable, and assign it an empty object.
        const totalCountPerProduct = {}
        //Use the .forEach() method to loop through the items array. Pass an empty callback function that takes a single parameter dessert.
        this.items.forEach((dessert) => {
            //In your forEach callback, you need to update the totalCountPerProduct object. Using the id of the current dessert as your property, update the value of the property to be the current value plus one. Do not use the addition assignment operator for this.//You now have a small bug. When you try to access a property of an object and the property doesn't exist, you get undefined. This means if the dessert isn't already present in the totalCountPerProduct object, you end up trying to add 1 to undefined, which results in NaN.To fix this, you can use the || operator to set the value to 0 if it doesn't exist. Wrap your right-hand totalCountPerProduct[dessert.id] in parentheses, and add || 0 to the end of the expression.
            totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;


            //Now you need to get prepared to update the display with the new product the user added. Declare a currentProductCount variable, and assign it the value of the totalCountPerProduct object's property matching the id of product.
            const currentProductCount = totalCountPerProduct[product.id];

            //If a product has already been added to the user's cart then there will be a matching element which you'll need.Use .getElementById() to get the matching element - you'll be setting the id value to product-count-for-id${product.id}, so use a template literal to query that value.Assign your query to a currentProductCountSpan variable.
            const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

            //The behaviour of the addItem method needs to change if the product is already in the cart or not. Create a ternary that checks if the current product is already in the cart. Use undefined for both the truthy and falsy expressions to avoid a syntax error.//For your truthy expression, removing the undefined, you need to update the textContent of the currentProductCountSpan to be the currentProductCount followed by an x. Use a template literal to do so.//For your falsy expression, you'll need to add new HTML to your productsContainer. Start by removing the undefined, then use the addition assignment operator and template literal syntax to add a div with the class set to product and the id set to dessert${id} to the innerHTML property of the productsContainer.//Inside your div, add two p elements. Set the text of the second p element to be the value of the price variable.//In your first p element, add a span element. Give the span a class of product-count and an id of product-count-for-id${id}. Then, after the span, give your p element the text of the name variable.
            currentProductCount > 1 ? currentProductCountSpan.textContent = `${currentProductCount}x` : productsContainer.innerHTML += `
            <div id="dessert${id}" class="product">
                <P><span class="product-count" id="product-count-for-id${id}"></span>${name}</P>
                <P>${product.price}</P>
            </div>
            `;
        });
    }
    //You need a way to access the total number of items in the cart. The best way to do this is to add another method to your ShoppingCart class, rather than accessing the items array directly.Add a getCounts method to the ShoppingCart class. It should return the number of items in the items array.
    getCounts() {
        return this.items.length;
    }

    //Your last feature is to allow users to clear their cart. Add a clearCart() method to your ShoppingCart class.
    clearCart() {
        //The first thing you should do is check if the items array is empty. If it is, display an alert to the user with the text Your shopping cart is already empty, then return from the function.Remember that 0 is a falsy value, so you can use the ! operator to check if the array is empty.After displaying the alert, return from the function to stop execution.
        if (!this.items.length) {
            alert("Your shopping cart is already empty");
            return;
        }

        //Browsers have a built-in confirm() function which displays a confirmation prompt to the user. confirm() accepts a string, which is the message displayed to the user. It returns true if the user confirms, and false if the user cancels.Declare a variable isCartCleared and assign it the value of calling confirm() with the string "Are you sure you want to clear all items from your shopping cart?".
        const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");

        //You only want to clear the cart if the user confirms the prompt. Create an if statement that checks if the user confirmed the prompt.In the if statement, set the items property back to an empty array, then set the total property to 0.
        if (isCartCleared) {
            this.items = [];
            this.total = 0;
            //You also need to start clearing the HTML. Set the innerHTML property of the productsContainer back to an empty string.
            productsContainer.innerHTML = "";
            //Set the textContent of the totalNumberOfItems, cartSubTotal, cartTaxes, and cartTotal elements all to the number 0.
            totalNumberOfItems.textContent = 0;
            cartSubTotal.textContent = 0;
            cartTaxes.textContent = 0;
            cartTotal.textContent = 0;
        }
    }

    //Part of the total cost will include the tax, so you need to calculate that as well. Create a calculateTaxes method in the ShoppingCart class. This method should take an amount parameter.
    calculateTaxes(amount) {
        //Return the value of the taxRate (divided by 100, to convert it to a percent) multiplied by the amount parameter.For clarity, wrap the taxRate / 100 calculation in parentheses.//Because of the way computers store and work with numbers, calculations involving decimal numbers can result in some strange behavior. For example, 0.1 + 0.2 is not equal to 0.3. This is because computers store decimal numbers as binary fractions, and some binary fractions cannot be represented exactly as decimal fractions.We want to clean up the number result from your calculation. Wrap your calculation in parentheses (don't include the return statement!) and call the .toFixed() method on it. Pass the .toFixed() method the number 2 as an argument. This will round the number to two decimal places and return a string.//The issue with .toFixed() returning a string is that you want to be able to perform calculations with the tax rate. To fix this, you can pass the .toFixed() call (including the calculation) to the parseFloat() function. This will convert the fixed string back into a number, preserving the existing decimal places.Pass your .toFixed() call to parseFloat().
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }

    //You also need to update the total price of the cart when the user adds an item. Create a calculateTotal method in the ShoppingCart class. Declare a subTotal variable and use the reduce method on the items array to calculate the sum of the price property of each item in the array. Use total and item as the parameters for your callback.Remember to set your initial value in the reduce method.
    calculateTotal() {
        const subTotal = this.items.reduce((total, item) => total + item.price, 0);
        //Declare a variable tax and assign it the value of calling your new .calculateTaxes() method, passing subTotal as the argument.
        const tax = this.calculateTaxes(subTotal);
        //Update the total value to be the sum of the subTotal and tax values.
        this.total = subTotal + tax;
        //Update the HTML in this method as well. Set the textContent of the cartSubTotal to be the value of subTotal to a fixed 2 decimal places. Use template literal syntax to add the dollar sign to the beginning of the value.
        cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
        //Following the same pattern as your cartSubTotal, update the cartTaxes to display the tax value, and your cartTotal to display the total property.
        cartTaxes.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${this.total.toFixed(2)}`;
        //Finally, return the value of the total property. Remember your this keyword.
        return this.total;
    }
};

//There is still more functionality that your ShoppingCart class needs, but first you need to be able to test the code you have currently written. You'll need to instantiate a new ShoppingCart object and assign it to a variable.Declare a cart variable, and assign it a new ShoppingCart object.
const cart = new ShoppingCart();

//You need to get all of the Add to cart buttons that you added to the DOM earlier. Declare an addToCartBtns variable, and assign it the value of calling the getElementsByClassName() method on the document object, passing in the string "add-to-cart-btn".
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

//You need to iterate through the buttons in your addToCartBtns variable. However, .getElementsByClassName() returns a Collection, which does not have a forEach method.Use the spread operator on the addToCartBtns variable to convert it into an array. Then, use the forEach method to iterate through the array.//Add your callback function to the forEach method. It should take a btn parameter. Then, in the callback, add an event listener to the btn. The event listener should listen for a click event, and should take another callback with an event parameter.
[...addToCartBtns].forEach(btn => {
    btn.addEventListener("click", (event) => {
        //In your event listener callback, call the .addItem() method of your cart object, and pass in the event.target.id. Remember that the id here will be a string, so you need to convert it to a number.Pass your products array as the second argument.
        cart.addItem(Number(event.target.id), products);

        //Now you can update the total number of items on the webpage. Assign the value of your cart object's .getCounts() method to the textContent of the totalNumberOfItems variable.
        totalNumberOfItems.textContent = cart.getCounts();
        //Now call your .calculateTotal() method inside your forEach loop.
        cart.calculateTotal();
    });
});

//Your cart currently isn't visible on the webpage. To make it visible, start by adding an event listener to the cartBtn variable, listening for the click event. The callback does not need any parameters.
cartBtn.addEventListener("click", () => {
    //Start by inverting the value of isCartShowing. Remember that you can use the logical not operator ! to invert the value of a boolean. Assign the inverted value to isCartShowing.
    isCartShowing = !isCartShowing;
    //Now assign the textContent of the showHideCartSpan variable the result of a ternary expression which checks if isCartShowing is true. If it is, set the textContent to "Hide", otherwise set it to "Show".
    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
    //Finally, update the display property of the style object of the cartContainer variable to another ternary which checks if isCartShowing is true. If it is, set the display property to "block", otherwise set it to "none".
    cartContainer.style.display = isCartShowing ? "block" : "none";
});

//Your final step is to make your clear button functional. Add a click event listener to the clearCartBtn. For the callback, you can pass in cart.clearCart directly.However, doing so will not work, because the context of this will be the clearCartBtn element. You need to bind the clearCart method to the cart object.You can do this by passing cart.clearCart.bind(cart) as the callback.
clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));