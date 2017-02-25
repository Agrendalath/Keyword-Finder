(function () {
    'use strict';

    angular
        .module('keyword_finder.authentication', [
            'keyword_finder.authentication.controllers',
            'keyword_finder.authentication.services'
        ]);

    angular
        .module('keyword_finder.authentication.controllers', []);

    angular
        .module('keyword_finder.authentication.services', ['ngCookies']);
})();
