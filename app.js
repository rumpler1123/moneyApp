// Item controller
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, itemName, money) {
    this.id = id;
    this.itemName = itemName;
    this.money = money;
  };
  // Data structure
  const data = {
    itemPlus: [],
    itemMinus: [],

    currentItem: 0,
    totalMoney: 0
  };

  // Public methods
  return {
    getItemById: function (id) {
      let found = null
      // Loop through items

      // Plus item 
      data.itemPlus.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });

      // Minus item 
      data.itemMinus.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },
    updateItem: function (name, money) {
      // Calories to number 
      money = parseInt(money);

      let found = null;
      // Plus item update 
      data.itemPlus.forEach(function(item){
        if(item.id === data.currentItem.id) {
          item.itemName = name;
          item.money =  money;
          found = item;
        }
      });
      // Minus item update 
      data.itemMinus.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.itemName = name;
          item.money = money;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function (id) {
      // get ids 
      if (id % 2 == 0) {
        const idsPlus = data.itemPlus.map(function (item) {
          return item.id;
        });
        const indexPlus = idsPlus.indexOf(id);
        data.itemPlus.splice(indexPlus, 1);

      } else {
        const idsMinus = data.itemMinus.map(function (item) {
          return item.id;
        });
        const indexMinus = idsMinus.indexOf(id);
        data.itemMinus.splice(indexMinus, 1);
      }

      if (data.itemPlus.length === 0) {
        UICtrl.hidePlusTable();
      }

      if (data.itemMinus.length === 0) {
        UICtrl.hideMinusTable();
      }

    },
    clearAllItems: function() {
      data.itemPlus = [];
      data.itemMinus = [];
    },
    getItemsPlus: function() {
      return data.itemPlus;
    },
    getItemsMinus: function() {
      return data.itemMinus;
    },
    addPlusItem: function(name, money) {
      let ID = 2;
      // Create ID
      if (data.itemPlus.length > 0) {
        ID = data.itemPlus[data.itemPlus.length - 1].id + 2;
      } else {
        ID = 2;
      }
      // Money to number
      money = parseInt(money);
      // create new item
      newItem = new Item(ID, name, money);
      // Add to items array
      data.itemPlus.push(newItem);

      return newItem;
    },
    addMinusItem: function(name, money) {
      let ID = 1;
      // Create ID
      if (data.itemMinus.length > 0) {
        ID = data.itemMinus[data.itemMinus.length -1].id + 2;
      } else {
        ID = 1;
      }
      // Money to number
      money = parseInt(money);
      // Create new item
      newItem = new Item(ID, name, money);
      //Add to items array
      data.itemMinus.push(newItem);

      return newItem;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalMoney: function() {
      let total = 0;

      // plus money loop
      data.itemPlus.forEach(function(item) {
        total += item.money;
      });

      data.itemMinus.forEach(function(item) {
        total -= item.money;
      });

      // Set total money in structure
      data.totalMoney = total;

      // Return total
      return data.totalMoney;
    },
    totalPlusMoney: function() {
      let total = 0;
      data.itemPlus.forEach(function(item){
        total += item.money;
      });
      
      return total;
    },
    totalMinusMoney: function() {
      let total = 0;
      data.itemMinus.forEach(function(item){
        total += item.money;
      });
      
      return total;
    },
    logData: function() {
      return data;
    }
  };
})();

// UI controller
const UICtrl = (function() {
  UISelector = {
    itemListMinus: "#moneyMinusTable",
    itemListPlus: "#moneyPlusTable",
    allTable: ".allTable", // Add to update items. later... 
    tableRow: ".tableRow",
    tableRowTd: ".tableRow td",
    moneyPlusBtn: "#moneyPlus",
    moneyMinusBtn: "#moneyMinus",
    updateBtn: "#updateBtn",
    backBtn: "#backBtn",
    clearBtn: "#clearBtn",
    itemNameInput: "#itemName",
    itemMoneyInput: "#item-money",
    totalMoney: "#total-money",
    totalMinusMoney: ".TotalMinus",
    totalPlusMoney: ".TotalPlus"
  };

  //Public methods
  return {
    populateItemList: function(itemPlus, itemMinus) {
      let htmlPlus = "";
      let htmlMinus = "";

      // Item plus loop
      itemPlus.forEach(function(item) {
        htmlPlus += `
        <tr id="${item.id}">
        <td>${item.itemName}</td>
        <td>${item.money} Ft. </td>
        <td>
            <i class="item-edit fas fa-edit pr-1 text-warning"></i>
            <i class="item-delete fas fa-times text-danger"></i>
          </td>
      </tr>
        `;
      });

      // Item minus loop
      itemMinus.forEach(function(item) {
        htmlMinus += `
        <tr id="${item.id}">
        <td>${item.itemName}</td>
        <td>${item.money} Ft. </td>
        <td>
            <i class="item-edit fas fa-edit pr-1 text-warning"></i>
            <i class="item-delete fas fa-times text-danger"></i>
          </td>
      </tr>
        `;
      });
      // Inster table items
      document.querySelector(UISelector.itemListPlus).innerHTML = htmlPlus;
      document.querySelector(UISelector.itemListMinus).innerHTML = htmlMinus;
    },
    getItemInput: function() {
      return {
        itemName: document.querySelector(UISelector.itemNameInput).value,
        money: document.querySelector(UISelector.itemMoneyInput).value
      };
    },
    addListPlusItem: function(item) {
      // Table visibility
      document.querySelector(".table-plus").style.visibility = "visible";

      document.querySelector("#tfootPlus").style.visibility = "visible";

        // Create table row element
        const tr = document.createElement("tr");
        // Add class
        tr.className = UISelector.tableRow;
        // Add #ID
        tr.id = item.id;

        // Add HTML
        tr.innerHTML = `
      <td>${item.itemName}</td>
      <td>${item.money} Ft. </td>
      <td>
      <a href="#" class=""><i class="item-edit fas fa-edit pr-1 text-warning"></i></a>
      <a href="#" class=""><i class="item-delete fas fa-times text-danger"></i></a>
      </td>
      `;

        // Insert item
        document
          .querySelector(UISelector.itemListPlus)
          .insertAdjacentElement("beforeend", tr);
    },

    addListMinusItem: function(item) {
      // Table visibility
      document.querySelector(".table-minus").style.visibility = "visible";

      document.querySelector("#tfootMinus").style.visibility = "visible";
      
        // Create table row element
        const tr = document.createElement("tr");
        // Add class
        tr.className = UISelector.tableRow;
        // Add #ID
        tr.id = item.id;

        // Add HTML
        tr.innerHTML = `
      <td>${item.itemName}</td>
      <td>${item.money} Ft. </td>
      <td>
      <a href="#" class=""><i class="item-edit fas fa-edit pr-1 text-warning"></i></a>
      <a href="#" class=""><i class="item-delete fas fa-times text-danger"></i></a>
      </td>
      `;

        // Insert item
        document
          .querySelector(UISelector.itemListMinus)
          .insertAdjacentElement("beforeend", tr);
    },
    updateTableItem: function(item) {
      let tableItems = document.querySelectorAll('.allTable tr');

      // Turn node list into array
      tableItems = Array.from(tableItems);
    
      tableItems.forEach(function(tableItem){
        const itemID = tableItem.getAttribute('id');
        const iditem = item.id.toString();

        if(itemID === iditem){
          document.querySelector("[id=" + "\'" + item.id + "\'" + "]").innerHTML = `
          <td>${item.itemName}</td>
          <td>${item.money} Ft. </td>
          <td>
            <a href="#" class=""><i class="item-edit fas fa-edit pr-1 text-warning"></i></a>
            <a href="#" class=""><i class="item-delete fas fa-times text-danger"></i></a>
          </td>
          `;
        };
      });
    },
    deleteTableItem: function(id) {
      const itemID = id;
      const item = document.querySelector("[id=" + "\'" + itemID + "\'" + "]");
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelector.itemNameInput).value = "";
      document.querySelector(UISelector.itemMoneyInput).value = "";
    },
    addItemToForm: function() {
      document.querySelector(UISelector.itemNameInput).value = ItemCtrl.getCurrentItem().itemName;
      document.querySelector(UISelector.itemMoneyInput).value = ItemCtrl.getCurrentItem().money;

      UICtrl.showEditState();

    },
    clearAllItems: function() {
      let tableItems = document.querySelectorAll('tbody tr');

      tableItems = Array.from(tableItems);

      tableItems.forEach(function(item){
        item.remove();
      });
    },
    hidePlusTable: function() {
      document.querySelector(".table-plus").style.visibility = "hidden";

      document.querySelector("#tfootPlus").style.visibility = "hidden";
    },
    hideMinusTable: function() {
      document.querySelector(".table-minus").style.visibility = "hidden";

      document.querySelector("#tfootMinus").style.visibility = "hidden";
    },
    showTotalMoney: function(totalMoney) {
      document.querySelector(UISelector.totalMoney).textContent = totalMoney;
    },
    showTotalPlusMoney: function(totalPlusMoney) {
     document.querySelector(UISelector.totalPlusMoney).textContent = totalPlusMoney;
    },
    showTotalMinusMoney: function(totalMinusMoney) {
      document.querySelector(UISelector.totalMinusMoney).textContent = totalMinusMoney;
     },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelector.moneyPlusBtn).style.display = "inline";
      document.querySelector(UISelector.moneyMinusBtn).style.display = "inline";
      document.querySelector(UISelector.updateBtn).style.display = "none";
      document.querySelector(UISelector.backBtn).style.display = "none";
    },
    showEditState() {
      document.querySelector(UISelector.moneyPlusBtn).style.display = "none";
      document.querySelector(UISelector.moneyMinusBtn).style.display = "none";
      document.querySelector(UISelector.updateBtn).style.display = "inline";
      document.querySelector(UISelector.backBtn).style.display = "inline";
    },
    getSelectors: function() {
      return UISelector;
    }
  };
})();

// App controller

const App = (function(ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item events
    //Plus 
    document
      .querySelector(UISelectors.moneyPlusBtn)
      .addEventListener("click", itemPlusSubmit);
    // Minus 
    document
      .querySelector(UISelectors.moneyMinusBtn)
      .addEventListener("click", itemMinusSubmit);

    // Disbale enter submit
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13 ) {
        e.preventDefault();
        false;
      }
    })  

    //Edit icon click event
     const allTable = document.querySelectorAll(UISelectors.allTable);
     for(let i = 0; i < allTable.length; i++) {
       allTable[i].addEventListener('click', itemEditSubmit);
     }

     // Delete icon click event 
     const allTableItem = document.querySelectorAll('.allTable');
     for(let i = 0; i < allTableItem.length; i++){
       allTableItem[i].addEventListener('click', itemDeleteSubmit );
     }

     // Update item event
     document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

     // Back button event
     document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

     // Clear all button event
     document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);

  };

  // Add item submit

  // Add Plus
  const itemPlusSubmit = function(e) {
    const input = UICtrl.getItemInput();

    // Check for itemName and money input
    if (input.itemName !== "" && input.money !== "") {
      // Add item
      const newItem = ItemCtrl.addPlusItem(input.itemName, input.money);
      // Add item to table
      UICtrl.addListPlusItem(newItem);

      // Get total money
      const totalMoney = ItemCtrl.getTotalMoney();
      // Get total plus/minus money 
      const totalPlusMoney = ItemCtrl.totalPlusMoney();
      const totalMinusMoney = ItemCtrl.totalMinusMoney();

      // Add total plus/minus money to UI 
      UICtrl.showTotalPlusMoney(totalPlusMoney);
      UICtrl.showTotalMinusMoney(totalMinusMoney);

      // Add total money to UI
      UICtrl.showTotalMoney(totalMoney);
      
      // Add total plus/minus money to UI 
      UICtrl.showTotalPlusMoney(totalPlusMoney);
      UICtrl.showTotalMinusMoney(totalMinusMoney);

      // Clear input
      UICtrl.clearInput();
    }
    e.preventDefault();
  };
  // Add Minus
  const itemMinusSubmit = function(e) {
    const input = UICtrl.getItemInput();

    // Chek for itemName and meny input
    if (input.itemName !== "" && input.money !== "") {
      // Add item
      const newItem = ItemCtrl.addMinusItem(input.itemName, input.money);
      // Add item to HTML
      UICtrl.addListMinusItem(newItem);

      // Get total money
      const totalMoney = ItemCtrl.getTotalMoney();
      // Add total money to UI
      UICtrl.showTotalMoney(totalMoney);

      // Get total plus/minus money 
      const totalPlusMoney = ItemCtrl.totalPlusMoney();
      const totalMinusMoney = ItemCtrl.totalMinusMoney();

      // Add total plus/minus money to UI 
      UICtrl.showTotalPlusMoney(totalPlusMoney);
      UICtrl.showTotalMinusMoney(totalMinusMoney);

      // Clear input
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Edit item submit
  const itemEditSubmit = function(e) {
    if(e.target.classList.contains('fa-edit')) {
      // Get item id 
      const tableId = e.target.parentNode.parentNode.parentNode.id;

      // Id convert to number 
      const id = parseInt(tableId);

      // Get item 
      const itemToEdit = ItemCtrl.getItemById(id);
      
      // Set current item 
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form 
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // Update item 
  const itemUpdateSubmit = function(e) {
    // Get item input 
    const input = UICtrl.getItemInput();

    // Update item 
    const updateItem = ItemCtrl.updateItem(input.itemName, input.money);

    // Update UI
    UICtrl.updateTableItem(updateItem);

    // Get total money
    const totalMoney = ItemCtrl.getTotalMoney();

    // Get total plus/minus money 
    const totalPlusMoney = ItemCtrl.totalPlusMoney();
    const totalMinusMoney = ItemCtrl.totalMinusMoney();

    // Add total plus/minus money to UI 
    UICtrl.showTotalPlusMoney(totalPlusMoney);
    UICtrl.showTotalMinusMoney(totalMinusMoney);
    // Add total money to UI 
    UICtrl.showTotalMoney(totalMoney);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  // Delete icon event
  const itemDeleteSubmit = function(e) {
    if(e.target.classList.contains('fa-times')){

      const deleteId = e.target.parentNode.parentNode.parentNode.id;

      // Id convert to number 
      const id = parseInt(deleteId);

      // Get item 
      const currentItem = ItemCtrl.getItemById(id);

      // Delete from data structure
      ItemCtrl.deleteItem(currentItem.id);

      // Delete from UI 
      UICtrl.deleteTableItem(currentItem.id);

      // Get total money
      const totalMoney = ItemCtrl.getTotalMoney();

      // Get total plus/minus money 
      const totalPlusMoney = ItemCtrl.totalPlusMoney();
      const totalMinusMoney = ItemCtrl.totalMinusMoney();

      // Add total plus/minus money to UI 
      UICtrl.showTotalPlusMoney(totalPlusMoney);
      UICtrl.showTotalMinusMoney(totalMinusMoney);
      // Add total money to UI
      UICtrl.showTotalMoney(totalMoney);
    }
    e.preventDefault();
  }

  // Clear all items event 
  const clearAllItems = function(e) {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total money
    const totalMoney = ItemCtrl.getTotalMoney();
    // Add total money to UI
    UICtrl.showTotalMoney(totalMoney);

    // Get total plus/minus money 
    const totalPlusMoney = ItemCtrl.totalPlusMoney();
    const totalMinusMoney = ItemCtrl.totalMinusMoney();

    // Add total plus/minus money to UI 
    UICtrl.showTotalPlusMoney(totalPlusMoney);
    UICtrl.showTotalMinusMoney(totalMinusMoney);
    // Remove from UI
    UICtrl.clearAllItems();

    // Hide table head 
    UICtrl.hidePlusTable();
    UICtrl.hideMinusTable();

    e.preventDefault();
  }

  // Public methods
  return {
    init: function() {
      // Clear edit state / set initial set
      UICtrl.clearEditState();

      const itemPlus = ItemCtrl.getItemsPlus();
      const itemMinus = ItemCtrl.getItemsMinus();

      // Check if any plus item
      if (itemPlus.length === 0) {
        UICtrl.hidePlusTable();
      } else {
        // Populate list with items
        UICtrl.populateItemList(itemPlus, itemMinus);
      }
      // Check if any minus item
      if (itemMinus.length === 0) {
        UICtrl.hideMinusTable();
      } else {
        // Populate list with items
        UICtrl.populateItemList(itemPlus, itemMinus);
      }
      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

App.init();
