function clearInp() {
  document.getElementById("myForm").reset();
}

const isNumericInput = (event) => {
  const key = event.keyCode;
  return (
    (key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = (event) => {
  const key = event.keyCode;
  return (
    event.shiftKey === true ||
    key === 35 ||
    key === 36 || // Allow Shift, Home, End
    key === 8 ||
    key === 9 ||
    key === 13 ||
    key === 46 || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    ((event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
  );
};

const enforceFormat = (event) => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

const formatToPhone = (event) => {
  if (isModifierKey(event)) {
    return;
  }

  const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
  const areaCode = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) {
    event.target.value = `(${areaCode})${middle}-${last}`;
  } else if (input.length > 3) {
    event.target.value = `(${areaCode})${middle}`;
  } else if (input.length > 0) {
    event.target.value = `(${areaCode}`;
  }
};

const inputElement = document.getElementById("phoneNumber");
inputElement.addEventListener("keydown", enforceFormat);
inputElement.addEventListener("keyup", formatToPhone);

function checkFields() {
  var cooler = document.getElementById("cooler").value;
  var ice = document.getElementById("icetype").value;
  var neighborhood = document.getElementById("neighborhood").value;
  var address = document.getElementById("address").value;
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phoneNumber").value;
  var email = document.getElementById("email").value;
  var start_date = document.getElementById("startdate").value;
  var end_date = document.getElementById("enddate").value;
  var special = document.getElementById("special").value;
  if (special == null) {
    special = "";
  }

  if (
    (cooler === "") |
    (icetype === "") |
    (neighborhood === "") |
    (address === "") |
    (name === "") |
    (phone === "") |
    (email === "") |
    (start_date === "") |
    (end_date === "")
  ) {
    alert("Please fill out all fields");
  } else {
    var addDeliveryURL = `https://ice-delivery.fly.dev/api/delivery/add`;
    fetch(addDeliveryURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        delivery_address: address,
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        start_date: start_date.slice(0, 10),
        end_date: end_date.slice(0, 10),
        special_instructions: special,
        cooler_size: cooler,
        ice_type: ice,
        neighborhood: neighborhood,
      }),
    }).then((response) => {
      if (response.status == 200) {
        alert("Reservation successfully added!");
      } else {
        alert("Something went wrong. Please try again");
      }
    });
  }
}
