(function customersControllerIIFE(){

  // 1. Inject application wide value, appSetting.
  var CustomersController = function($scope, customersFactory, appSettings){
    $scope.sortBy = "name";
    $scope.reverse = false;
    $scope.customers= [];
    // 2. Make the application wide settings available in the view.
    $scope.appSettings = appSettings;

    function init(){
      // Init the customers from the factory
      $scope.customers = customersFactory.getCustomers();
    }

    init();

    $scope.doSort = function(propName){
      $scope.sortBy = propName;
      $scope.reverse = !$scope.reverse;
    };

  };

 // 3. Prevent the minifier from breaking dependency injection.
 CustomersController.$inject = ['$scope', 'customersFactory', 'appSettings'];

 // The Controller is part of the module.
 angular.module('customersApp').controller('customersController', CustomersController);

})();
