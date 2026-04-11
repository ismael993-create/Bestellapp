function init() {
  renderdish1();
  renderdish2();
  renderdish3();
  renderBasket();
  checkWarenkorb();
}

function renderdish1() {
  let dishes = document.getElementById("dish1");
  dishes.innerHTML = "";

  dishes.innerHTML += `
    <div class="dish_info">
    <div class="media_query_dish_info">
        <img src="./img/dish1.png" alt="Dish Image">
        <p class="dish_description">Burger and Sandwiches</p>
    </div>
    </div>
  `;

  for (let i = 0; i < burgers.length; i++) {
    dishes.innerHTML += `<div>
      <div class="dish_content">
          <img src="./img/${burgers[i].image}" alt="Dish Image">
          <div class="dish_content_meal">
              <div class="dish_content_meal_title_price">
                  <h2>${burgers[i].title}</h2>
                  <p class="price_font">${burgers[i].price}</p>
              </div>
              <div class="dish_buy_button">
                  <p class="dish_meal_description">${burgers[i].description}</p>
                  <button onclick="addToBasket('${burgers[i].title}', '${burgers[i].price}')">Add to basket</button>
              </div>
          </div>
      </div>
    `;
  }
};


function renderdish2() {
  let dishes = document.getElementById("dish2");
  dishes.innerHTML = "";

  dishes.innerHTML += `
    <div class="dish_info">
    <div class="media_query_dish_info">
       <img src="./img/dish2.svg" alt="Dish Image">
        <p class="dish_description">Pizza 30cm</p>
    </div>
     </div>
  `;

  for (let j = 0; j < pizzas.length; j++) {
    dishes.innerHTML += `
      <div class="dish_content">
          <img src="./img/${pizzas[j].image}" alt="Dish Image">
          <div class="dish_content_meal">
              <div class="dish_content_meal_title_price">
                  <h2>${pizzas[j].title}</h2>
                  <p class="price_font">${pizzas[j].price}</p>
              </div>
              <div class="dish_buy_button">
                  <p class="dish_meal_description">${pizzas[j].description}</p>
                  <button onclick="addToBasket('${pizzas[j].title}', '${pizzas[j].price}')">Add to basket</button>
              </div>
          </div>
      </div>
    `;
  }
}

function renderdish3() {
  let dishes = document.getElementById("dish3");
  dishes.innerHTML = "";

  dishes.innerHTML += `
    <div class="dish_info">
    <div class="media_query_dish_info">
       <img src="./img/dish3.png" alt="Dish Image">
        <p class="dish_description">Salad</p>
    </div>
     </div>
  `;

  for (let j = 0; j < salads.length; j++) {
    dishes.innerHTML += `
      <div class="dish_content">
          <img src="./img/${salads[j].image}" alt="Dish Image">
          <div class="dish_content_meal">
              <div class="dish_content_meal_title_price">
                  <h2>${salads[j].title}</h2>
                  <p class="price_font">${salads[j].price}</p>
              </div>
              <div class="dish_buy_button">
                  <p class="dish_meal_description">${salads[j].description}</p>
                  <button onclick="addToBasket('${salads[j].title}', '${salads[j].price}')">Add to basket</button>
              </div>
          </div>
      </div>
    `;
  }
}

//dialog Bestellung abgeschlossen


function deliveryFinished() {
  if (getBasket().length === 0) {
    alert("Dein Warenkorb ist leer! Bitte füge Artikel hinzu, bevor du fortfährst.");
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