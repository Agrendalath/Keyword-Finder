/**
 * LoginController
 * @namespace keyword_finder.authentication.controllers
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication'];

    /**
     * @namespace LoginController
     */
    function LoginController($location, $scope, Authentication) {
        var vm = this;

        vm.login = login;

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated.
         * @memberOf keyword_finder.authentication.controllers.LoginController
         */
        function activate() {
            // "I must be crazy, what are you doing here? Did you SWIM here?"
            if (Authentication.isAuthenticated())
                $location.url('/');
        }

        /**
         * @name login
         * @desc Log the user in.
         * @memberOf keyword_finder.authentication.controllers.LoginController
         */
        function login() {
            Authentication.login(vm.email, vm.password);
        }
    }
})();
