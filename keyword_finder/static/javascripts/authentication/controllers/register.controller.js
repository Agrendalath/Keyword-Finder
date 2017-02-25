/**
 * Register controller
 * @namespace keyword_finder.authentication.controllers
 */

(function () {
    'use strict';

    angular
        .module('keyword_finder.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication'];

    /**
     * @namespace RegisterController
     */
    function RegisterController($location, $scope, Authentication) {
        var vm = this;

        vm.register = register;

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
         * @name register
         * @desc Register a new user.
         * @memberOf keyword_finder.authentication.controllers.RegisterController
         */
        function register() {
            Authentication.register(vm.email, vm.password, vm.confirm_password);
        }
    }
})();
