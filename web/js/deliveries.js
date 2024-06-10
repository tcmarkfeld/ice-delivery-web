const allDeliveriesURL = "https://ice-delivery.fly.dev/api/delivery/getall";

const token = localStorage.getItem("token");

async function getDeliveries() {
  const response = await fetch(allDeliveriesURL, {
    headers: {
      "auth-token": token,
    },
  });
  const data = await response.json();

  var ordered_array = data.sort(function (a, b) {
    return new Date(a.start_date) - new Date(b.start_date);
  });

  fillTable(ordered_array);
  return data;
}

// function getWeeksInMonth(year, month) {
//   const weeks = [],
//     firstDate = new Date(year, month, 1),
//     lastDate = new Date(year, month + 1, 0),
//     numDays = lastDate.getDate();

//   let dayOfWeekCounter = firstDate.getDay();

//   for (let date = 1; date <= numDays; date++) {
//     if (dayOfWeekCounter === 0 || weeks.length === 0) {
//       weeks.push([]);
//     }
//     weeks[weeks.length - 1].push(date);
//     dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
//   }

//   if (weeks[0].length < 7) {
//     const beforeIndex1 = addMonth(year, month - 1, 1);
//     const indexRefactor = [...beforeIndex1, ...weeks[0]];
//     weeks[0] = indexRefactor;
//   }

//   if (weeks[weeks.length - 1].length < 7) {
//     const afterIndex1 = addMonth(year, month + 1, 0);
//     const indexRefactor = [...weeks[weeks.length - 1], ...afterIndex1];
//     weeks[weeks.length - 1] = indexRefactor;
//   }

//   return weeks
//     .filter((w) => !!w.length)
//     .map((w) => ({
//       start: w[0] - 1,
//       end: w[w.length - 1],
//       dates: w,
//     }));
// }

// const addMonth = (year, month, flag) => {
//   const weeks = [],
//     firstDate = new Date(year, month, 1),
//     lastDate = new Date(year, month + 1, 0),
//     numDays = lastDate.getDate();

//   let dayOfWeekCounter = firstDate.getDay();

//   for (let date = 1; date <= numDays; date++) {
//     if (dayOfWeekCounter === 0 || weeks.length === 0) {
//       weeks.push([]);
//     }
//     weeks[weeks.length - 1].push(date);
//     dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
//   }
//   if (flag === 0) {
//     return weeks[0];
//   }
//   if (flag === 1) {
//     return weeks[weeks.length - 1];
//   }
//   return [];
// };

// const year = new Date().getFullYear();
// const weeks = [];
// const aprilDates = getWeeksInMonth(year, 3);
// const mayDates = getWeeksInMonth(year, 4);
// const juneDates = getWeeksInMonth(year, 5);
// const julyDates = getWeeksInMonth(year, 6);
// const augustDates = getWeeksInMonth(year, 7);
// const septDates = getWeeksInMonth(year, 8);

// weeks.push(aprilDates);
// weeks.push(mayDates);
// weeks.push(juneDates);
// weeks.push(julyDates);
// weeks.push(augustDates);
// weeks.push(septDates);

// aprilDates.push("April");
// mayDates.push("May");
// juneDates.push("June");
// julyDates.push("July");
// augustDates.push("August");
// septDates.push("September");

function fillTable(data) {
  var tablebody = document.getElementById("tableBody");
  var html = "<div>";
  for (var dat of data) {
    const startDate = dat.start_date.split("-");
    var startYear = startDate[0];
    var startMonth = startDate[1];
    var startDay = startDate[2];

    if (startMonth == 4) {
      startMonth = "April";
    } else if (startMonth == 5) {
      startMonth = "May";
    } else if (startMonth == 6) {
      startMonth = "June";
    } else if (startMonth == 7) {
      startMonth = "July";
    } else if (startMonth == 8) {
      startMonth = "August";
    } else if (startMonth == 9) {
      startMonth = "September";
    } else if (startMonth == 10) {
      startMonth = "October";
    }

    var i = 0;
    html += `<tr class="row-wrapper" id="tableRow">`;
    if (startMonth == "April") {
      i = 0;
    } else if (startMonth == "May") {
      i = 1;
    } else if (startMonth == "June") {
      i = 2;
    } else if (startMonth == "July") {
      i = 3;
    } else if (startMonth == "August") {
      i = 4;
    } else if (startMonth == "September") {
      i = 5;
    } else if (startMonth == "October") {
      i = 6;
    }

    const today = new Date().toISOString().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    var yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      .toISOString()
      .toLocaleString("en-US", {
        timeZone: "America/New_York",
      });

    if (
      dat.start_date.slice(0, 10) <= today &&
      dat.end_date.slice(0, 10) >= yesterday
    ) {
      html += `<td class="this-week" scope="col"><input type='date' class='table-date table-input' id="start${
        dat.id
      }" value='${dat.start_date.slice(
        0,
        10
      )}'/></td><td class="this-week" scope="col"><input type='date' class='table-date table-input' id="end${
        dat.id
      }" value='${dat.end_date.slice(0, 10)}'/></td>`;
    } else {
      html += `<td scope="col"><input type='date' class='table-date table-input' id="start${
        dat.id
      }" value='${dat.start_date.slice(
        0,
        10
      )}'/></td><td scope="col"><input type='date' class='table-date table-input' id="end${
        dat.id
      }" value='${dat.end_date.slice(0, 10)}'/></td>`;
    }
    if (dat.cooler_size.toLowerCase() == "62 quart") {
      html += `<td scope="col"><select name="cooler" id="cooler${dat.id}">
      <option value="${
        dat.cooler_size
      }">${dat.cooler_size.toLowerCase()}</option>
      <option value="40 Quart">40 quart</option>
  </select></td><td scope="col">`;
    } else {
      html += `<td scope="col"><select name="cooler" id="cooler${dat.id}">
      <option value="${
        dat.cooler_size
      }">${dat.cooler_size.toLowerCase()}</option>
      <option value="62 Quart">62 quart</option>
  </select></td><td scope="col">`;
    }
    if (dat.ice_type.toLowerCase() == "loose ice") {
      html += `<select name="icetype" id="icetype${dat.id}">
      <option value="${dat.ice_type}">${dat.ice_type.toLowerCase()}</option>
      <option value="BAGGED ICE">bagged ice</option>
  </select></td>`;
    } else {
      html += `<select name="icetype" id="icetype${dat.id}">
      <option value="${dat.ice_type}">${dat.ice_type.toLowerCase()}</option>
      <option value="LOOSE ICE">loose ice</option>
  </select></td>`;
    }
    html += `<td scope="col"><input class='table-input' id="address${dat.id}" value='${dat.delivery_address}'/></td>`;
    html += `<td scope="col"><select style="width: 100px;" name="neighborhood" id="neighborhood${dat.id}">
    <option value="${dat.neighborhood}">${dat.neighborhood_name}</option>
    <option value="1">Ocean Hill</option>
    <option value="2">Corolla Light</option>
    <option value="3">Whalehead</option>
    <option value="18">Whalehead Right</option>
    <option value="19">Cruz Bay (Soundfront at Corolla Bay)</option>
    <option value="17">Monteray Shores</option>
    <option value="16">Buck Island</option>
    <option value="15">Crown Point</option>
    <option value="14">KLMPQ</option>
    <option value="13">HIJO</option>
    <option value="12">Section F</option>
    <option value="4">Currituck Club</option>
    <option value="11">Section E</option>
    <option value="10">Section D</option>
    <option value="9">Section C</option>
    <option value="8">Section B</option>
    <option value="7">Section A</option>
    <option value="6">Spindrift</option>
    <option value="5">Pine Island</option>
    <option value="20">WHC South Lawn</option>
    <option value="21">WHC North Lawn</option>
</select></td>`;
    html += `<td scope="col" class="userEmail"><input class='table-input' id="name${dat.id}" value='${dat.customer_name}'/></td><td scope="col"><input id="phoneNumber${dat.id}" class='table-input' maxlength="13" value='${dat.customer_phone}'/></td><td scope="col"><input class='table-input' id="email${dat.id}" value='${dat.customer_email}'/></td>`;
    html += `<td scope="col"><input id="coolerNum${dat.id}" class='table-input' value='${dat.cooler_num}'/></td><td scope="col"><input id="limes${dat.id}" class='table-input' value='${dat.bag_limes}'/></td>`;
    html += `<td scope="col"><input id="oranges${dat.id}" class='table-input' value='${dat.bag_oranges}'/></td><td scope="col"><input id="lemons${dat.id}" class='table-input' value='${dat.bag_lemons}'/></td>`;
    html += `<td scope="col"><input id="margsalt${dat.id}" class='table-input' value='${dat.marg_salt}'/></td><td scope="col"><input id="freezepops${dat.id}" class='table-input' value='${dat.freeze_pops}'/></td><td scope="col"><input id="tip${dat.id}" class='table-input' value='${dat.tip}'/></td>`;
    html += `<td scope="col"><input id="deliverytime${dat.id}" class='table-input' value='${dat.deliverytime}'/></td><td scope="col"><input id="timeam${dat.id}" class='table-input' value='${dat.dayornight}'/></td>`;
    html += `<td scope="col"><input class='table-input' id="special${dat.id}" value='${dat.special_instructions}'/></td>`;
    html += `<td scope="col"><button class='btn btn-primary submit-button' onclick="saveChange(${dat.id})">Save</button></td>`;
    html += `<td scope="col"><button class='btn btn-danger' onclick='confirmDelete(${dat.id})'>Delete</button></td></tr>`;
    i++;
  }
  html += "</div>";
  tablebody.innerHTML = html;
}
var editor;

function saveChange(id) {
  var delivery_address = document.getElementById(`address${id}`).value;
  var customer_name = document.getElementById(`name${id}`).value;
  var customer_phone = document.getElementById(`phoneNumber${id}`).value;
  var customer_email = document.getElementById(`email${id}`).value;
  var start_date = document.getElementById(`start${id}`).value;
  var end_date = document.getElementById(`end${id}`).value;
  var special_instructions = document.getElementById(`special${id}`).value;
  var cooler_size = document.getElementById(`cooler${id}`).value;
  var ice_type = document.getElementById(`icetype${id}`).value;
  var neighborhood = document.getElementById(`neighborhood${id}`).value;
  var cooler_num = document.getElementById(`coolerNum${id}`).value;
  var bag_limes = document.getElementById(`limes${id}`).value;
  var bag_oranges = document.getElementById(`oranges${id}`).value;
  var bag_lemons = document.getElementById(`lemons${id}`).value;
  var marg_salt = document.getElementById(`margsalt${id}`).value;
  var freeze_pops = document.getElementById(`freezepops${id}`).value;
  var tip = document.getElementById(`tip${id}`).value;
  var deliverytime = document.getElementById(`deliverytime${id}`).value;
  var dayornight = document.getElementById(`timeam${id}`).value;

  const saveDeliveryURL = `https://ice-delivery.fly.dev/api/delivery/edit/${id}`;

  fetch(saveDeliveryURL, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({
      id: id,
      delivery_address: delivery_address,
      customer_name: customer_name,
      customer_phone: customer_phone,
      customer_email: customer_email,
      start_date: start_date,
      end_date: end_date,
      special_instructions: special_instructions,
      cooler_size: cooler_size,
      ice_type: ice_type,
      neighborhood: neighborhood,
      cooler_num: cooler_num,
      bag_limes: bag_limes,
      bag_lemons: bag_lemons,
      bag_oranges: bag_oranges,
      marg_salt: marg_salt,
      freeze_pops: freeze_pops,
      tip: tip,
      deliverytime: deliverytime,
      dayornight: dayornight,
    }),
  }).then((response) => {
    if (response.status == 200) {
      alert("Reservation has been successfully updated!");
      getDeliveries();
    } else {
      alert("Something went wrong. Please try again");
    }
  });
}

function confirmDelete(id) {
  let isExecuted = confirm("Are you sure to delete this reservation?");
  if (isExecuted == true) {
    deleteRes(id);
  }
}

function deleteRes(id) {
  const deleteURL = `https://ice-delivery.fly.dev/api/delivery/delete/${id}`;
  fetch(deleteURL, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": token,
    },
  }).then((response) => {
    if (response.status == 200) {
      alert("Reservation successfully deleted!");
      getDeliveries();
    } else {
      alert("Something went wrong. Please try again.");
    }
  });
}

function searchEmail() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let y = document.getElementsByClassName("userEmail");
  let x = document.getElementsByClassName("row-wrapper");

  for (i = 0; i < x.length; i++) {
    console.log(y[i].style.display);
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "";
      y[i].style.display = "";
    }
  }
}
