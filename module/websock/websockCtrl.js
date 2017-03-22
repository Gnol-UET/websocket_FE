
angular.module('websockModule')
    .controller('websockController', function ($scope) {
        $scope.hello = 'ab'; //Xử lý logic ở đây
        $scope.sent = [];
        $scope.received = [] ;
        $scope.stompClient = null;

        $scope.setConnected = function(connected) {
            // $("#connect").prop("disabled", connected);
            // $("#disconnect").prop("disabled", !connected);
            // if (connected) {
            //     $("#conversation").show();
            // }
            // else {
            //     $("#conversation").hide();
            // }
            // $("#greetings").html("");
        };

        $scope.connect = function () {
            //Sock cài ở địa chỉ TUYỆT ĐỐI: phải thêm http
            //Tất cả còn lại là địa chỉ tương đối
            var socket = new SockJS('http://192.168.1.105:8080/gs-guide-websocket');
            $scope.stompClient = Stomp.over(socket);
            $scope.stompClient.connect({}, function (frame) {
                $scope.setConnected(true);
                console.log('Connected: ' + frame);
                $scope.stompClient.subscribe('/topic/greetings', function (greeting) {
                    $scope.showGreeting(JSON.parse(greeting.body).content);
                });
            });
        };

        function disconnect() {
            if ($scope.stompClient != null) {
                $scope.stompClient.disconnect();
            }
            $scope.setConnected(false);
            console.log("Disconnected");
        }

        $scope.sendName = function () {
            $scope.stompClient.send("/hello", {}, JSON.stringify({'name': $scope.hello}));
            $scope.sent.push($scope.hello)

        };

        $scope.showGreeting =function (message) {
            if(message != $scope.sent[$scope.sent.length -1]){

                $scope.received.push(message);
                $scope.$apply();
            }
        }

    });