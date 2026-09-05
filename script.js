let  cart = [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard = button.closest(".product-card");

        const name = productCard.querySelector("h3").textContent;
        const priceText = productCard.querySelector(".price").textContent;

        const price = Number(
            priceText.replace("GH₵", "").trim()
        );

        cart.push({
            name: name,
            price: price
        });

        updateCart();

        alert(name + " has been added to your cart!");
    });

});


function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(function(item, index) {

            total += item.price;

            const itemElement = document.createElement("div");

            itemElement.className = "cart-item";

            itemElement.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>GH₵ ${item.price}</p>
                </div>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            `;

            cartItems.appendChild(itemElement);
        });
    }

    cartCount.textContent = cart.length;
    cartTotal.textContent = total;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


updateCart();

document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;

    document.getElementById("order-message").textContent =
        "🎉 Thank you, " + name + "! Your order has been placed successfully.";

    document.getElementById("checkout-form").reset();

    const cartItems = document.getElementById("cart-items");

    if (cartItems) {
        cartItems.innerHTML = "";
    }

    updateCheckout();
});

const cartDisplay = document.createElement("div");
cartDisplay.id = "checkout-cart";
cartDisplay.innerHTML = `
    <h3>Your Order</h3>
    <div id="checkout-items"></div>
    <h3>Total: GH₵<span id="checkout-total">0</span></h3>
`;

document.getElementById("checkout-form").before(cartDisplay);

function updateCheckout() {
    const items = document.querySelectorAll("#cart-items li");
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

    checkoutItems.innerHTML = "";

    let total = 0;

    items.forEach(item => {
        const text = item.textContent;
        checkoutItems.innerHTML += `<p>${text}</p>`;

        const price = text.match(/GH₵\s?(\d+(?:\.\d+)?)/);

        if (price) {
            total += parseFloat(price[1]);
        }
    });

    checkoutTotal.textContent = total.toFixed(2);
}

setInterval(updateCheckout, 500);

document.querySelector(".whatsapp-order-btn").addEventListener("click", function (event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "🛍️ *NEW KOFIBCREATIVES ORDER*\n\n";

    message += "📦 *ORDER DETAILS*\n";

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;

        message += `${index + 1}. ${item.name}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: GH₵${item.price}\n`;
        message += `   Subtotal: GH₵${itemTotal}\n\n`;
    });

    let total = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    message += `💰 *TOTAL: GH₵${total}*\n\n`;
    message += "Please confirm this order.";

    let whatsappNumber = "233200702397";

    let whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    window.location.href = whatsappURL;
});
