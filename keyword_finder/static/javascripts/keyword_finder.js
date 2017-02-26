(function () {
    'use strict';

    angular
        .module('keyword_finder', [
            'keyword_finder.config',
            'keyword_finder.routes',
            'keyword_finder.authentication',
            'keyword_finder.layout',
            'keyword_finder.tasks',
            'keyword_finder.utils'
        ]);

    angular
        .module('keyword_finder.config', ['angular-jwt', 'angular-storage']);

    angular
        .module('keyword_finder.routes', ['ngRoute']);

    angular
        .module('keyword_finder')
        .run(run);

    run.$inject = ['$http'];
    //
    /**
     * @name run
     * @desc Update xsrf $http headers to align with Django's defaults.
     */
    function run($http) {
        // $http.defaults.xsrfCookieName = 'csrftoken';
        // $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        if (window.sessionStorage.getItem('token'))
            $http.defaults.headers.common['Authorization'] = 'JWT ' + window.sessionStorage.getItem('token');
    }
})();
