async function loginAdmin() {
  var email = document.getElementById("email-field").value;
  var password = document.getElementById("password-field").value;

  const loginURL = `https://ice-delivery.fly.dev/api/auth/user/login/${email}/${password}`;

  const response = await fetch(loginURL);
  const data = await response.text();
  verifyRes(data);
  return data;
}

function verifyRes(data) {
  var email = document.getElementById("email-field");
  var pass = document.getElementById("password-field");
  var errorMsg = document.getElementById("error-msg");
  if (data == '{"errorState":0,"message":"Email is invalid"}') {
    errorMsg.innerHTML = "Invalid email or password";
  } else if (data == '{"errorState":0,"message":"Password is invalid"}') {
    errorMsg.innerHTML = "Invalid email or password";
  } else if (email === "" || pass === "") {
    errorMsg.innerHTML = "You must fill in all fields";
  } else {
    localStorage.setItem("token", data);
    window.location.assign("./home.html");
  }
}

function clearAuthData() {
  localStorage.removeItem("token");
  window.location.replace("./index.html");
}

function verifyLoggedIn() {
  var token = localStorage.getItem("token");
  const tokenURL = `https://ice-delivery.fly.dev/api/auth/`;
  fetch(tokenURL, {
    headers: {
      "auth-token": token,
    },
  }).then((response) => {
    if (response.status == 200) {
      return;
    }
    if (response.status == 403) {
      window.location.replace("./index.html");
    }
  });
}
