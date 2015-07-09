var tracking = angular.module('tracking');

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