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

```


## Documentation

[AngularJS](https://angularjs.org/)

[API Documentation](https://docs.angularjs.org/api)

This is like the $.ajax in JQuery.  
[Ajax HTTP Service](https://docs.angularjs.org/api/ng/service/$http) 