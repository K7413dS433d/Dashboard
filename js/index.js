import { Transactions } from "./Transactions.js";

const baseUrl = "https://mocki.io/v1/d83c4274-7553-4adc-91e1-2a202e94c6f3";

/*calender */
$(function () {
  $("#datepicker").datepicker({ firstDay: 1 });
});

function drawChart(configuration) {
  const labels = configuration.dates;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Transaction history",
        data: configuration.amounts,
        backgroundColor: ["rgba(0, 43, 106, 0.5)"],
        borderColor: ["rgb(0, 43, 106)"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Transaction history",
          font: { size: 30 },
          color: "#002b6a",
        },
        legend: {
          display: false, // Hide the legend
        },
      },

      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const crx = document.getElementById("chart").getContext("2d");

  const myChart = new Chart(crx, config);
}

//set data
$(document).ready(async () => {
  const data = await fetch(baseUrl);
  const formatted = await data.json();
  const transactions = new Transactions(formatted);

  $("#customer-total").html(transactions.getCustomersNumber());
  $("#total-transaction").html(transactions.getTransactionsNumber());
  $("#total-amount").html(`${transactions.getTotalAmount()} &dollar;`);
  $("#five-customers").html(transactions.getLatestCustomers());
  $("#all-customers").html(transactions.getAllCustomers());

  //search
  $("#search").on("input", function () {
    if ($("#name").prop("checked")) {
      $("#all-customers").html(transactions.filterByName($(this).val()));
    } else if ($("#amount").prop("checked")) {
      $("#all-customers").html(
        transactions.filterByAmount(Number($(this).val()))
      );
      if (!$(this).val()) {
        $("#all-customers").html(transactions.getAllCustomers());
      }
    }
  });

  //open modal with data
  $(".clickable tr").on("click", function () {
    const id = Number($(this).attr("customer_id"));
    $("#customer-transactions").html(transactions.filterById(id));
    drawChart(transactions.getChartConfigurations(id));
  });
});

//empty search when filter clicked
$("input[type=radio]").on("click", function () {
  $("#search").val("");
});
