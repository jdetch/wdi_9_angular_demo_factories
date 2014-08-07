(function customersControllerIIFE(){

  // 1. Inject the customersFactory into this controller
  var CustomersController = function($scope, customersFactory, appSettings){
    $scope.sortBy = "name";
    $scope.reverse = false;
    // 2. Create an empty customers Array in the scope.
    $scope.customers= [];
    $scope.appSettings = appSettings;

    // 3. Create a function that will set the customers Array in the scope
    // from the customersFactory
    function init(){
      // Init the customers from the factory
      //$scope.customers = customersFactory.getCustomers();
      customersFactory.getCustomers()
      .success(function(customerData){
        //Does something with the data returned by the API
        $scope.customers = customerData;
      })
      .error(function(data, status, headers, config){
        console.log("Error getting customers from the remote api");
        alert("Error getting customers from the remote api");
      });
    }

    // 4. Initialize the controller.
    init();

    $scope.doSort = function(propName){
      $scope.sortBy = propName;
      $scope.reverse = !$scope.reverse;
    };

  };

 // Prevent the minifier from breaking dependency injection.
 CustomersController.$inject = ['$scope', 'customersFactory', 'appSettings'];

 // The Controller is part of the module.
 angular.module('customersApp').controller('customersController', CustomersController);

})();
