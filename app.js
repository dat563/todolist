window.addEventListener("load", function () {
  // Variables declaration
  const form = document.querySelector("form");
  const todoList = document.querySelector(".todo-list");
  function createItem(title) {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoList.appendChild(todoItem);
    let text = `
            <span class="todo-text" data-value = "${title}">${title}</span>
            <i class="fa fa-trash todo-remove"></i>
        `;
    todoItem.insertAdjacentHTML("beforeend", text);
    const del = todoItem.querySelector("i");
  }
  let arr = [];
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoValue = this.elements["todo"].value;
    if (todoValue === "") return;
    arr.push(todoValue);
    localStorage.setItem("items", JSON.stringify(arr));
    // Main code
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoList.appendChild(todoItem);
    let text = `
            <span class="todo-text" data-value = "${todoValue}">${todoValue}</span>
            <i class="fa fa-trash todo-remove"></i>
        `;
    todoItem.insertAdjacentHTML("beforeend", text);
    const del = todoItem.querySelector("i");
    del.addEventListener("click", (e) => {
      todoItem.parentNode.removeChild(todoItem);
      arr.splice(arr.indexOf(del.previousElementSibling.dataset.value), 1);
      localStorage.setItem("items", arr);
    });
    const btnDel = document.querySelector(".btn-clear");
    btnDel.addEventListener("click", (e) => {
      todoItem.parentNode.removeChild(todoItem);
      localStorage.clear();
      arr = [];
    });
    this.elements["todo"].value = "";
  });
  if (localStorage.getItem("items") !== null) {
    if (localStorage.getItem("items").startsWith("[")) {
      const newArr = JSON.parse(localStorage.getItem("items"));
      newArr.forEach((item, index) => {
        createItem(item);
      });
      const items = document.querySelectorAll(".todo-item");
      [...items].forEach((item) => {
        let delBtn = item.querySelector("i");
        delBtn.addEventListener("click", (e) => {
          item.parentNode.removeChild(item);
          newArr.splice(
            newArr.indexOf(delBtn.previousElementSibling.dataset.value),
            1
          );
          localStorage.setItem("items", newArr);
        });
      });
    } else {
      const oldArr = localStorage.getItem("items").split(",");
      oldArr.forEach((item, index) => {
        createItem(item);
      });
      const items = document.querySelectorAll(".todo-item");
      [...items].forEach((item) => {
        let delBtn = item.querySelector("i");
        delBtn.addEventListener("click", (e) => {
          item.parentNode.removeChild(item);
          oldArr.splice(
            oldArr.indexOf(delBtn.previousElementSibling.dataset.value),
            1
          );
          localStorage.setItem("items", oldArr);
        });
      });
    }
  }
  const list = document.querySelectorAll(".todo-item");
  [...list].forEach((item) => {
    const text = item.querySelector(".todo-text");
    if (text.textContent === "") item.parentNode.removeChild(item);
  });
  const btnClear = document.querySelector(".btn-clear");
  btnClear.addEventListener("click", (e) => {
    [...list].forEach((item) => {
      item.parentNode.removeChild(item);
    });
    localStorage.clear();
  });
});