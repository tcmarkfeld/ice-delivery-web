const allDeliveriesURL = "https://ice-delivery.fly.dev/api/delivery/getall";

async function getDeliveries() {
  const response = await fetch(allDeliveriesURL);
  const data = await response.json();

  var ordered_array = data.sort(function (a, b) {
    return new Date(a.start_date) - new Date(b.start_date);
  });

  displayDeliveries(ordered_array);
  return data;
}

function getWeeksInMonth(year, month) {
  const weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let dayOfWeekCounter = firstDate.getDay();

  for (let date = 1; date <= numDays; date++) {
    if (dayOfWeekCounter === 0 || weeks.length === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(date);
    dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
  }

  if (weeks[0].length < 7) {
    const beforeIndex1 = addMonth(year, month - 1, 1);
    const indexRefactor = [...beforeIndex1, ...weeks[0]];
    weeks[0] = indexRefactor;
  }

  if (weeks[weeks.length - 1].length < 7) {
    const afterIndex1 = addMonth(year, month + 1, 0);
    const indexRefactor = [...weeks[weeks.length - 1], ...afterIndex1];
    weeks[weeks.length - 1] = indexRefactor;
  }

  return weeks
    .filter((w) => !!w.length)
    .map((w) => ({
      start: w[0],
      end: w[w.length - 1],
      dates: w,
    }));
}

const addMonth = (year, month, flag) => {
  const weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let dayOfWeekCounter = firstDate.getDay();

  for (let date = 1; date <= numDays; date++) {
    if (dayOfWeekCounter === 0 || weeks.length === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(date);
    dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
  }
  if (flag === 0) {
    return weeks[0];
  }
  if (flag === 1) {
    return weeks[weeks.length - 1];
  }
  return [];
};

const year = new Date().getFullYear();
const weeks = [];
const aprilDates = getWeeksInMonth(year, 3);
const mayDates = getWeeksInMonth(year, 4);
const juneDates = getWeeksInMonth(year, 5);
const julyDates = getWeeksInMonth(year, 6);
const augustDates = getWeeksInMonth(year, 7);
const septDates = getWeeksInMonth(year, 8);

// if (aprilDates[4].start === mayDates[0].start) {
//   mayDates.splice(0, 1);
// }
// if (mayDates[mayDates.length - 1].start === juneDates[0].start) {
//   juneDates.splice(0, 1);
// }
// if (juneDates[juneDates.length - 1].start === julyDates[0].start) {
//   julyDates.splice(0, 1);
// }
// if (julyDates[julyDates.length - 1].start === augustDates[0].start) {
//   augustDates.splice(0, 1);
// }
// if (augustDates[augustDates.length - 1].start === septDates[0].start) {
//   septDates.splice(0, 1);
// }
weeks.push(aprilDates);
weeks.push(mayDates);
weeks.push(juneDates);
weeks.push(julyDates);
weeks.push(augustDates);
weeks.push(septDates);

aprilDates.push("April");
mayDates.push("May");
juneDates.push("June");
julyDates.push("July");
augustDates.push("August");
septDates.push("September");

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
    }

    var i = -1;
    html += `<tr class="email-wrapper" id="tableRow">`;
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
    }
    console.log(weeks[i]);
    if (
      parseInt(dat.start_date.slice(8, 10)) >= weeks[i][0].start &&
      parseInt(dat.end_date.slice(8, 10)) <= weeks[i][0].end
    ) {
      var monthLength = weeks[i].length - 1;
      html += `<td scope="col">${weeks[i][monthLength]} ${weeks[i][0].start} - ${weeks[i][0].end}</td>`;
    } else if (
      parseInt(dat.start_date.slice(8, 10)) >= weeks[i][1].start &&
      parseInt(dat.end_date.slice(8, 10)) <= weeks[i][1].end
    ) {
      var monthLength = weeks[i].length - 1;
      html += `<td scope="col">${weeks[i][monthLength]} ${weeks[i][1].start} - ${weeks[i][1].end}</td>`;
    } else if (
      parseInt(dat.start_date.slice(8, 10)) >= weeks[i][2].start &&
      parseInt(dat.end_date.slice(8, 10)) <= weeks[i][2].end
    ) {
      var monthLength = weeks[i].length - 1;
      html += `<td scope="col">${weeks[i][monthLength]} ${weeks[i][2].start} - ${weeks[i][2].end}</td>`;
    } else if (
      parseInt(dat.start_date.slice(8, 10)) >= weeks[i][3].start &&
      parseInt(dat.end_date.slice(8, 10)) <= weeks[i][3].end
    ) {
      var monthLength = weeks[i].length - 1;
      html += `<td scope="col">${weeks[i][monthLength]} ${weeks[i][3].start} - ${weeks[i][3].end}</td>`;
    } else if (
      parseInt(dat.start_date.slice(8, 10)) >= weeks[i][4].start ||
      parseInt(dat.end_date.slice(8, 10)) <= weeks[i][4].end
    ) {
      var monthLength = weeks[i].length - 1;
      html += `<td scope="col">${weeks[i][monthLength]} ${weeks[i][4].start} - ${weeks[i][4].end}</td>`;
    } else {
      html += `<td scope="col">Couldn't load date</td>`;
    }
    html += `<td scope="col">${dat.start_date.slice(
      0,
      10
    )}</td><td scope="col">${dat.end_date.slice(0, 10)}</td>`;
    html += `<td scope="col">${dat.cooler_size}</td><td scope="col">${dat.ice_type}</td>`;
    html += `<td scope="col">${dat.delivery_address}</td><td scope="col" class="userEmail">${dat.customer_name}</td>`;
    html += `<td scope="col">${dat.customer_phone}</td><td scope="col">${dat.customer_email}</td>`;
    html += `<td scope="col">${dat.neighborhood}</td></tr>`;
    i++;
  }
  html += "</div>";
  tablebody.innerHTML = html;
}
var editor;

function displayDeliveries(data) {
  for (i in data) {
    data[i].start_date = data[i].start_date.slice(0, 10);
    data[i].end_date = data[i].end_date.slice(0, 10);
  }

  $("#myTable").DataTable({
    dom: "Bfrtip",
    buttons: ["pageLength", "copy", "csv", "excel"],
    data: data,
    columns: [
      {
        data: null,
        defaultContent: "",
        className: "select-checkbox",
        orderable: false,
      },
      { data: "start_date" },
      { data: "end_date" },
      { data: "cooler_size" },
      { data: "ice_type" },
      { data: "delivery_address" },
      { data: "customer_name" },
      { data: "customer_phone" },
      { data: "customer_email" },
      { data: "neighborhood" },
    ],
    select: {
      style: "os",
      selector: "td:first-child",
    },
    buttons: ["copy"],
  });

  $("#myTable").on("click", "tbody td:not(:first-child)", function (e) {
    editor.inline(this);
  });
}

function searchEmail() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("userEmail");
  let y = document.getElementsByClassName("email-wrapper");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      y[i].style.display = "none";
    } else {
      x[i].style.display = "span";
      y[i].style.display = "block";
    }
  }
}
