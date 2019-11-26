var email = document.getElementById("email");
var password = document.getElementById("password");
var email_error = document.getElementById('email_error');
var password_error = document.getElementById('password_error');
function emailValidate() {

    if (email.value == "") {
        email.style.border = "1px solid red";
        document.getElementById('email_div').style.color = "red";
        email_error.innerHTML = "You have not entered email";

    } else if (email.value.split('@').length - 1 === 0 || email.value.split('.').length - 1 === 0) {
        email.style.border = "1px solid red";
        document.getElementById('email_div').style.color = "red";
        email_error.innerHTML = " Email must contain symbols '@' and '.' ";
        return false;
    } else
        email.style.border = "1px solid #5e6e66";
    document.getElementById('email_div').style.color = "#5e6e66";
    email_error.innerHTML = "";
    return true;
}

function passValidate() {
    if (password.value == "") {
        password.style.border = "1px solid red";
        document.getElementById('password_div').style.color = "red";
        password_confirm.style.border = "1px solid red";
        password_error.style.color = "red";
        password_error.innerHTML = "You have not entered a password";
        return false;
    } else if (password.value.length < 11) {
        password.style.border = "1px solid red";
        document.getElementById('password_div').style.color = "red";
        password_error.style.color = "red";
        password_error.innerHTML = "Password must contain at least 11 symbols";
        return false;
    } else
        password.style.border = "1px solid #5e6e66";
    document.getElementById('password_div').style.color = "#5e6e66";
    password_error.innerHTML = "";
    return true;
}

function redirect() {
    if (email_error.innerText == "" && password_error.innerText == "" && password.value != "" && email.value != "") {
        window.location.href = "index.html";
    }
}