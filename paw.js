// const input = document.getElementById("input");
// const btn = document.getElementById("btn");
// const list = document.getElementById("list");



// document.addEventListener('DOMContentLoaded', function () {
//     const storedData = JSON.parse(localStorage.getItem("storeData")) || [];
//     storedData.forEach(function (item) {
//       const element = document.createElement("li");
//       const text = document.createTextNode(item);
//       const spn = document.createElement("span");
//       const btn1M = document.createElement("button");
//       const btn2S = document.createElement("button");
     
//       btn1M.innerHTML = "edit";
//       btn2S.innerHTML = "remouve";
//       spn.appendChild(text);
//       spn.appendChild(btn1M);
//       spn.appendChild(btn2S);
//       element.appendChild(spn);
//       list.appendChild(element);
//     });
//   });


 
// btn.addEventListener('click',function(){

// const element = document.createElement("li");
// const text = document.createTextNode(input.value);
// const spn = document.createElement("span");
// const btn1M = document.createElement("button");
// const btn2S = document.createElement("button");


// btn1M.innerHTML = "edit";
// btn2S.innerHTML = "remouve";
// spn.appendChild(text);
// spn.appendChild(btn1M);
// spn.appendChild(btn2S);
// element.appendChild(spn);
// list.appendChild(element);


// const storeData = JSON.parse(localStorage.getItem("storeData") || "[]");
// storeData.push(input.value);
// localStorage.setItem("storeData",JSON.stringify(storeData));



// }
// );



        // const input = document.getElementById("input");
        // const btn = document.getElementById("btn");
        // const list = document.getElementById("list");

        // document.addEventListener('DOMContentLoaded', function () {
        //     const storedData = JSON.parse(localStorage.getItem("storeData")) || [];
        //     storedData.forEach(function (item) {
        //         createTask(item);
        //     });
        // });

        // function createTask(taskText) {
        //     const element = document.createElement("li");
        //     const spn = document.createElement("span");
        //     const btn1M = document.createElement("button");
        //     const btn2S = document.createElement("button");

        //     btn1M.innerHTML = "edit";
        //     btn2S.innerHTML = "remove";
        //     spn.textContent = taskText;

        //     element.appendChild(spn);
        //     element.appendChild(btn1M);
        //     element.appendChild(btn2S);
        //     list.appendChild(element);
        // }

        // list.addEventListener('click', function(event) {
        //   // is commonly used with event delegation, where you attach a single event listener to a parent element, 
        //   // and then use event.target inside the event listener to determine which child element triggered the event.
        //     if (event.target.tagName === 'BUTTON') {
        //         const listItem = event.target.closest('li');
        //         const buttonText = event.target.innerHTML.toLowerCase();

        //         if (buttonText === 'edit') {
        //             const taskTextElement = listItem.querySelector('span');
        //             const editInput = document.createElement('input');
        //             editInput.type = 'text';
        //             editInput.value = taskTextElement.textContent;

        //             // Replace the task text with the input field
        //             taskTextElement.replaceWith(editInput);

        //             // Focus on the input field
        //             editInput.focus();

        //             // Update the task when Enter key is pressed
        //             editInput.addEventListener('keyup', function(event) {
        //                 if (event.key === 'Enter') {
        //                     taskTextElement.textContent = editInput.value;
        //                     listItem.removeChild(editInput);
        //                     updateLocalStorage();
        //                 }
        //             });
        //         } else if (buttonText === 'remove') {
        //             listItem.remove();
        //             updateLocalStorage();
        //         }
        //     }
        // });

        // btn.addEventListener('click', function() {
        //     const taskText = input.value.trim();
        //     if (taskText !== '') {
        //         createTask(taskText);
        //         updateLocalStorage();
        //         input.value = ''; // Clear the input field
        //     }
        // });

        // function updateLocalStorage() {
        //     const tasks = [];
        //     const taskElements = document.querySelectorAll('li span');
        //     taskElements.forEach(function(taskElement) {
        //         tasks.push(taskElement.textContent);
        //     });
        //     localStorage.setItem("storeData", JSON.stringify(tasks));
        // }


        const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

showTodos();

function getTodoHtml(todo, index) {
  if (filter && filter != todo.status) {
    return '';
  }
  let checked = todo.status == "completed" ? "checked" : "";
  return /* html */ `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `; 
}

function showTodos() {
  if (todosJson.length == 0) {
    todosHtml.innerHTML = '';
    emptyImage.style.display = 'block';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    emptyImage.style.display = 'none';
  }
}

function addTodo(todo)  {
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input.addEventListener("keyup", e => {
  let todo = input.value.trim();
  if (!todo || e.key != "Enter") {
    return;
  }
  addTodo(todo);
});

addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  if (!todo) {
    return;
  }
  addTodo(todo);
});

function updateStatus(todo) {
  let todoName = todo.parentElement.lastElementChild;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[todo.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.forEach(function (el) {
  el.addEventListener("click", (e) => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
      filter = '';
    } else {
      filters.forEach(tag => tag.classList.remove('active'));
      el.classList.add('active');
      filter = e.target.dataset.filter;
    }
    showTodos();
  });
});

deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});

  
        

     

     