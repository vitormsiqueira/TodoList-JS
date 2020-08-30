var addTodo = function(){
    var todo = document.getElementById('todo').value; 
    var todos = getTodos(); 
    if(todo){ 
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        document.getElementById('todo').value = '';
    }
    document.location.reload(true);
}
var getTodos = function(){
    var todos = []; 
    var todos_string = localStorage.getItem('todos');
    if(todos_string != null){ 
        return JSON.parse(todos_string);
    }
}
var showTodos = function(){
    var todos = getTodos();
    var html = '<ul>';
    todos.forEach(function(content, index){
        html += '<div class="container-blur"> <li> <label class="container"><input type="checkbox"> <span class="checkmark"></span> </label>' + content + '<button class="remove" id="'+ index +'"><i class="ic-delete"></i></button></li></div>'; 
    });
    html += '</ul>'; 
    document.getElementById('todos').innerHTML = html; 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++){ 
        buttons[i].addEventListener('click', removeTodo);
    };
}
var removeTodo = function(){
    var id = this.getAttribute('id');
    var todos = getTodos(); 
    todos.splice(id, 1);
    localStorage.setItem('todos', JSON.stringify(todos)); 
    document.location.reload(true);
}
var hasTodo = function(){ 
    var todos = getTodos();
    if(todos == ''){
        text = '<h2>Não há tarefas cadastradas!</h2>';
        document.getElementById('msg').innerHTML = text;
    } else {
        text = '<h2>Tarefas pendentes:</h2>';
        document.getElementById('msg').innerHTML = text;
    }
}
document.getElementById('add').addEventListener('click', addTodo);
window.addEventListener('keydown', function(event){ 
    if(event.keyCode == 13){
        addTodo();
    };
}); 
hasTodo(); 
showTodos(); 