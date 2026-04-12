function init() {
  renderDish("dish1", burgers, "dish1.png", "Burger and Sandwiches");
  renderDish("dish2", pizzas, "dish2.svg", "Pizza 30cm");
  renderDish("dish3", salads, "dish3.png", "Salad");
  renderBasket();
  checkWarenkorb();
}

function renderDish(section, items, mealImage, mealDescription) {
  let dishes = document.getElementById(section);
  dishes.innerHTML = "";

  dishes.innerHTML += `
    <div class="dish_info">
      <div class="media_query_dish_info">
        <img src="./img/${mealImage}" alt="Dish Image">
        <p class="dish_description">${mealDescription}</p>
      </div>
    </div>
  `;

  for (let i = 0; i < items.length; i++) {
    dishes.innerHTML += `
      <div class="dish_content">
        <img src="./img/${items[i].image}" alt="Dish Image">
        <div class="dish_content_meal">
          <div class="dish_content_meal_title_price">
            <h2>${items[i].title}</h2>
            <p class="price_font">${items[i].price}</p>
          </div>
          <div class="dish_buy_button">
            <p class="dish_meal_description">${items[i].description}</p>
            <button onclick="addToBasket('${items[i].title}', '${items[i].price}')">Add to basket</button>
          </div>
        </div>
      </div>
    `;
  }
}


//dialog Bestellung abgeschlossen


function closeEmptyBasket() {
    let dialog = document.getElementById("dialog_warenkorb");
    dialog.close();
}

function deliveryFinished() {
    if (getBasket().length === 0) {
        let dialog = document.getElementById("dialog_warenkorb");
        dialog.showModal();
        return;
    }
    let dialog = document.getElementById("dialog_deliver");
    dialog.showModal();
    document.body.style.overflow = "hidden";
}

function closeDialog() {
    let dialog = document.getElementById("dialog_deliver");
    dialog.close();
    document.body.style.overflow = "";
}