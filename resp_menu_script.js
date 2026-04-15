let subtotal = 0;
let heroLiked = false;
let scrollPosition = 0;


function freezeScroll() {
    scrollPosition = window.scrollY;
    document.body.classList.add('freeze');
    document.body.style.top = `-${scrollPosition}px`;
}

function unfreezeScroll() {
    document.body.classList.remove('freeze');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
}


function isOrderboxOpen() {
    return !document.getElementById("order_box").classList.contains('close_box');
}

function openBasket() {
    document.getElementById("order_box").classList.remove('close_box');
    if (window.innerWidth <= 1180) freezeScroll();
}

function closeBasket() {
    document.getElementById("order_box").classList.add('close_box');
    unfreezeScroll();
}

function toggleOrderbox() {
    if (window.innerWidth <= 1180) {
        isOrderboxOpen() ? closeBasket() : openBasket();
    } else {
        document.getElementById("order_box").classList.remove('close_box');
    }
}

// dialog funktionen
function closeEmptyBasket() {
    document.getElementById("dialog_warenkorb").close();
}

function closeDialog() {
    document.getElementById("dialog_deliver").close();
    unfreezeScroll();
}

function closeDialogAndReset() {
    closeDialog();
    localStorage.removeItem("basket");
    closeBasket();
    renderBasket();
}

function deliveryFinished() {
    if (getBasket().length === 0) {
        document.getElementById("dialog_warenkorb").showModal();
        return;
    }
    document.getElementById("dialog_deliver").showModal();
    freezeScroll();
}

// storage funktionen
function getBasket() {
    return JSON.parse(localStorage.getItem("basket")) || [];
}

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function changeQuantity(title, change) {
    let basket = getBasket();
    let item = basket.find(i => i.title === title);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) basket = basket.filter(i => i.title !== title);
    }
    saveBasket(basket);
    renderBasket();
}

function removeItem(title) {
    saveBasket(getBasket().filter(i => i.title !== title));
    renderBasket();
}

// add to basket Funktion mit Animation
function animateAddButton(title) {
    let buttons = document.querySelectorAll(".dish_buy_button button");
    buttons.forEach(function(btn) {
        if (btn.getAttribute("onclick").includes(title)) {
            btn.classList.add("basket_animate");
            setTimeout(() => btn.classList.remove("basket_animate"), 600);
        }
    });
}

function addToBasket(title, price) {
    let basket = getBasket();
    let priceNumber = parseFloat(price.replace(",", ".").replace("€", ""));
    let existing = basket.find(item => item.title === title);
    existing ? existing.quantity++ : basket.push({ title, price: priceNumber, quantity: 1 });
    saveBasket(basket);
    renderBasket();
    window.innerWidth > 1180 ? openBasket() : animateAddButton(title);
}

// basket rendern
function buildBasketItem(item) {
    return `
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

function calcTotals(basket) {
    subtotal = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let delivery = subtotal >= 35 ? 0 : 4.99;
    return { subtotal, delivery, total: subtotal + delivery };
}

function updateTotals(subtotal, delivery, total) {
    document.getElementById("subtotal_price").innerText = subtotal.toFixed(2).replace(".", ",") + " €";
    document.getElementById("delivery_price").innerText = delivery === 0 ? "Kostenlose Lieferung 🎉" : "Lieferung 4,99 €";
    document.getElementById("total_price").innerText = total.toFixed(2).replace(".", ",") + " €";
    document.getElementById("buy_now_btn").innerText = `Buy now ${total.toFixed(2).replace(".", ",")}€`;
}

function renderEmptyBasket() {
    document.getElementById("basket_items").innerHTML = "<p class='empty_basket'>Warenkorb ist leer</p>";
    document.getElementById("subtotal_price").innerText = "0,00 €";
    document.getElementById("delivery_price").innerText = "Lieferung 4,99 €";
    document.getElementById("total_price").innerText = "0,00 €";
    document.getElementById("buy_now_btn").innerText = "Buy now";
}

function renderBasket() {
    let basket = getBasket();
    if (basket.length === 0) { renderEmptyBasket(); return; }
    let basketItems = document.getElementById("basket_items");
    basketItems.innerHTML = basket.map(buildBasketItem).join("");
    basketItems.scrollTop = basketItems.scrollHeight;
    let { subtotal, delivery, total } = calcTotals(basket);
    updateTotals(subtotal, delivery, total);
}


function checkWarenkorb() {
    let warenkorb = document.querySelector(".warenkorb");
    warenkorb.style.display = window.scrollY > 128 ? "inline" : "none";
}

window.addEventListener("scroll", checkWarenkorb);

function likeHero() {
    let btn = document.getElementById("hero-like-btn");
    let count = document.getElementById("hero-like-number");
    let number = parseInt(count.innerText);

    if (heroLiked === false) {
        number++;
        btn.classList.add("liked");
    } else {
        number--;
        btn.classList.remove("liked");
    }
    heroLiked = !heroLiked;

    count.innerText = number;
}