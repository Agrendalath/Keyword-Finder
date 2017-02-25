(function () {
    'use strict';

    angular
        .module('keyword_finder.tasks', [
            'keyword_finder.tasks.controllers',
            'keyword_finder.tasks.directives',
            'keyword_finder.tasks.services'
        ]);

    angular
        .module('keyword_finder.tasks.controllers', []);

    angular
        .module('keyword_finder.tasks.directives', ['ngDialog']);

    angular
        .module('keyword_finder.tasks.services', []);
})();
