function toggleOrderbox() {
    if (window.innerWidth <= 1180) {
        document.getElementById("order_box").classList.toggle('close_box');
        if (!document.getElementById("order_box").classList.contains('close_box')) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    } else {
        document.getElementById("order_box").classList.remove('close_box');
    }
}

function openBasket() {
    document.getElementById("order_box").classList.remove('close_box');
      if (window.innerWidth <= 1180) {
        document.body.style.overflow = "hidden";
    }
}

function closeBasket() {
    document.getElementById("order_box").classList.add('close_box');
    if (window.innerWidth <= 1180) {
        document.body.style.overflow = "auto";
    }
}

function closeDialogAndReset() {
    let dialog = document.getElementById("dialog_deliver");
    dialog.close();
    document.body.style.overflow = "";
    localStorage.removeItem("basket");
    closeBasket();
    renderBasket();
}

function getBasket() {
    return JSON.parse(localStorage.getItem("basket")) || [];
}

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function addToBasket(title, price) {
    let basket = getBasket();
    let priceNumber = parseFloat(price.replace(",", ".").replace("€", ""));
    let existing = basket.find(item => item.title === title);

    if (existing) {
        existing.quantity++;
    } else {
        basket.push({ 
            title: title, 
            price: priceNumber, 
            quantity: 1 
        });
    }

    saveBasket(basket);
    renderBasket();

if (window.innerWidth > 1180) {
    
    document.getElementById("order_box").classList.remove('close_box');
} else {
   
    let buttons = document.querySelectorAll(".dish_buy_button button");
    buttons.forEach(function(btn) {
        if (btn.getAttribute("onclick").includes(title)) {
            btn.classList.add("basket_animate");
            setTimeout(function() {
                btn.classList.remove("basket_animate");
            }, 600);
        }
    });
}};
function renderBasket() {
    let basket = getBasket();
    let basketItems = document.getElementById("basket_items");
    basketItems.innerHTML = "";

    if (basket.length === 0) {
        basketItems.innerHTML = "<p class='empty_basket'>Warenkorb ist leer</p>";
        document.getElementById("subtotal_price").innerText = "0,00 €";
        document.getElementById("delivery_price").innerText = "Lieferung 4,99 €";
        document.getElementById("total_price").innerText = "0,00 €";
        document.getElementById("buy_now_btn").innerText = "Buy now";
        return;
    }

    let subtotal = 0;

    for (let item of basket) {
        subtotal += item.price * item.quantity;
        basketItems.innerHTML += `
            <div class="basket_item">
                <div class="basket_item_info">
                    <p class="basket_item_title">${item.title}</p>
                    <div class="basket_controls">
                        <button class="basket_btn" onclick="changeQuantity('${item.title}', -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="basket_btn" onclick="changeQuantity('${item.title}', 1)">+</button>
                        <button class="basket_btn trash" onclick="removeItem('${item.title}')">🗑</button>
                    </div>
                </div>
                <p class="basket_item_price">${(item.price * item.quantity).toFixed(2).replace(".", ",")}€</p>
            </div>
        `;
    }

    let delivery = subtotal >= 35 ? 0 : 4.99;
    let total = subtotal + delivery;

    document.getElementById("subtotal_price").innerText = subtotal.toFixed(2).replace(".", ",") + " €";
    document.getElementById("delivery_price").innerText = delivery === 0 ? "Kostenlose Lieferung 🎉" : "Lieferung 4,99 €";
    document.getElementById("total_price").innerText = total.toFixed(2).replace(".", ",") + " €";
    document.getElementById("buy_now_btn").innerText = `Buy now ${total.toFixed(2).replace(".", ",")}€`;
}

function changeQuantity(title, change) {
    let basket = getBasket();
    let item = basket.find(i => i.title === title);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            basket = basket.filter(i => i.title !== title);
        }
    }

    saveBasket(basket);
    renderBasket();
}

function removeItem(title) {
    let basket = getBasket().filter(i => i.title !== title);
    saveBasket(basket);
    renderBasket();
}

function checkWarenkorb() {
    let warenkorb = document.querySelector(".warenkorb");
    if (window.scrollY > 128) {
        warenkorb.style.display = "inline";
    } 
    else {
        warenkorb.style.display = "none";
    }
}

window.addEventListener("scroll", checkWarenkorb);



let heroLiked = false;

function likeHero() {
    let btn = document.getElementById("hero-like-btn");
    let count = document.getElementById("hero-like-number");
    let number = parseInt(count.innerText);

    if (heroLiked === false) {
        heroLiked = true;
        number++;
        btn.classList.add("liked");
    } else {
        heroLiked = false;
        number--;
        btn.classList.remove("liked");
    }

    count.innerText = number;
}