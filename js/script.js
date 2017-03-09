//to do list tuorial from https://code-maven.com/todo-in-html-and-javascript

$(function() { //jquery ready func
    console.log("ready!");

    function get_todos() {
        var todos = new Array
        var todos_str = localStorage.getItem('todo')
        if (todos_str !== null) { //if the list has items saved in the local storage 
            todos = JSON.parse(todos_str) //display the content by first converting it from JSON
        }
        return todos //else show empty array
    }

    function add() {
        var task = document.getElementById('task').value //takes the value inserted in the input tag by the user
        var todos = get_todos() //calls the func above of get_todos. The first time this runs the array will be empty

        if (task === '') { //if else statement: this makes sure that a string is inserted before adding the task to the list 
            alert("Insert a task!") //tell the user to type something 
        } else {
            todos.push(task) //append new task to the end of array todos
            localStorage.setItem('todo', JSON.stringify(todos)) //localStorage saves data in the browser. Adds item 'todo' as a JSON value
            document.getElementById('task').value = " "
            show() //calls func show to display the updated list 

        }
    }

    function remove() {
        var id = this.getAttribute('id') //targets the current DOM-obj which the user cicks on 
        var todos = get_todos()
        todos.splice(id, 1) //removes with 'splice' the current item from the list
        localStorage.setItem('todo', JSON.stringify(todos))
        show() //shows the updated list to the user 
            //return false //stops the ability of doing something when btn is clicked 
    }

    function edit() {
        var id = this.getAttribute('id') //gets id of button pressed 
        document.getElementById(id).removeAttribute("disabled")
    }

    function show() {
        var todos = get_todos() //array of tasks
        var html = '<ul>'

        for (var i = 0; i < todos.length; i++) {
            // html += '<li>' + todos[i] + '<a class="waves-effect waves-light btn" id="' + i  + '"><i class="material-icons">done</i></a>';
            html += '<li><input type="text" id="i" disabled value=' + todos[i] + '><button class="remove" id="' + i + '">Remove</button><button class="edit" id="' + i + '">Edit</button></li>'
        };
        html += '</ul>'

        document.getElementById('todos').innerHTML = html

        var buttonR = document.getElementsByClassName('remove') //targets the button that needs to run the remove func when clicked
        for (var i = 0; i < buttonR.length; i++) {
            buttonR[i].addEventListener('click', remove) //adds an event listener to the button - when the button is clicked, remove the <li> 
        }

        var buttonE = document.getElementsByClassName('edit') //targets edit button so that it can run the edit func when clicked 
        for (var i = 0; i < buttonE; i++) {
            buttonE[i].addEventListener('click', edit) //run func edit when click happens 
        }

    }

    document.getElementById('add').addEventListener('click', add)
    show()

    $(document).keypress(function(enter) { //allows user to enter task by pressing 'enter' on keyboard
        if (enter.which == 13) { //once enter is pressed add the task and show it 
            add()
            show()
        }
    })

})
