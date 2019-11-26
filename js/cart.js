var cart = {}; // корзина

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.json-generator.com/api/json/get/bUAOvxMwzm?indent=2");
xhr.send();
xhr.onload = aaa;

function aaa() {
    var goods = JSON.parse(xhr.response);  // все товары
    checkCart();
    showCart(goods); //вывод товара на страницу корзины
    

}
function showCart(goods) {
    if (Object.keys(cart).length == 0) {

        var out =
            `<div class="emptyCart">
        <div>Your cart is empty</div><br>
        <button class="hotBtn" onclick="window.location.href='index.html'">Home page</button>
        <img src="img/empty-cart.jpg">
        </div>`;

        document.getElementById('my-cart').innerHTML = out;
        document.getElementById('total-div').remove();

    } else {
        
        var out = '';
        for (var key in cart) {

            out += `<div class="goods-card">

            <button class="delete" data-art="${key}" onclick="deleteGoods(this)">X</button> 
            <img src="${goods[key].picture}"> 
           <h1>${goods[key].name}</h1>
            <p>${goods[key].about}</p>
            <p>${goods[key].year}</p>
            <p>${goods[key].category}</p>
            <h5>${goods[key].price} $</h5>
            <input type="text" class="totalByGood" value="${cart[key] * goods[key].price}" readonly> $
            <div class="cntrlBtn">
                <button class="minus" data-art="${key}" onclick="minusGoods(this)">-</button>
                <input class="numGood" value="${cart[key]}" readonly>
                <button class="plus" data-art="${key}" onclick="plusGoods(this)" >+</button>
            </div>
            
            </div>`
        }
        document.getElementById('my-cart').innerHTML = out;
        total();
    }
}

function total() {
    var arr = [];
    var sum = 0;
    var inputs = document.getElementsByClassName('totalByGood');

    for (var i = 0; i < inputs.length; i++) {
        arr.push(+inputs[i].value);
    }
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    document.getElementById('total').value = sum;
}

function plusGoods(el) {
    var goods = JSON.parse(xhr.response);
    var articul = el.getAttribute('data-art');
    cart[articul]++;
    saveCartToLS();
    showCart(goods);
    total();
}

function minusGoods(el) {
    var goods = JSON.parse(xhr.response);
    var articul = el.getAttribute('data-art');
    if (cart[articul] > 1) {
        cart[articul]--;
    } else {
        delete cart[articul];
    }
    saveCartToLS();
    showCart(goods);
    total();
}

function deleteGoods(el) {
    var goods = JSON.parse(xhr.response);
    var articul = el.getAttribute('data-art');
    delete cart[articul];
    saveCartToLS();
    showCart(goods);
    total();
}

function checkCart() {
    // проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
