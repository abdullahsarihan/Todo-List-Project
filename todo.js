// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const fiter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tüm event Listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    secondCardBody.addEventListener("click",deleteTodo)
    fiter.addEventListener("keyup",filtertodos)
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")) {
        // Arayüzden todoları temizleme
        // todoList.innerHTML = ""; // Yavaş
        while(todoList.firstElementChild !=null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");

    }
    
}
function filtertodos(e){
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filtervalue) === -1){
            // Bulamadı
            
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }

    });


}

function loadAllTodosUI ()  {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);

    })
        
}
function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);     
        showAlert("success","Todo başarıyla silindi...");
    }

}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
8
    todos.forEach(function(todo, index){
        if (todo === deletetodo){
             todos.splice(index,1); // Arraydan değeri silebiliriz.
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}


function addTodo(e){
    const newTodo = todoInput.value.trim();

    if(newTodo === "") {

        /* <div class="alert alert-danger" role="alert">
                        This is a danger alert—check it out!
                      </div> */

        showAlert("danger","Lütfen bir todo girin...");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...");
    }
    


    e.preventDefault();
}
function getTodosFromStorage(){ // Storagedan Todoları Alma
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }    
    else {
        todos = JSON.parse(localStorage.getItem("todos")); //localstorage a string olarak yazıldığı için JSON.parse ile array e çeviriyoruz.
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alert = document.createElement("div")

    alert.className = ` alert alert-${type} `;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeout 

    setTimeout(function(){
        alert.remove();
    },1000);

}
function addTodoToUI(newTodo){ // String değerini list item olarak UI'ya ekleyecek.

    /* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */
    // List Item Oluşturma
    const listItem = document.createElement("li");
    // Link Oluşturma
    const link = document.createElement("a");
    link.href = "#"
    link.className = "delete-item"
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between"

    //Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo List'e List Item'ı ekleme
    
    todoList.appendChild(listItem);
    todoInput.value = ""; // Ekledikten sonra içini boşaltma
}


