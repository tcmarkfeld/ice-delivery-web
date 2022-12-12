const allDeliveriesURL =
  "https://corolla-ice-delivery.herokuapp.com/api/delivery/getall";

async function getDeliveries() {
  const response = await fetch(allDeliveriesURL);
  const data = await response.json();
  displayDeliveries(data);
  return data;
}

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
      { data: "cooler_size" },
      { data: "ice_type" },
      { data: "delivery_address" },
      { data: "customer_name" },
      { data: "customer_phone" },
      { data: "customer_email" },
      { data: "start_date" },
      { data: "end_date" },
      { data: "neighborhood" },
    ],
  });
}
