## Angular Factories and Services.

We are going to dive into Angular Factories and Services.

## Objectives


## Demo


#### Setup
We have copied all of the code from the last lesson [wdi_9_angular_demo_routes](https://github.com/ga-wdi-boston/wdi_9_angular_demo_routes) into this repo to start off.


Oh, all but the app/customersData.js. And we'll see why we don't need this later.

#### Singleton

The Singleton Design pattern will prevent more than one instance of a class to occur. One can only create one instance of a Singleton. 

We've seen Singletons in the past when we've used an object literal to create only one Carlot, TodoList, etc.

Factories and Services are Singletons.

[Singleton Pattern in Javascript](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

#### Built-in Services
These services are provided by Angular.

* [$http](https://docs.angularjs.org/api/ng/service/$http) - Provides Ajax requests. Like the jQuery $.ajax we've used.
* [$location](https://docs.angularjs.org/api/ng/service/$location) - Represent the Browser URL. Can access and change the Browser's URL.
* $timeout
* $window
* $q - Provides a Promise that can be used to handle asynchronous callbacks.


#### Factories

Will return a custom object that can be used by multiple other components, typically controllers.

Factories use the [Revealing Module Javascript Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) to create the custom object they return.


##### Create a app/services/customerFactory.js  

```
(function customersFactoryIIFE(){

  // Create a customers factory
  var customersFactory = function(){
    // customers is private, only available in this scope
    var customers = [
      {
        id: 1,
        joined: '2000-12-02',
        name:'John',
        city:'Chandler',
        orderTotal: 9.9956,
        orders: [
          {
            id: 1,
            product: 'Shoes',
            total: 9.9956
          }
        ]
      },
      {
        id: 2,
        joined: '1965-01-25',
        name:'Zed',
        city:'Las Vegas',
        orderTotal: 19.99,
        orders: [
          {
            id: 2,
            product: 'Baseball',
            total: 9.995
          },
          {
            id: 3,
            product: 'Bat',
            total: 9.995
          }
        ]
      },
      {
        id: 3,
        joined: '1944-06-15',
        name:'Tina',
        city:'New York',
        orderTotal:44.99,
        orders: [
          {
            id: 4,
            product: 'Headphones',
            total: 44.99
          }
        ]
      },
      {
        id: 4,
        joined: '1995-03-28',
        name:'Dave',
        city:'Seattle',
        orderTotal:101.50,
        orders: [
          {
            id: 5,
            product: 'Kindle',
            total: 101.50
          }
        ]
      }
    ]; // end of customers data

    var factory = {};

    factory.getCustomers = function(){
      // allow access to the list of customers
      return customers;
    };

    factory.getCustomer = function(customerId){
      for(var i=0, len=customers.length; i < len; i++){
        if(customers[i].id == parseInt(customerId)){
          return customers[i];
        }
      }
      return {};
    };
    return factory;
  };

  angular.module('customersApp').factory('customersFactory', customersFactory);
})();

```

* Create an IIFE that will hide all the variables from Global scope.  
* Create a Self Revealing Function, customersFactory, in the IIFE.
* In the customersFactory function we will:  
	* _hard code_ all the customer data.  
		* _We'll remove this when we get customer data from the back end_  
	* Create an empty object literal, "factory". 
	* Create a method on factory, getCustomers, that can be used to access the customer data. 
	* Create a method on factory, getCustomers, that given a customer id will return data for that customer.
	* return the object literal "factory". _It will encapsulate all it's implementation and data inside the two methods, customersData and customerData._

* Register the Angular Factory. So it's available throughout the application.


##### Add the customer factory to the index.html.

```
<!DOCTYPE html>
<html ng-app="customersApp">
  <head>
    <script src='js/angular.js'></script>
    <script src='js/angular-route.js'></script>
    <script src='app/app_done.js'></script>
   	<!-- customer factory -->
    <script src='app/services/customersFactory_done.js'></script>
    <script src='app/controllers/customersController_done.js'></script>
    <script src='app/controllers/ordersController_done.js'></script>
  </head>

  <body>
    <div ng-view></div>
  </body>
</html>

```  

##### Add the app/controllers/customersController.js

```
(function customersControllerIIFE(){

  // 1. Inject the customersFactory into this controller
  var CustomersController = function($scope, customersFactory){
    $scope.sortBy = "name";
    $scope.reverse = false;
    // 2. Create an empty customers Array in the scope.
    $scope.customers= [];

    // 3. Create a function that will set the customers Array in the scope
    // from the customersFactory
    function init(){
      // Init the customers from the factory
      $scope.customers = customersFactory.getCustomers();
    }

    // 4. Initialize the controller.
    init();

    $scope.doSort = function(propName){
      $scope.sortBy = propName;
      $scope.reverse = !$scope.reverse;
    };

  };

 // Prevent the minifier from breaking dependency injection.
 CustomersController.$inject = ['$scope', 'customersFactory'];

 // The Controller is part of the module.
 angular.module('customersApp').controller('customersController', CustomersController);

})();
```

1. Inject the customersFactory into this controller  
2. Create an empty customers Array in the scope.  
3. Create a function that will set the customers Array in the scope from the customersFactory.getCustomers method.
4. Initialize the controller.  

##### Add the app/controllers/ordersController.js

```
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
```
1. Inject the customersFactory into this controller  
2. Create an null customer.  
3. Create a function, init, that will set the customers from the customerId param.
4. Initialize the controller. 

##### Add the app/views/orders.html

```
 <h3>{{ customer.name}}'s Orders</h3>
 <table>
   <tr>
	<th>Product</th>
    <th>Total</th>
  </tr>
  <tr ng-repeat="order in customer.orders">
    <td>{{ order.product }}</td>
    <td>{{ order.total | currency }}</td>
  </tr>
</table>
<br/>
```


## Documentation

[AngularJS](https://angularjs.org/)

[API Documentation](https://docs.angularjs.org/api)

This is like the $.ajax in JQuery.  
[Ajax HTTP Service](https://docs.angularjs.org/api/ng/service/$http) 