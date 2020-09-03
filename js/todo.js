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
    } else {
        return todos;
    }
}

var getCompleteTodos = function () {
    var complete_todos = []; 
    var complete_todos_string = localStorage.getItem('complete-todos');
    if(complete_todos_string != null){ 
        return JSON.parse(complete_todos_string);
    } else {
        return complete_todos;
    }
}

var showTodos = function(){
    var todos = getTodos();
    var html = '<ul>';
    todos.forEach(function(content, index){
        html += '<div class="container-blur"> <li> <label class="container"><input type="checkbox" class="marked" name="checkBoxMarked" onClick="checkBoxMarked(this)"> <span class="checkmark"></span> </label>' + content + '<button class="remove" id="'+ index +'"><i class="ic-delete"></i></button></li></div>'; 
    });
    html += '</ul>'; 
    document.getElementById('todos').innerHTML = html; 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++){ 
        buttons[i].addEventListener('click', removeTodo);
    };
}

var showCompleteTodos = function () {
    var complete_todos = getCompleteTodos();
    var html = '<ul>';
    complete_todos.forEach(function(content, index){
        html += '<div class="container-blur"> <li> <label class="container"><input type="checkbox" name="checkBoxMarked" onClick="checkBoxMarked(this)"> <span class="checkmark"></span> </label>' + content + '<button class="remove2" id="'+ index +'"><i class="ic-delete"></i></button></li></div>'; 
    });
    html += '</ul>'; 
    document.getElementById('complete-todos').innerHTML = html; 
    var buttons = document.getElementsByClassName('remove2');
    for (var i=0; i < buttons.length; i++){ 
        buttons[i].addEventListener('click', removeCompleteTodo);
    };
}

var removeTodo = function(){
    var id = this.getAttribute('id');
    var todos = getTodos(); 
    todos.splice(id, 1);
    localStorage.setItem('todos', JSON.stringify(todos)); 
    document.location.reload(true);
}

var removeCompleteTodo = function(){
    var id = this.getAttribute('id');
    var complete_todos = getCompleteTodos(); 
    complete_todos.splice(id, 1);
    localStorage.setItem('complete-todos', JSON.stringify(complete_todos)); 
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

var hasCompleteTodo = function() {
    var complete_todos = getCompleteTodos();
    if(complete_todos == ''){
       
    } else {
        text = '<h2>Tarefas concluídas:</h2>';
        document.getElementById('msg2').innerHTML = text;
    }
}

var checkBoxMarked = function(checkbox){

    //var var_check = document.getElementsByName('mycheck');

    if (checkbox.checked)
    {
        alert("Tarefa marcada como concluída");
        var buttons = document.getElementsByClassName('remove');
        for (var i=0; i < buttons.length; i++){ 
            console.log(buttons);
            buttons[i].addEventListener('marked', removeTodo);
        };
    } else {
        alert("Tarefa marcada para fazer");
    }

    //alert("Tarefa marcada como concluida"); 
  }

document.getElementById('add').addEventListener('click', addTodo);
window.addEventListener('keydown', function(event){ 
    if(event.keyCode == 13){
        addTodo();
    };
}); 

hasTodo(); 
showTodos(); 
hasCompleteTodo();
showCompleteTodos();