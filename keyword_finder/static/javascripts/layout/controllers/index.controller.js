/**
 * IndexController
 * @namespace keyword_finder.layout.controllers
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.layout.controllers')
        .controller('IndexController', IndexController);

    /**
     * @namespace IndexController
     */
    function IndexController($scope, Authentication, Tasks, Snackbar, $timeout) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.tasks = [];

        if (vm.isAuthenticated) {
            activate();

            $scope.reload = function () {
                Tasks.all().then(tasksSuccessFn, tasksErrorFn);

                $timeout(function () {
                    $scope.reload();
                }, 5000)
            };
            $scope.reload();
        }

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated.
         * @memberOf keyword_finder.layout.controllers.IndexController
         */
        function activate() {
            Tasks.all().then(tasksSuccessFn, tasksErrorFn);

            $scope.$on('task.created', function () {
                Tasks.all().then(tasksSuccessFn, tasksErrorFn);
            });
        }

        /**
         * @name tasksSuccessFn
         * @desc Update tasks array in view.
         */
        function tasksSuccessFn(data, status, headers, config) {
            vm.tasks = data.data;
        }

        /**
         * @name tasksErrorFn
         * @desc Show snackbar with error.
         */
        function tasksErrorFn(data, status, headers, config) {
            Snackbar.error(data.error);
        }

    }
})();
