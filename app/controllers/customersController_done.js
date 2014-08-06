(function customersControllerIIFE(){

  // 1. Inject the customersService into this controller
  var CustomersController = function($scope, customersService){
    $scope.sortBy = "name";
    $scope.reverse = false;
    // 2. Create an empty customers Array in the scope.
    $scope.customers= [];

    // 3. Create a function that will set the customers Array in the scope
    // from the customersService
    function init(){
      // Init the customers from the service
      $scope.customers = customersService.getCustomers();
    }

    // 4. Initialize the controller.
    init();

    $scope.doSort = function(propName){
      $scope.sortBy = propName;
      $scope.reverse = !$scope.reverse;
    };

  };

 // Prevent the minifier from breaking dependency injection.
 CustomersController.$inject = ['$scope', 'customersService'];

 // The Controller is part of the module.
 angular.module('customersApp').controller('customersController', CustomersController);

})();
