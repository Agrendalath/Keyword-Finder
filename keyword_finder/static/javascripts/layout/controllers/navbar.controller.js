/**
 * NavbarController
 * @namespace keyword_finder.layout.controllers
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];

    /**
     * @namespace NavbarController
     */
    function NavbarController($scope, Authentication) {
        var vm = this;

        vm.logout = logout;
        vm.logged = Authentication.isAuthenticated();

        /**
         * @name logout
         * @desc Log the user out.
         * @memberOf keyword_finder.layout.controllers.NavbarController
         */
        function logout() {
            Authentication.logout();
        }
    }
})();
