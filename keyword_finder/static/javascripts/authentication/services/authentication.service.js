/**
 * Authentication
 * @namespace keyword_finder.authentication.services
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', 'Snackbar'];

    /**
     * @namespace Authentication
     * @returns {Factory}
     */
    function Authentication($cookies, $http, Snackbar) {
        /**
         * @name Authentication
         * @desc The Factory to be returned.
         */
        var Authentication = {
            register: register,
            login: login,
            logout: logout,
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };

        return Authentication;

        /**
         * @name register
         * @desc Try to register a new user.
         * @param {string} email The email address entered by the user.
         * @param {string} password The password entered by the user.
         * @param {string} confirm_password Repeated password entered by the user.
         * @returns {Promise}
         * @memberOf keyword_finder.authentication.services.Authentication
         */
        function register(email, password, confirm_password) {
            return $http.post('/api/users/', {
                email: email,
                password: password,
                confirm_password: confirm_password
            }).then(registerSuccessFn, registerErrorFn);

            /**
             * @name registerSuccessFn
             * @desc Log the new user in.
             */
            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(email, password);
            }

            /**
             * @name registerErrorFn
             * @desc Show message 'Could not register.' to the user.
             */
            function registerErrorFn(data, status, headers, config) {
                Snackbar.show('Could not register.');

            }
        }

        /**
         * @name login
         * @desc Try to log in with entered email and password.
         * @param {string} email The email entered by the user.
         * @param {string} password The password entered by the user.
         * @return {Promise}
         * @memberOf keyword_finder.authentication.services.Authentication
         */
        function login(email, password) {
            return $http.post('/api/users/login/', {
                email: email,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            /**
             * @name loginSuccessFn
             * @desc Set the authenticated account and redirect to index.
             */
            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);

                window.location = '/';
            }

            /**
             * @name loginErrorFn
             * @desc Show message 'You shall not pass!' to the user.
             */
            function loginErrorFn(data, status, headers, config) {
                Snackbar.show('You shall not pass!');
            }
        }

        /**
         * @name logout
         * @desc Try to log the user out.
         * @returns {Promise}
         * @memberOf keyword_finder.authentication.services.Authentication
         */
        function logout() {
            return $http.post('/api/users/logout/')
                .then(logoutSuccessFn, logoutErrorFn);

            /**
             * @name logoutSuccessFn
             * @desc Set the authenticated account and redirect to index.
             */
            function logoutSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();

                window.location = '/';
            }

            /**
             * @name logoutErrorFn
             * @desc Show message 'Failed to log out.' to the user.
             */
            function logoutErrorFn(data, status, headers, config) {
                console.error('Failed to log out.');
            }
        }

        /**
         * @name getAuthenticatedAccount
         * @desc Return the currently authenticated account.
         * @returns {object|undefined} Account if authenticated, else 'undefined'.
         * @memberOf keyword_finder.authentication.services.Authentication
         */
        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount)
                return;

            return JSON.parse($cookies.authenticatedAccount);
        }

        /**
         * @name isAuthenticated
         * @desc Check if the current user is authenticated.
         * @returns {boolean} True if user is authenticated, else false.
         * @memberOf keyword_finder.authentication.services.Authentication
         */
        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        /**
         * @name setAuthenticatedAccount
         * @desc Stringify the account object and store it in a cookie.
         * @param {Object} user The user object to be stored.
         * @returns {undefined}
         * @memberOf keyword_finder.authentication.services.Authentication
         */
        function setAuthenticatedAccount(user) {
            $cookies.authenticatedAccount = JSON.stringify(user);
        }

        /**
         * @name unauthenticate
         * @desc Delete the cookie where the user object is stored.
         * @returns {undefined}
         * @memberOf keyword_finder.authentication.services.Authentication
         */
        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }
    }
})();
