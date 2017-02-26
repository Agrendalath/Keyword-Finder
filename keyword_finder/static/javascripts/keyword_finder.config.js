(function () {
    'use strict';

    angular
        .module('keyword_finder.config')
        .config(config);

    config.$inject = ['$locationProvider', '$httpProvider', 'jwtOptionsProvider'];

    /**
     * @name config
     * @desc Enable HTML5 routing.
     */
    function config($locationProvider, $httpProvider, jwtOptionsProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        jwtOptionsProvider.tokenGetter = function (store) {
            return window.sessionStorage.getItem('token');
        };

        $httpProvider.interceptors.push('jwtInterceptor');
    }
})();
