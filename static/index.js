
let todos = [];


// reqListener is called when the XMLHttpRequest
// to the server is complete
function reqListener () {

	// Add the todo to our array of todos
	todos = todos.concat(this.response);

	// Add the chats to the DOM
	let ulElement = document.querySelector('ul');
	this.response.forEach((todos) => {
		var newli = document.createElement("li");
		newli.appendChild(document.createTextNode(todos.body));
		ulElement.appendChild(newli);
	});
}



// requestChats requests the latest chats from
// the server.
function requestChats(){
	var oReq = new XMLHttpRequest();
	if(chats.length > 0){
		maxID = chats[chats.length-1].rowid;
	}else{
		maxID = 0;
	}
	oReq.open("GET", "/api/chats?latest=" + maxID)
	oReq.responseType = 'json';
	oReq.addEventListener("load", reqListener);
	oReq.send();
}

// Run requestChats every 2s
setInterval(requestChats, 2000);


// Grab the value that is in the text box and send it to the server
function sendChatToServer(){
	const textBox = document.querySelector('input[type=text]');
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "/api/chats");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify({ body: textBox.value }));
	textBox.value = '';
}

document.addEventListener("DOMContentLoaded", function() {
	const submitButton = document.querySelector('input[type=submit]');
	submitButton.addEventListener('click', (event) => {
		// Stop the default action, which is to submit the form
		// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
		event.preventDefault();
		sendChatToServer();
	});
});
