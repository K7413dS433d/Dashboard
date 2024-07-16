export class Transactions {
  constructor(data) {
    this.data = data;
  }

  //num of customers
  getCustomersNumber() {
    return this.data.customers.length;
  }

  //number of transactions
  getTransactionsNumber() {
    return this.data.transactions.length;
  }

  // total amount of transactions
  getTotalAmount() {
    let res = 0;
    for (const iterator of this.data.transactions) {
      res += iterator.amount;
    }
    return res;
  }

  getNameByID(id) {
    const data = this.data.customers;
    for (let i = 0; i < data.length; i++) {
      if (id === data[i].id) {
        return data[i].name;
      }
    }
  }

  getAllCustomers() {
    let id = 1;
    let data = this.data.transactions
      .map((item) => {
        return `<tr customer_id="${item.customer_id}">
                        <th scope="row">${id++}</th>
                        <td>${this.getNameByID(item.customer_id)}</td>
                        <td>&dollar; ${item.amount}</td>
                        <td class="d-none d-md-block">${item.date}</td>
                      </tr>`;
      })
      .join("");
    return data;
  }

  getLatestCustomers() {
    const data = this.data.transactions.reverse();
    let res = "";
    for (let i = 0; i < 5; i++) {
      res += `<tr customer_id="${data[i].customer_id}">
                        <th scope="row">${i + 1}</th>
                        <td>${this.getNameByID(data[i].customer_id)}</td>
                        <td>&dollar; ${data[i].amount}</td>
                        <td class="d-none d-md-block">${data[i].date}</td>
                      </tr>`;
    }
    return res;
  }

//   getCustomerInfoByID(id) {}

  filterByName(name) {
    let id = 1;
    let data = this.data.transactions;
    let res = "";
    for (let i = 0; i < data.length; i++) {
      if (this.getNameByID(data[i].customer_id).startWith(name)) {
        res += `<tr customer_id="${data[i].customer_id}">
                        <th scope="row">${id++}</th>
                        <td>${this.getNameByID(data[i].customer_id)}</td>
                        <td>&dollar; ${data[i].amount}</td>
                        <td class="d-none d-md-block">${data[i].date}</td>
                      </tr>`;
      }
    }
    return res;
  }
}
