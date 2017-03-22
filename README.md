# Websocket Frontend
### Framework - Project: AngularJS with Java Spring Boot server
##### For Backend please link to [Backend](https://github.com/Gnol-UET/websocket_be).
##### For AngularJS please link to [bikipangular](https://github.com/Gnol-UET/bikipangular).

### *Một stompClient phải có đủ ít nhất 3 phương thức: connect, subscribe, send*

> Connect viết trong websockCtrl.js
```
$scope.connect = function () {
            //Sock cài ở địa chỉ TUYỆT ĐỐI: phải thêm http
            //Tất cả còn lại là địa chỉ tương đối
            var socket = new SockJS('http://192.168.1.105:8080/gs-guide-websocket');
            $scope.stompClient = Stomp.over(socket);
            $scope.stompClient.connect({}, function (frame) {
                ...
            });
        };
```

`vả socket = newSockJS('http://...')`: tạo một socket với địa chỉ là **endpoint** của StompEndpoint trong backend 

`Stomp.over(socket)`: trao đổi tin nhắn trên socket này 

`$scope.stompClient.subscribe("kênh quảng bá")`: khi connect thành công thì subscribe kênh này ('/topic/greetings')

> Stomp là một giao thức Simple text orienteated mesaging protocol  
> Socket là nơi expose đường truyền   
> Socket có nhiều kênh (endpoint) trên nó   
> stompClient vận chuyển tin nhắn ở một trong những kênh này    

#
#

> Subscribe viết trong Connect
```
...
      $scope.stompClient.subscribe('/topic/greetings', function (greeting) {
          $scope.showGreeting(JSON.parse(greeting.body).content);
      });
...

$scope.showGreeting =function (message) {
            if(message != $scope.sent[$scope.sent.length -1]){

                $scope.received.push(message);
                $scope.$apply();
            }
        }

```
Mỗi khi một client khác gửi tin nhắn trên kênh này sẽ được quảng bá cho mọi người subscribe, trong subscribe gọi hàm `showGreeting` để hiển thị tin nhắn lên màn hình
`$scope.$apply()` để tự cập nhật tin nhắn trong $scope.received. Bởi vì tin nhắn này không phải được tạo ra bởi client mình điều khiển, mà nhận được từ client khác nên tin nhắn không tự cập nhật lên màn hình 
*Mọi người nên tìm hiểu $scope.$apply() ở tài liệu khác để hiểu rõ hơn* 

#
#

> Send
```
$scope.sendName = function () {
            $scope.stompClient.send("/hello", {}, JSON.stringify({'name': $scope.hello}));
            ...

        };
```        

