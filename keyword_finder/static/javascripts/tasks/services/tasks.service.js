/**
 * Tasks
 * @namespace keyword_finder.tasks.services
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.tasks.services')
        .factory('Tasks', Tasks);

    Tasks.$inject = ['$http'];

    /**
     * @namespace Tasks
     * @returns {Factory}
     */
    function Tasks($http) {
        var Tasks = {
            all: all,
            create: create
        };

        return Tasks;

        /**
         * @name all
         * @desc Get Tasks of logged user or all Tasks if logged user is admin.
         * @returns {Promise}
         * @memberOf keyword_finder.tasks.services.Tasks
         */
        function all() {
            return $http.get('/api/tasks/');
        }

        /**
         * @name create
         * @desc Create a new Task.
         * @param {string} args The arguments of the new Task.
         * @returns {Promise}
         * @memberOf keyword_finder.tasks.services.Tasks
         */
        function create(args) {
            return $http.post('/api/tasks/', {
                arguments: args
            });
        }
    }
})();
