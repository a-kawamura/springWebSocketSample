/**
 * app.js for WebSocket sample
 */
 var stompClient = null;
 
 function setConnected(connected) {
     $("#connect").prop("disabled", connected);
     $("#disconnect").prop("disabled", !connected);
     if (connected) {
         $("#conversation").show();
     } else {
         $("conversation").hide();
     }
     $("#greetings").html("");
 }

 function connect() {
     let socket = new SockJS("/gs-guide-websocket");
     stompClient = Stomp.over(socket);
     stompClient.connect({}, function(frame) {
         setConnected(true);
         console.log("Connected: " + frame);
         stompClient.subscribe("/topic/greetings", function(greeting) {
             showGreeting(JSON.parse(greeting.body).content)
         });
     });
 }

 function disconnect() {
     if (stompClient != null) {
         stompClient.disconnect();
     }
     setConnected(false);
     console.log("Disconnected");
 }

 function sendName() {
     stompClient.send("/app/hello", {}, JSON.stringify({"name": $("#name").val()}));
 }

 function showGreeting(message) {
//     $("#greetings").append(`<tr><td>${message}</td></tr>`);
//       $("<td></td>").text(message).appendTo("<tr></tr>").appendTo("#greetings");
	let tr = $("<tr></tr>");
	$("<td></td>").text(message).appendTo(tr);
	tr.appendTo("#greetings");
 }

 $(function() {
     $("form").on("submit", function(e) {
         e.preventDefault();
     });

     $("#connect").click(function() {
         connect();
     });

     $("#disconnect").click(function() {
         disconnect();
     });

     $("#send").click(function() {
         sendName();
     });
 });