/**
 * Task
 * @namespace keyword_finder.tasks.directives
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.tasks.directives')
        .directive('task', task);

    /**
     * @namespace Task
     */
    function task() {
        /**
         * @name directive
         * @desc The directive to be returned.
         * @memberOf keyword_finder.tasks.directives.Task
         */
        var directive = {
            restrict: 'E',
            scope: {
                task: '='
            },
            templateUrl: '/static/templates/tasks/task.html'
        };

        return directive;
    }
})();
