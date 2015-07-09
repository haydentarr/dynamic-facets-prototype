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
                if ($stateParams.tasks !== undefined) {
                    searchTerm = $stateParams.q +' AND '+ $stateParams.tasks.replace(/,/g, ' AND ');
                } else {
                    searchTerm = $stateParams.q;
                }
                currentResults = $resource('/ats', {
                    query: encodeURIComponent(searchTerm),
                    exp: $stateParams.exp 
                }).get();

                console.log(currentResults);

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
                url: 'search?q&tasks&exp&page',
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


})();