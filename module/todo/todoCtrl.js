angular.module('todoModule')
    .controller('todoController', function ($scope, $state, authenService) {

        if (sessionStorage.getItem("currentUser") != null) {
            var accessible = false;
            var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            accessible = authenService.accessible(currentUser.username, currentUser.password);


            if (accessible == false) {
                sessionStorage.removeItem("currentUser");
                alert("Thông tin current user  SAI LỆCH local storage\n Đăng nhập lại")
                $state.go("login");

            }
            else {

                //Được phép vào state todo vì đăng nhập hợp lệ
                currentUsername = JSON.parse(sessionStorage.getItem("currentUser")).username;
                $scope.hello = "Xin chào, "+ currentUsername; //Xử lý logic ở đây
                if (sessionStorage.getItem(currentUsername +"todo") == null) {
                    $scope.listTodo = [];
                    sessionStorage.setItem(currentUsername +"todo", JSON.stringify($scope.listTodo));
                }
                else {
                    $scope.listTodo = JSON.parse(sessionStorage.getItem(currentUsername +"todo"));
                    console.log(JSON.parse(sessionStorage.getItem(currentUsername +"todo")));

                }
                $scope.status = "ALL";
                $scope.readonly = true;
                $scope.allChecked = false;
                $scope.newtodo = "";

                // add new todo
                $scope.addTodo = function () {
                    var newtodo = {
                        title: $scope.newtodo.trim(),
                        completed: false
                    };
                    if (!$scope.newtodo) alert("you must enter a string!");
                    else if ($scope.newtodo == "") alert("you must enter...");
                    else {
                        $scope.listTodo.push(newtodo);
                    }
                    sessionStorage.setItem(currentUsername +"todo", JSON.stringify($scope.listTodo));

                };

//remove Todo
                $scope.removeTodo = function (todo) {
                    $scope.listTodo.splice($scope.listTodo.indexOf(todo), 1);
                    sessionStorage.setItem(currentUsername +"todo", JSON.stringify($scope.listTodo));

                };

// mark all checked
                $scope.markAllchecked = function () {
                    for (var i = 0; i < $scope.listTodo.length; i++) {
                        $scope.listTodo[i].completed = $scope.allChecked;
                    }
                };

                $scope.filterCompleted = function (todo) {
                    switch ($scope.status) {
                        case "ALL":
                            return todo;
                            break;
                        case "ACTIVE":
                            return !todo.completed;
                            break;
                        case "COMPLETED":
                            return todo.completed;
                            break;
                    }
                };

                $scope.editTodo = function () {
                    $scope.readonly = false;
                };

                $scope.doneEditTodo = function () {
                    $scope.readonly = true;
                };
                $scope.markATask = function (todo) {
                    //do it
                    $scope.listTodo = JSON.parse(sessionStorage.getItem(currentUsername +"todo"));
                    console.log($scope.listTodo);
                    for (var i = 0; i < $scope.listTodo.length; i++) {
                        if($scope.listTodo[i].title == todo.title){
                            if($scope.listTodo[i].completed == false){
                                $scope.listTodo[i].completed = true;
                                break;
                            }
                            if($scope.listTodo[i].completed == true){
                                $scope.listTodo[i].completed = false;
                                break;
                            }
                            break;
                        }
                    }
                    sessionStorage.setItem(currentUsername +"todo", JSON.stringify($scope.listTodo));

                };

                // $scope.$watch('todos', function () {
                //     $scope.counts = todos.filter(function (todo) {
                //         return todo.completed === false;
                //     }).length;
                // }, true)

            }
        }
        if (sessionStorage.getItem("currentUser") == null) {
            alert("Chức năng yêu cầu đăng nhập");
            $state.go("login");
        }
        $scope.logOut = function () {
            sessionStorage.removeItem("currentUser");
            alert("Mời đăng nhập lại");
            $state.go("login");
        }

    });