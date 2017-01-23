$(function() {
    console.log("I'm ready!");

    // var endpoint = "https://shopicruit.myshopify.com/admin/orders.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6";
    var orders = [];

    function getOrders(pageNo) {
      var endpoint = "https://wrapapi.com/use/mistryrn/shopicruit-orders/get/0.0.1?page=" + pageNo + "&wrapAPIKey=8Z3OIH8MsAAfO5hwuvUHv31GgummtWs8";
      $.getJSON(endpoint, function(response) {
        if (response.success) {
          console.log("success from page", pageNo);
          return response.data.orders;
        } else {
          console.log("zero orders on page", pageNo);
          return null;
        }
      });
    }

    function getAllOrders(pageNo, orders) {
      if (pageNo === undefined) {
        pageNo = 1;
      }
      if (orders === undefined) {
        orders = [];
      }
      console.log("Checking page", pageNo);
      var endpoint = "https://wrapapi.com/use/mistryrn/shopicruit-orders/get/0.0.1?page=" + pageNo + "&wrapAPIKey=8Z3OIH8MsAAfO5hwuvUHv31GgummtWs8";
      $.getJSON(endpoint, function(response) {
        if (response.success) {
          console.log("success from page", pageNo);
          $("#status").text("Calculating your total...");
          orders = orders.concat(response.data.orders);
          updateTotal(response.data.orders);
          getAllOrders(pageNo+1, orders);
        } else {
          console.log("zero orders on page", pageNo);
          $("#status").text("Your total is:");
          setOrders(orders);
        }
      });
    }

    function updateTotal(orders) {
      var total = getNumber($("#total").text());
      for (var i = 0; i < orders.length; i++) {
        var orderCost = +orders[i].total_price;
        total += orderCost;
        $("#total").text(formatMoney(total));
      }
    }

    function formatMoney(number) {
      // regex from: http://stackoverflow.com/a/14428340/2763340
      return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    function getNumber(str) {
      // regex from http://stackoverflow.com/a/559178/2763340
      return Number(str.replace(/[^0-9\.]+/g,""));
    }

    function setOrders(orders) {
      orders = orders;
    }

    getAllOrders();

});
