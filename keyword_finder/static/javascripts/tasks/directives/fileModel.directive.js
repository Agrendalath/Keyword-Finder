/**
 * FileModel
 * @namespace keyword_finder.tasks.directives
 */
(function () {
    'use strict';

    angular
        .module('keyword_finder.tasks.directives')
        .directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope, element[0].files[0]);
                        })
                    })
                }
            }
        }])
})();
