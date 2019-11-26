var des = [];
var cart = {};
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.json-generator.com/api/json/get/bUAOvxMwzm?indent=2");
xhr.send();
xhr.onload = desGood;


function desGood() {
    var products = JSON.parse(xhr.response);

    checkDes();
    checkCart();
    showDes(products);
    title(products);
}
function title(products) {
    for (var key in des) {
        document.title = (`${products[key].name}`);
    }
}

function showDes(products) {
    var out = '';
    for (var key in des) {

        out += `<h1>${products[key].name}</h1>
        
        <div class="goods-container">
        
            <div class="img-box">
                <img src="${products[key].picture}" > 
            </div>
                <div class="data-box">
                    
                    <p>Model: ${products[key].about}</p>
                    <p>Year: ${products[key].year}</p>
                    <h5>Price: ${products[key].price} $</h5>
                    <button class="add-to-cart" data-art=${products[key].index} onclick="addToCart(this)" onmousedown="mouseDown(this)" onmouseup="mouseUp(this)" >add to cart</button>
                    <button class="hotBtn" onclick='window.location.href = "cart.html"'>Cart</button>
                    <button class="hotBtn" onclick="window.location.href='index.html'">Home page</button>
                    
                </div>
            </div>`
    }

    document.getElementById('description').innerHTML = out;
}

function checkDes() {
    if (localStorage.getItem('des') != null) {
        des = JSON.parse(localStorage.getItem('des'));
    }
}
function checkCart() {
    // проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function addToCart(el) {

    var articul = el.getAttribute('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}


function mouseDown(el) {
    el.style.background = "black";
}
function mouseUp(el) {
    el.style.background = "grey";
    el.innerHTML = "added";
}