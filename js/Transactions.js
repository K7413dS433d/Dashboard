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
        return `<tr onclick="openChart(${item.customer_id})">
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
    const data = this.data.transactions;
    let res = "";
    for (
      let i = data.length - 1, j = 1;
      i > Math.min(data.length, data.length - 6);
      i--
    ) {
      res += `<tr  onclick="openChart(${data[i].customer_id})">
                        <th scope="row">${j++}</th>
                        <td>${this.getNameByID(data[i].customer_id)}</td>
                        <td>&dollar; ${data[i].amount}</td>
                        <td class="d-none d-md-block">${data[i].date}</td>
                      </tr>`;
    }
    return res;
  }

  filterByAmount(amount) {
    let res = "";
    let i = 1;
    for (const iterator of this.data.transactions) {
      if (iterator.amount === amount) {
        res += `<tr  onclick="openChart(${iterator.customer_id})">
                        <th scope="row">${i++}</th>
                        <td>${this.getNameByID(iterator.customer_id)}</td>
                        <td>&dollar; ${iterator.amount}</td>
                        <td class="d-none d-md-block">${iterator.date}</td>
                      </tr>`;
      }
    }
    return res;
  }

  filterByName(name) {
    let id = 1;
    let res = "";
    for (const iterator of this.data.transactions) {
      if (
        this.getNameByID(iterator.customer_id)
          .toLowerCase()
          .includes(name.toLowerCase())
      ) {
        res += `<tr onclick="openChart(${iterator.customer_id})">
                        <th scope="row">${id++}</th>
                        <td>${this.getNameByID(iterator.customer_id)}</td>
                        <td>&dollar; ${iterator.amount}</td>
                        <td class="d-none d-md-block">${iterator.date}</td>
                      </tr>`;
      }
    }
    return res;
  }

  filterById(id) {
    let data = this.data.transactions;
    let res = "";
    let i = 1;
    for (const iterator of data) {
      if (iterator.customer_id === id) {
        res += `<tr  onclick="openChart(${iterator.customer_id})">
                        <th scope="row">${i++}</th>
                        <td>${this.getNameByID(iterator.customer_id)}</td>
                        <td>&dollar; ${iterator.amount}</td>
                        <td class="d-none d-md-block">${iterator.date}</td>
                      </tr>`;
      }
    }
    return res;
  }

  getChartConfigurations(id) {
    let data = this.data.transactions;
    let res = {
      dates: [],
      amounts: [],
    };
    for (const iterator of data) {
      if (iterator.customer_id === id) {
        res.dates.push(iterator.date);
        res.amounts.push(iterator.amount);
      }
    }
    return res;
  }
}
