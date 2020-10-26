//Дэлгэцтэй ажиллах контроллер
var uiController = (function () {})();

//Санхүүгийн контроллер
var financeController = (function () {})();

//Програмын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1.Оруулах өгөгдлийг дэлгэцээс олж авах.
    console.log("Uildel hiigdsen baina.");
    //2.Олж авсан өгөгдлөө санхүүгийн контроллерруу дамжуулах.
    //3.Олж авсан өгөгдлөө веб дээрээ тохирох хэсэгт нь байрлуулна.
    //4.Төсвийг тооцоолно.
    //5.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргах.
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
