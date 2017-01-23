$(function() {
    console.log("jQuery ready!");

    var orders = [];
    var deferred = $.Deferred();

    function getAllOrders(pageNo) {
      if (pageNo === undefined) {
        pageNo = 1;
      }
      console.log("Checking page", pageNo);

      var endpoint = "https://wrapapi.com/use/mistryrn/shopicruit-orders/get/0.0.1?page=" + pageNo + "&wrapAPIKey=8Z3OIH8MsAAfO5hwuvUHv31GgummtWs8";
      $.getJSON(endpoint, function(response) {
        if (response.success) {
          console.log("Successfully got orders from page", pageNo);
          updateTotal(response.data.orders);
          appendOrders(response.data.orders);
          getAllOrders(pageNo + 1);
        } else {
          console.log("No orders left as of page", pageNo);
          deferred.resolve(getOrders());
        }
      });

      return deferred.promise();
    }

    function updateTotal(orders) {
      var total = getNumber($("#total").text());

      for (var i = 0; i < orders.length; i++) {
        var orderCost = +orders[i].total_price;
        total += orderCost;
        $("#total").text(formatMoney(total));
      }
    }

    function setOrders(newOrders) {
      orders = newOrders;
    }

    function getOrders() {
      return orders;
    }

    function appendOrders(newOrders) {
      orders = orders.concat(newOrders);
    }

    $.when(getAllOrders()).then(function(orders) {
      $("#status").text("Your total is:");
      console.log("Total number of orders:", orders.length);
    });

});

function formatMoney(number) {
  // regex from: http://stackoverflow.com/a/14428340/2763340
  return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function getNumber(str) {
  // regex from http://stackoverflow.com/a/559178/2763340
  return Number(str.replace(/[^0-9\.]+/g,""));
}
