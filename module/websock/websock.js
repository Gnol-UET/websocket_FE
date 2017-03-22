//Nhớ thêm tên module vào app.js
angular.module('websockModule', ['ui.router',])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        // nested list with custom controller
            .state('websock', { //Định nghĩa 1 state
                url: 'websock',     //Khai báo URl hiển thị
                templateUrl: 'module/websock/websock.html', //Đường dẫn view: modules/about/about.html
                controller: 'websockController'   //Khai báo Controller phụ vụ state này
            })


    });
