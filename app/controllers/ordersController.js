(function ordersControllerIIFE(){

  var OrdersController = function($scope, $routeParams, customersFactory){
    var customerId = $routeParams.customerId;
    $scope.customer= null;

    // private function, not available outside of IIFE

    function init(){
      // Search for the customer by id
      $scope.customer = customersFactory.getCustomer(customerId);
    }

    init();
  };

  // Prevent the minifier from breaking dependency injection.
  OrdersController.$inject = ['$scope', '$routeParams', 'customersFactory'];

  // The Controller is part of the module.
  angular.module('customersApp').controller('ordersController', OrdersController);

})();
