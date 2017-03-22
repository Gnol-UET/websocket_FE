angular.module('registerModule')
    .controller('registerController', function ($scope, $state) {
        $scope.hello = 'Hello'; //Xử lý logic ở đây
        $scope.registeringUser = {
            username: "",
            password: ""
        };
        $scope.register = function(){
            var available = true;
            for (var i = 0; i < sessionStorage.length; i++) {
                if(sessionStorage.key(i) == $scope.registeringUser.username){
                    alert("Tên đăng nhập đã tồn tại");
                    available = false;
                    break;
                }
            }
            if(available  == true){
                sessionStorage.setItem($scope.registeringUser.username, JSON.stringify($scope.registeringUser));
                sessionStorage.setItem("currentUser", JSON.stringify($scope.registeringUser));
                alert("Đăng ký thành công");
                $state.go("todo");
            }

        }
    });