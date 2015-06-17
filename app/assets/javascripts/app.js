(function() {
    var tracking = angular.module('tracking', ['ui.router', 'ngAnimate', 'templates', 'duScroll', 'ui.bootstrap', 'ngResource']);


tracking.factory('searchQuery', ['$resource', '$stateParams',
    function($resource, $stateParams) {
        // Store results
        var currentResults;

        return {
            // Get results –––––––––––––––––––––––––––––––––––––––//
            searchResults: function() {
                var searchTerm;
                if ($stateParams.tasks !== undefined && $stateParams.frameworks !== undefined) {
                    searchTerm = $stateParams.q +' AND '+ $stateParams.tasks.replace(/,/g, ' AND ')  +' AND '+ $stateParams.frameworks.replace(/,/g, ' AND ');
                    console.log($stateParams.frameworks);
                } else if ($stateParams.tasks !== undefined) {
                    searchTerm = $stateParams.q +' AND '+ $stateParams.tasks.replace(/,/g, ' AND ');
                } else {
                    searchTerm = $stateParams.q;
                }
                currentResults = $resource('/ats', {
                    query: encodeURIComponent(searchTerm) 
                }).get();
                return currentResults;
                },
            // Return results –––––––––––––––––––––––––––––––––––––––//
            currentResults: function() {
                return currentResults;
                }
            };
        }
    ]);

                
    tracking.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/search');

            $stateProvider

            // HOME STATES –––––––––––––––––––––––––––––––––––––––//
            .state('atsHome', {
                url: '/',
                templateUrl: 'ats-header.html'
            })

            // NESTED VIEWS –––––––––––––––––––––––––––––––––––––––//
            .state('atsHome.search', {

                // Set $stateParams
                url: 'search?q&tasks&frameworks&page',
                templateUrl: 'suggestions.html'

            })  
                // Requires New factory get for profile (Pretty easy, do later)
                .state('atsHome.search.profile', {
                    url: '/profile/:userId', 
                    views: {
                        'profile': {
                            templateUrl: 'profile.html',
                        }
                    }
                });
        }
    ]);


    // Empty main controller - kinda pointless remove ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 


    // SEARCH BAR GET searchResults ON CHANGE ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
    tracking.controller('searchController', ['$scope', 'searchQuery', '$state', '$stateParams', '$rootScope',
        function($scope, searchQuery, $state, $stateParams, $rootScope) {
    
            var currentQuery = $stateParams.q;

            // SET SEARCH VALUE ON LOAD ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
            $scope.query = $stateParams.q;

            // SERVER NEEDS A QUERY UNDEFINED WILL ERR  –––––––––––––––––––––––––––––––––––––––––––––//
            if ($stateParams.q === undefined ) {
                $scope.query = '';
                $stateParams.q = $scope.query;
            }

            // ON LOAD START LOADING ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
            $rootScope.loading = true;


            // ON SEARCH CHANGE ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
            $rootScope.search = function(newQuery) { 
                
                // START LOADING
                $rootScope.loading = true;

                // STATE NEEDS TO BE UPDATE OR NEW RESULTS WON'T UPDATE
                $stateParams.q = newQuery;

                // GET NEW QUERY RESULTS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
                searchQuery.searchResults().$promise.then(function(){

                    // IF NEW QUERY DOESN'T MATCH OR CONTAIN OLD QUERY RESET ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
                    if (!$stateParams.q.includes(currentQuery)) {

                        // RESET FILTERS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
                        $state.go("atsHome.search", { 
                            q: newQuery,
                            tasks: undefined, 
                            frameworks: undefined
                        });
                        // RESET TAB'S STATE ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
                        $rootScope.tab = 1;

                        // REMOVE DROPDOWN'S ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
                        $rootScope.dropdownOne = false;
                        $rootScope.dropdownTwo = false; //CHANGE TO NAMES I.E. TASK DROPDOWN 
                        

                    // IF CURRENT QUERY MATCHS OR CONTAINS NEW QUERY JUST UPDATE QUERY  –––––––––––––––––––––––––––––––––––––––––––––//
                    } else {

                        // GO TO STATE ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
                        $state.go("atsHome.search", {q: newQuery});
                        
                    } 

                    currentQuery = newQuery;

                    $rootScope.loading = false;

                });
            };
            
            // GET RESULTS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

            searchQuery.searchResults().$promise.then(function(){
                $rootScope.loading = false;
            });

            // Not good
            /*
            $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
                if($scope.query === fromParams.q && !fromParams.q.includes(toParams.q)) {
                    $scope.query = toParams.q;
                    $scope.stateParams = toParams;
                    $scope.search();
               }
            });*/
    
    }]);

    // FACET CONTROLLER –––––––––––––––––––––––––––––––––––––––//
    tracking.controller('TagController', ['$scope', '$http', '$filter', 'searchQuery', '$state', '$stateParams', '$rootScope',
        function($scope, $http, $filter, searchQuery, $state, $stateParams, $rootScope) {

            $scope.filterData = {};
            $scope.filterData.tasks = {};
            $scope.searchDynamicFacets = {};
            $rootScope.tab = 1;


            // REPLACE WITH NG-CLICK AND PASS IN DATA ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
            $scope.checkChange = function(filterdata) {
                
                $scope.disabled = true;
                
                angular.forEach(filterdata, function(key, value) {
                    if(filterdata[value])  { 
                        $scope.disabled = false;
                    } 
                });
            };
            // RETURN CURRENT RESULTS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
            searchQuery.currentResults()
                .$promise.then(function(data) {

                    console.log('getting-Tag-Container');

                    // USE TO CHECK IF SEARCH QUERY HAS CHANGED
                    $scope.currentSearch = $stateParams.q;

                    
                    $scope.searchDynamicFacets = data.dynamicFacets;  

                    if ($stateParams.tasks !== undefined) {

                        $scope.filterData.tasks = {};

                        $rootScope.tab = 2;
                        $rootScope.dropdownTwo = true; 


                        var arr = $stateParams.tasks.split(',');
    
                        for (var i = 0; i < arr.length; i++) {
                            $scope.filterData.tasks[arr[i]] = true;
                        }
                    } else {
                        $rootScope.tab = 1;
                        $rootScope.dropdownTwo = false; 
                    }
                    
                    if ($stateParams.frameworks !== undefined) {

                        $scope.filterData.frameworks = {};

                        $rootScope.tab = 3;
                        $rootScope.dropdownOne = true; 

                        var fw = $stateParams.frameworks.split(',');
    
                        for (var a = 0; a < fw.length; a++) {
                            $scope.filterData.frameworks[fw[a]] = true;
                        }
                        
                    }

                    $scope.tasks = [];
                    $scope.frameworks = [];
    
                    //$scope.frameworks = data.dynamicFacets.frameworks;
                    angular.forEach($scope.searchDynamicFacets.tasks, function(obj) {
                        angular.forEach(obj, function(value, key) {
                            $scope.tasks.push({
                                value: value,
                                key: key
                            });
                        }); 
                    });
                    angular.forEach($scope.searchDynamicFacets.frameworks, function(obj) {
                        angular.forEach(obj, function(value, key) {
                            $scope.frameworks.push({
                                value: value,
                                key: key
                            });
                        }); 
                    });
            });

            $scope.updateFilters = function(filterData) {
                
                $scope.setTasks = [];
                $scope.setFrameworks = [];

                if (filterData.tasks !== undefined ) {

                    angular.forEach(filterData.tasks, function(key, value) {
                            if(filterData.tasks[value])  { 
                                $scope.setTasks.push(value);
                            }
                    });
    
                    $scope.setTasks = $scope.setTasks.toString();
                    $stateParams.tasks = $scope.setTasks;

                }

                if (filterData.frameworks !== undefined ) {

                    angular.forEach(filterData.frameworks, function(key, value) {
                            if(filterData.frameworks[value])  { 
                                $scope.setFrameworks.push(value);
    
                            }
                    });

                    $scope.setFrameworks = $scope.setFrameworks.toString();
                    $stateParams.frameworks = $scope.setFrameworks;
                }

                $rootScope.loading = true;


                searchQuery.searchResults()
                    .$promise.then(function(){

                        $rootScope.loading = false;

                        if ($stateParams.tasks !== undefined) {
                            $scope.tab = 2;
                            $scope.dropdownTwo = true; 
                            $scope.dropdownOne = false; 
                        }
                        if ($stateParams.frameworks !== undefined) {
                            $scope.tab = 3;
                            $scope.dropdownOne = true; 
                        }

                        $state.go("atsHome.search", { tasks: $scope.setTasks, frameworks: $scope.setFrameworks });
                });

            };

        }
    ]);

    // RESULTS CONTROLLER - FOR WHEN PROFILE IS ADDED TO SCREEN –––––––––––––––––––––––––––––––––––––––//
    tracking.controller('resultsController', ['$scope', '$state', '$stateParams', '$rootScope', '$timeout', '$document', 'searchQuery',
        function($scope, $state, $stateParams, $rootScope, $timeout, $document, searchQuery) {

            $scope.app = 0;

            $scope.currentPage = $stateParams.page || 1;
            $scope.itemsPerPage = 10;
            $scope.maxSize = 5;
            $scope.searchResults = {};

            $scope.pageChanged = function(currentPage) {
                $document.scrollTopAnimated(200, 800);
                $rootScope.loading = true;

                $timeout(function() {
                    $rootScope.loading = false;
                }, 800);

                $state.go("atsHome.search", { page: currentPage});
            };

            searchQuery.currentResults()
                .$promise.then(function(data) {

                    console.log('getting-Results-Container');
    
                    $scope.searchResults = data.data;  
    
                    $scope.$watch('currentPage + itemsPerPage', function() {
                       var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
                        $scope.searchResultsFiltered = $scope.searchResults.slice(begin, end);
                    });

                }, function(reason) {
                    console.log('Failed: ' + reason);
                });
            }
    ]);

    // PROFILE CONTROLLER - FOR WHEN PROFILE IS ADDED TO APP –––––––––––––––––––––––––––––––––––––––//
    tracking.controller('ProfileController', ['$scope',
        function($scope) {

        }
    ]);

    // ANOTHER FACET DROPDOWNS ADD BACK ONCE URLS ARE DONE –––––––––––––––––––––––––––––––––––––––//
    
    tracking.directive('multiselect',['$document', function($document){
            return {
              restrict: 'A',
              require: '?ngModel',
              scope: true,
              link: function(scope, element, attr){
                
                  scope.isPopupVisible = false;
            
                  scope.toggleSelect = function(){
                    scope.isPopupVisible = !scope.isPopupVisible;
                  };
            
                  $document.bind('click', function(event){
                    var isClickedElementChildOfPopup = element
                      .find(event.target)
                      .length > 0;
                    
                    if (isClickedElementChildOfPopup)
                      return;
                      
                    scope.isPopupVisible = false;
                    scope.$apply();
                  });
              }
            };
        }]);
    

    // FOR ONBOARDING ONLY ADD LATER –––––––––––––––––––––––––––––––––––––––//
    /*
    tracking.directive('helpTip', ["$document",
        function($document) {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'PulseToolTip.html',
                // responsible for  DOM listeners as well as updating the DOM
                link: function(scope, element) {
                    scope.tipOpen = false;

                    var topOffset = element.find('.oFlyout').outerHeight();

                    element.find('.oFlyout').css({
                        "top": "-" + topOffset + "px",
                        "left": "-191px"
                    });

                    element.find('.pulse').click(function() {
                        scope.tipOpen = !scope.tipOpen;
                        element.find('.oFlyout').removeClass('fadeOutDown').addClass('fadeInUp');
                    });

                    $document.bind('click', function(event) {
                        var isChild = element
                            .find(event.target)
                            .length > 0;

                        if (isChild) return;

                        scope.tipOpen = false;
                    });
                    element.find('.oBtnPrimary').click(function() {
                        scope.tipOpen = false;
                        element.find('.pulse').addClass('hide');

                    });

                }
            };
        }
    ]);
    */



    // SHOULD BE ONE TEMPLATE THAT IS NG-REPEATED BASED ON FACETS & LENGTH –––––––––––––––––––––––––––––––––––––––//


    tracking.directive('platdevSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'platdev-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);
    tracking.directive('taskroleSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'taskrole-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);
    tracking.directive('jobpostSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'jobpost-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);


    tracking.directive('xpdetailsSet', [ function() {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'E',
            templateUrl: 'xpDetails-section.html',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, element) {}
        };
    }
    ]);

    // FILTER TO LIMIT THE NUMBER OF WORDS DISPLAYED–––––––––––––––––––––––––––––––––––––––//

    tracking.filter('words', [
        function() {
            return function(input, words) {
                if (isNaN(words)) return input;
                if (words <= 0) return '';
                if (input) {
                    var inputWords = input.split(/\s+/);
                    if (inputWords.length > words) {
                        input = inputWords.slice(0, words).join(' ') + '...';
                    }
                }
                return input;
            };
        }
    ]);

    tracking.filter('unsafe', ['$sce',
        function($sce) {
            return function(val) {
                return $sce.trustAsHtml(val);
            };
        }
    ]);

    // ADDS BACK BUTTON FUNCTIONALITY–––––––––––––––––––––––––––––––––––––––// 

    tracking.run(['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {

                // to be used for back button 
                // won't work when page is reloaded.
                $rootScope.previousState_name = fromState.name;
                $rootScope.previousState_params = fromParams;
            });
            //back button function called from back button's ng-click="back()"
            $rootScope.back = function() {
                $state.go($rootScope.previousState_name, $rootScope.previousState_params);
            };
        }
    ]);

    // FILTER TO SPLICE ARRAYS USED ON FACET OPTIONS

    tracking.filter('startFrom', [function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
        };
    }]);

    // FILTER TO TURN SKILL NAMES INTO PRETTY NAMES

    tracking.filter('prettyText', [function () {
     return function (inputValue) {
       if (inputValue) {
           return inputValue.replace(/-/g, ' ');
            }
        };
     }]);

    // FILTER TO CHANGE VALUE TO PERCENTAGE
    tracking.filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }]);

})();