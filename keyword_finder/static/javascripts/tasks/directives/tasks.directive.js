/**
 * Tasks
 * @namespace keyword_finder.tasks.directives
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.tasks.directives')
        .directive('tasks', tasks);

    /**
     * @namespace Tasks
     */
    function tasks() {
        /**
         * @name directive
         * @desc The directive to be returned.
         * @memberOf keyword_finder.tasks.directives.Tasks
         */
        var directive = {
            controller: 'TasksController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                tasks: '='
            },
            templateUrl: '/static/templates/tasks/tasks.html'
        };

        return directive;
    }
})();
