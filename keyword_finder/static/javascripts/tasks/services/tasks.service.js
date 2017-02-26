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
            create: create,
            remove: remove
        };

        return Tasks;

        /**
         * @name all
         * @desc Get Tasks of logged user or all Tasks if logged user is admin.
         * @returns {Promise}
         * @memberOf keyword_finder.tasks.services.Tasks
         */
        function all() {
            console.debug("CALLED");
            var response = $http.get('/api/tasks/');
            if (response.status === 403) {
                Authentication.unauthenticate();
                return null;
            }
            return response;
        }

        /**
         * @name create
         * @desc Create a new Task.
         * @param {string} args The arguments of the new Task.
         * @returns {Promise}
         * @memberOf keyword_finder.tasks.services.Tasks
         */
        function create(keywords, site, is_regex) {
            return $http.post('/api/tasks/', {
                keywords: keywords,
                site: site,
                is_regex: is_regex
            });
        }

        /**
         * @name remove
         * @desc Delete Task.
         * @param {string} url Task's url.
         * @returns {Promise}
         * @memberOf keyword_finder.tasks.services.Tasks
         */
        function remove(url) {
            return $http.delete(url);
        }
    }
})();
