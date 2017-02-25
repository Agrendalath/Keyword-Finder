/**
 * NewTaskController
 * @namespace keyword_finder.tasks.controllers
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.tasks.controllers')
        .controller('NewTaskController', NewTaskController);

    NewTaskController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Tasks'];

    /**
     * @namespace NewTaskController
     */
    function NewTaskController($rootScope, $scope, Authentication, Snackbar, Tasks) {
        var vm = this;

        vm.submit = submit;

        /**
         * @name submit
         * @desc Create a new Task.
         * @memberOf keyword_finder.tasks.controllers.NewTaskController
         */
        function submit() {
            $scope.closeThisDialog();

            Tasks.create(vm.args).then(createTaskSuccessFn, createTaskErrorFn);

            /**
             * @name createTaskSuccessFn
             * @desc Show snackbar with success message.
             */
            function createTaskSuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('task.created');
                Snackbar.show('Task created successfully.');
            }

            /**
             * @name createTaskErrorFn
             * @desc Show snackbar with success message.
             */
            function createTaskErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();
