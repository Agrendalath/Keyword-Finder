/**
 * TasksController
 * @namespace keyword_finder.tasks.controllers
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.tasks.controllers')
        .controller('TasksController', TasksController);

    TasksController.$inject = ['$scope'];

    /**
     * @namespace TasksController
     */
    function TasksController($scope) {
        var vm = this;

        vm.columns = [];

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated.
         * @memberOf keyword_finder.tasks.controllers.TasksController
         */
        function activate() {
            $scope.$watchCollection(function () {
                return $scope.tasks;
            }, render);
            $scope.$watch(function () {
                return $(window).width();
            }, render);
        }

        /**
         * @name calculateNumberOfColumns
         * @desc Calculate number of columns based on screen width.
         * @returns {Number} The number of columns containing Tasks
         * @memberOf keyword_finder.tasks.controllers.TasksController
         */
        function calculateNumberOfColumns() {
            if ($scope.tasks.count === 0)
                return 0;

            var width = $(window).width();

            if (width >= 1200)
                return 4;
            if (width >= 992)
                return 3;
            if (width >= 768)
                return 2;
            return 1;
        }

        /**
         * @name approximateShortestColumn
         * @desc An algorithm for approximating which column is the shortest.
         * @returns {Number} The index of the shortest column
         * @memberOf keyword_finder.tasks.controllers.TasksController
         */
        function approximateShortestColumn() {
            var scores = vm.columns.map(columnMapFn);

            return scores.indexOf(Math.min.apply(this, scores));

            /**
             * @name columnMapFn
             * @desc A map function for scoring column heights.
             * @returns {Number} The approximately normalized height of a given column
             */
            function columnMapFn(column) {
                var lengths = column.map(function (element) {
                    return element.created_at.length;
                });

                return lengths.reduce(sum, 0) * column.length;
            }

            /**
             * @name sum
             * @desc Sums two numbers.
             * @param {Number} x The first number to be summed
             * @param {Number} y The second number to be summed
             * @returns {Number} The sum of two numbers
             */
            function sum(x, y) {
                return x + y;
            }
        }

        /**
         * @name render
         * @desc Renders Tasks into columns of approximately equal height.
         * @param {Array} current The current value of 'vm.tasks'
         * @param {Array} original The value of 'vm.tasks' before it was updated
         * @memberOf keyword_finder.tasks.controllers.TasksController
         */
        function render(current, original) {
            if (current !== original && current.results) {
                vm.columns = [];

                for (var i = 0; i < calculateNumberOfColumns(); ++i)
                    vm.columns.push([]);

                for (i = 0; i < current.count; ++i) {
                    var column = approximateShortestColumn();

                    var notFound = current.results[i].keywords;
                    var found = current.results[i].results.split(', ');


                    for (var j = 0; j < found.length; ++j)
                        notFound = notFound.replace(found[j], '');

                    notFound = notFound.replace(/^[_]+|[_]+$/g, '').replace(/[_]+/g, ', ');

                    current.results[i].keywords = notFound;

                    vm.columns[column].push(current.results[i]);
                }
            }
        }
    }
})();
