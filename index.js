

function MinimizeFunction() {

    //alert("Hola");

    var x = document.getElementById('chat-list');
    var y = document.getElementById('chat');
    var z = document.getElementById('text-chat');
    var q = document.getElementById('user-name');
    if (x.style.visibility === 'hidden') {
        x.style.visibility = 'visible';
        z.style.visibility = 'visible';
        y.style.height = '300px';
        q.style.height = '7%';

    } else {
        x.style.visibility = 'hidden';
        x.style.height = '267px;';
        y.style.height = '0%';
        z.style.visibility = 'hidden';
        y.style.padding = '0% 0% 0% 0%;';
        q.style.height = '50%';

    }


}



function render(data) {
	var html = data.map(function(elem, index){
    	return(`<div>
        		 <strong>${elem.author}</strong>:
                 <em>${elem.text}</em>
        </div>`)
    }).join(" ");
    
    document.getElementById('chat-list').innerHTML = html;
}

socket.on('chat-list', function(data) {
	render(data);
});
