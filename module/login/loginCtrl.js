angular.module('loginModule')
    .controller('loginController', function ($scope,authenService, $state) {
        $scope.user= {
            username:"",
            password:""
        };
        if(sessionStorage.getItem("currentUser") != null){
            var accessible = false;
            var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            accessible = authenService.accessible(currentUser.username, currentUser.password);

            if(accessible == true){
                alert("Current user KHỚP Local Storage");
                $state.go("todo");
            }
            if(accessible == false){
                sessionStorage.removeItem("currentUser");
                alert("Thông tin current user  SAI LỆCH local storage\n Đăng nhập lại")
            }



        }

        if(sessionStorage.getItem("currentUser") == null){
            $scope.submit = function () {
                var accessible = false;
                currentUser = {
                    username:$scope.user.username,
                    password:$scope.user.password
                };
                accessible = authenService.accessible(currentUser.username, currentUser.password);



                if(accessible == true){
                    sessionStorage.setItem("currentUser",  JSON.stringify(currentUser));
                    alert("Đăng nhập thành công");
                    $state.go('todo');
                }
                else{
                    alert("Sai tên đăng nhập hoặc mật khẩu");
                }
            };
        }


        $scope.plusMe = function () {
            $scope.result = authenService.cong2so($scope.so1,$scope.so2);
        }
    });