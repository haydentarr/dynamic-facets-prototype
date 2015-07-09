var tracking = angular.module('tracking');

// SEARCH BAR GET searchResults ON CHANGE ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
tracking.controller('searchController', ['$scope', 'searchQuery', '$state', '$stateParams', '$rootScope',
    function($scope, searchQuery, $state, $stateParams, $rootScope) {

        var currentQuery = $stateParams.q;

        // SET SEARCH VALUE ON LOAD ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
        $scope.query = $stateParams.q;


        // SERVER NEEDS A QUERY UNDEFINED WILL ERR  –––––––––––––––––––––––––––––––––––––––––––––//
        if ($stateParams.q === undefined) {
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
            searchQuery.searchResults().$promise.then(function() {

                // IF NEW QUERY DOESN'T MATCH OR CONTAIN OLD QUERY RESET ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
                if (!$stateParams.q.includes(currentQuery)) {

                    // RESET FILTERS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
                    $state.go("atsHome.search", {
                        q: newQuery,
                        tasks: undefined,
                        exp: undefined
                    });
                    // RESET TAB'S STATE ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
                    $rootScope.tab = 1;

                    // REMOVE DROPDOWN'S ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
                    $rootScope.dropdownOne = false;
                    $rootScope.dropdownTwo = false; //CHANGE TO NAMES I.E. TASK DROPDOWN 


                    // IF CURRENT QUERY MATCHS OR CONTAINS NEW QUERY JUST UPDATE QUERY  –––––––––––––––––––––––––––––––––––––––––––––//
                } else {

                    // GO TO STATE ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––// 
                    $state.go("atsHome.search", {
                        q: newQuery
                    });

                }

                currentQuery = newQuery;

                $rootScope.loading = false;

            });
        };

        // GET RESULTS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

        searchQuery.searchResults().$promise.then(function() {
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

    }
]);

// FACET CONTROLLER –––––––––––––––––––––––––––––––––––––––//
tracking.controller('TagController', ['$scope', '$http', '$filter', 'searchQuery', '$state', '$stateParams', '$rootScope',
    function($scope, $http, $filter, searchQuery, $state, $stateParams, $rootScope) {

        $scope.filterData = {};
        $scope.filterData.tasks = {};
        $scope.filterData.experience = 0;
        $scope.searchDynamicFacets = {};
        $rootScope.tab = 1;
        $scope.isCollapsed = true;


        // REPLACE WITH NG-CLICK AND PASS IN DATA ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
        $scope.checkChange = function(filterdata) {

            $scope.disabled = true;

            angular.forEach(filterdata, function(key, value) {
                if (filterdata[value]) {
                    $scope.disabled = false;
                }
            });
        };
        // RETURN CURRENT RESULTS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
        searchQuery.currentResults()
            .$promise.then(function(data) {

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
                    $rootScope.dropdownOne = false;
                }

                if ($stateParams.exp !== undefined) {

                    $scope.filterData.experience = $stateParams.exp;

                    $rootScope.tab = 3;
                    $rootScope.dropdownOne = true;
                }

                $scope.tasks = [];

                //$scope.frameworks = data.dynamicFacets.frameworks;
                angular.forEach($scope.searchDynamicFacets.tasks, function(obj) {
                    angular.forEach(obj, function(value, key) {
                        $scope.tasks.push({
                            value: value,
                            key: key
                        });
                    });
                });
            });

        $scope.updateFilters = function(filterData) {

            $scope.setTasks = [];
            $scope.setExperience = [];

            if (filterData.tasks !== undefined) {

                angular.forEach(filterData.tasks, function(key, value) {
                    if (filterData.tasks[value]) {
                        $scope.setTasks.push(value);
                    }
                });

                $scope.setTasks = $scope.setTasks.toString();
                $stateParams.tasks = $scope.setTasks;

            }

            if (filterData.experience !== undefined) {
                $scope.exp = filterData.experience
               
                if(filterData.experience === '0') {
                    $stateParams.exp = undefined;
                }
                 $stateParams.exp = $scope.exp;
            }

            $rootScope.loading = true;


            searchQuery.searchResults()
                .$promise.then(function() {

                    $rootScope.loading = false;

                    if ($stateParams.tasks !== undefined) {
                        $scope.tab = 2;
                        $scope.dropdownTwo = true;
                        $scope.dropdownOne = false;
                        filterData.experience = $stateParams.exp;
                    }
                    if ($stateParams.exp !== undefined) {
                        $scope.tab = 3;
                        $scope.dropdownOne = true;
                    }

                    $state.go("atsHome.search", {
                        tasks: $scope.setTasks,
                        exp: $scope.exp
                    });

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

            $state.go("atsHome.search", {
                page: currentPage
            });
        };

        searchQuery.currentResults()
            .$promise.then(function(data) {

                $scope.searchResults = data.data;

                $scope.$watch('currentPage + itemsPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                    $scope.searchResultsFiltered = $scope.searchResults.slice(begin, end);
                });

            }, function(reason) {
                console.log('Failed: ' + reason);
            });
    }
]);
