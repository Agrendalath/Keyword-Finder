/**
 * NewTaskController
 * @namespace keyword_finder.tasks.controllers
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.tasks.controllers')
        .controller('NewTaskController', NewTaskController);

    NewTaskController.$inject = ['$rootScope', '$scope', 'Snackbar', 'Tasks'];

    /**
     * @namespace NewTaskController
     */
    function NewTaskController($rootScope, $scope, Snackbar, Tasks) {
        var vm = this;
        var regexp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/;

        vm.submit = submit;

        /**
         * @name submit
         * @desc Create a new Task.
         * @memberOf keyword_finder.tasks.controllers.NewTaskController
         */
        function submit() {
            $scope.closeThisDialog();

            var fr = new FileReader();

            fr.onload = function () {
                var content = fr.result;
                var urls = content.split('\n');
                vm.is_regex = !!vm.is_regex;

                for (var i = 0; i < urls.length; ++i) {
                    console.debug(vm.keywords + ' ' + urls[i] + ' ' + vm.is_regex);
                    console.debug(regexp.test(urls[i]));
                    if (regexp.test(urls[i]))
                        Tasks.create(vm.keywords, urls[i], vm.is_regex);
                }
                createTaskSuccessFn();
            };

            fr.readAsText(vm.sites, "UTF-8");


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
