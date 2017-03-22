//Nhớ thêm tên service vào controller
angular.module('app')
    .service('authenService', function () {
        var service = {
            cong2so : cc,
            accessible : checkAccessible
        };
        return service;

        function cc(a, b) {
            return a + b;
        }
        function checkAccessible(username, password) {
            var accessible = false;
            // sessionStorage.getItem(username) == pa
            for (var i = 0; i < sessionStorage.length; i++) {
                if(username == sessionStorage.key(i)){
                    localAcc = JSON.parse(sessionStorage.getItem(username));
                    if(password == localAcc.password){
                        accessible=true;
                        break;
                    }
                }
            }
            return accessible


        }
    });