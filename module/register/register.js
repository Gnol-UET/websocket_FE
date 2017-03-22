//Nhớ thêm tên module vào app.js
angular.module('registerModule', ['ui.router',])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        // nested list with custom controller
            .state('register', { //Định nghĩa 1 state
                url: 'register',     //Khai báo URl hiển thị
                templateUrl: 'module/register/register.html', //Đường dẫn view
                controller: 'registerController'   //Khai báo Controller phụ vụ state này
            })


    });
