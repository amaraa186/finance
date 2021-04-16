//Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    totalTusuv: ".budget__value",
    totalInc: ".budget__income--value",
    totalExp: ".budget__expenses--value",
    percent: ".budget__expenses--percentage",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },
    getDOMStrings: function () {
      return DOMStrings;
    },
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMStrings.inputDescription + ", " + DOMStrings.inputValue
      );
      //convert List to Array
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    tusuvUzuuleh: function (tusuv) {
      document.querySelector(DOMStrings.totalTusuv).textContent = tusuv.tusuv;
      document.querySelector(DOMStrings.totalInc).textContent = tusuv.totalInc;
      document.querySelector(DOMStrings.totalExp).textContent = tusuv.totalExp;
      document.querySelector(DOMStrings.percent).textContent = tusuv.huvi;
    },

    addListItem: function (item, type) {
      //Орлого Зарлагийн элементийг агуулсан HTML-г бэлтгэх
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Тэр HTML дотроо орлого зарлагийн утгуудыг REPLACE ашиглан өөрчлөх
      html = html.replace("%id%", item.id);
      html = html.replace("%desc%", item.description);
      html = html.replace("%val%", item.value);
      //Өөрчилсөн HTML-ээ DOM-руу хийж өгөх
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

//Санхүүгийн контроллер
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum += Math.round(el.value);
    });
    data.totals[type] = sum;
  };

  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
    tusuv: 0,
    huvi: 0,
  };
  return {
    calculator: function () {
      //Нийт орлогын нийлбэрийг бодож олох
      calculateTotal("inc");
      //Нийт зарлагын нийлбэрийг бодож олох
      calculateTotal("exp");
      //Төсвийг тооцоолох
      data.tusuv = data.totals.inc - data.totals.exp;
      //Орлого зарлагын хувийг тооцоолох
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tusuvAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
      return item;
    },
  };
})();

//Програмын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1.Оруулах өгөгдлийг дэлгэцээс олж авах.
    var input = uiController.getInput();
    if (input.description !== "" && input.value !== "") {
      //2.Олж авсан өгөгдлөө санхүүгийн контроллерруу дамжуулах.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      //3.Олж авсан өгөгдлөө веб дээрээ тохирох хэсэгт нь байрлуулна.
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      //4.Төсвийг тооцоолно.
      financeController.calculator();
      //5.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргах.
      var tusuv = financeController.tusuvAvah();
      //6. Эцсийн төсвийн тооцоог дэлгэцэнд гаргах.
      uiController.tusuvUzuuleh(tusuv);
    }
  };

  var setEventListener = function () {
    var DOM = uiController.getDOMStrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Started Program...");
      setEventListener();
    },
  };
})(uiController, financeController);

appController.init();
