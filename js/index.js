import { Transactions } from "./Transactions.js";

const baseUrl = "https://mocki.io/v1/d83c4274-7553-4adc-91e1-2a202e94c6f3";

/*calender */
$(function () {
  $("#datepicker").datepicker({ firstDay: 1 });
});

//set tables
$(document).ready(async () => {
  const data = await fetch(baseUrl);
  const formatted = await data.json();
  const transactions = new Transactions(formatted);
  $("#customer-total").html(transactions.getCustomersNumber());
  $("#total-transaction").html(transactions.getTransactionsNumber());
  $("#total-amount").html(`${transactions.getTotalAmount()} &dollar;`);
  $("#five-customers").html(transactions.getLatestCustomers());
  $("#all-customers").html(transactions.getAllCustomers());
});
