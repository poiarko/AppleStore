var cart = {}; // корзина
var des = [];
let productsPerPage = +document.getElementById('countPerPage').value;

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.json-generator.com/api/json/get/bUAOvxMwzm?indent=2");
xhr.send();

var func = (productsPerPage) => {

    let out = '';
    for (let i = 0; i < productsPerPage; i++) {
        out +=
            `<div class="goods-card">
                <img onmouseover="mOver(this)" onmouseout="mOut(this)" onclick="addToDesPage(this)" data-art=${products[i].index} src="${products[i].picture}"> 
               <h1>${products[i].name}</h1>
                <p>${products[i].about}</p>
                <p>${products[i].year}</p>
                <p>${products[i].category}</p>
                <h5>${products[i].price} $</h5>
                <button class="add-to-cart" data-art=${products[i].index} onclick="addToCart(this)" onmousedown="mouseDown(this)" onmouseup="mouseUp(this)" >add to cart</button>
                </div>`
    }
    document.getElementById('data').innerHTML = out;   
}

function addToDesPage(el) {
    var articul = el.getAttribute('data-art');
    des = {};
    des[articul] = 1;
    localStorage.removeItem("des");
    localStorage.setItem('des', JSON.stringify(des));
    window.location.href = "description.html";
}

function addToCart(el) {
    var articul = el.getAttribute('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    checkQuantity();
    quantityGoods();
    localStorage.setItem('cart', JSON.stringify(cart));   
}

function quantityGoods() {
    var arr = Object.values(cart);
    var sum = 0;
    var cartLog = document.getElementById('cart-logo');
    for (var i in arr) {
        sum += arr[i];
    }
    var input = document.getElementById('quantity-goods');
    input.value = sum;
    if (input.value >= 1) {
        input.setAttribute("style", "width: 19px; text-align: center; border-radius: 90px; background-color: #FB3F4C; color: white;");
        cartLog.style.opacity = '';
    } else {
        input.value = '';
        cartLog.style.opacity = 0.6;
    }
    localStorage.setItem('quantity-goods', JSON.stringify(sum));
}

function checkQuantity() {
    if (localStorage.getItem('quantity-goods') != null) {
        sum = JSON.parse(localStorage.getItem('quantity-goods'));
    }
}

function checkCart() {
    // проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function numberProducts() {
    let productsPerPage = +document.getElementById('countPerPage').value;
    products = JSON.parse(xhr.response);
    orderFunction();
    checkCart();
    checkQuantity();
    quantityGoods();
    func(productsPerPage);
    drawButtons(productsPerPage);
    setEvents();
}
xhr.onload = numberProducts;

function addProducts(products) {

    let out = '';
    for (let i = 0; i < products.length; i++) {
        out +=
            `<div class="goods-card">
                <img onmouseover="mOver(this)" onmouseout="mOut(this)" onclick="addToDesPage(this)" data-art=${products[i].index} src="${products[i].picture}"> 
               <h1>${products[i].name}</h1>
                <p>${products[i].about}</p>
                <p>${products[i].year}</p>
                <p>${products[i].category}</p>
                <h5>${products[i].price} $</h5>
                <button class="add-to-cart" data-art=${products[i].index} onclick="addToCart(this)" onmousedown="mouseDown(this)" onmouseup="mouseUp(this)" >add to cart</button>                
                </div>`
    }
    document.getElementById('data').innerHTML = out;   
}

document.querySelectorAll('.order').forEach((el) => {
    el.onclick = orderFunction;
});

function orderFunction() { //проверка чекбоксов
    let mac = document.querySelector('.order[value="mac"]');
    let iphone = document.querySelector('.order[value="iphone"]');

    if (this.value == 'mac' || mac.checked == true ) {
        showMac();
        iphone.disabled = true;
    }
    if (this.value == 'mac' && mac.checked == false) {
        numberProducts();
        iphone.disabled = false;
    }
    if (this.value == 'iphone' || iphone.checked == true) {
        showIphone();
        mac.disabled = true;
    }
    if (this.value == 'iphone' && iphone.checked == false) {
        numberProducts();
        mac.disabled = false;
    }
}

function filterMac() {
    let mac = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].category === "macbook") {
            mac.push(products[i]);
        }
    }
    products = mac.slice();
    return products;
}

function filterIphone() {
    let iphone = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].category === "iphone") {
            iphone.push(products[i]);
        }
    }
    products = iphone.slice();
    return products;
}

function showMac() {
    let productsPerPage = +document.getElementById('countPerPage').value;
    filterMac();
    func(productsPerPage);
    drawButtons(productsPerPage);
    setEvents();
}

function showIphone() {
    let productsPerPage = +document.getElementById('countPerPage').value;
    filterIphone();
    func(productsPerPage);
    drawButtons(productsPerPage);
    setEvents();
}

function sortByName() {
    let productsPerPage = +document.getElementById('countPerPage').value;
    sortName(products);
    func(productsPerPage);
}

function sortName(arr) {
    arr.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });
};

function sortByPrice() {
    let productsPerPage = +document.getElementById('countPerPage').value;
    sortPrice(products);
    func(productsPerPage);
};


function sortPrice(arr) {
    arr.sort(function (a, b) {
        return a.price - b.price
    });
};


function drawButtons(productsPerPage) {
    let buttonCount = products.length / productsPerPage;
    let butt = '';
    for (let i = 0; i < buttonCount; i++) {
        butt += (`<button class='numBtn'>${i + 1}</button>`)
    }
    document.getElementById('btns').innerHTML = butt;
}

function setEvents() {
    let productsPerPage = +document.getElementById('countPerPage').value;
    let items = document.getElementsByClassName('numBtn');
    for (let item of items) {
        item.addEventListener('click', function () {
            let pageNum = +this.innerHTML;
            let start = (pageNum - 1) * productsPerPage;
            let end = start + productsPerPage;
            let notes = products.slice(start, end)
            addProducts(notes);
        });
    }
}

function mOver(element) {
    element.style.opacity = "0.7";
}
function mOut(element) {
    element.style.opacity = "1";
}
function mouseDown(el) {
    el.style.background = "black";
}
function mouseUp(el) {
    el.style.background = "grey";
    el.innerHTML = "added";
}