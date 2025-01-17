let invalue = false;
let arr = [];

// Adding the content
let todoTable = document.querySelector(".todo-table");
let todoHeader = document.querySelector(".table-head");
let todoBody = document.querySelector(".table-body");
let todorow = document.querySelector(".todo-row");

window.onload = function () {
  displayList();
};

function addList() {
  let input = document.querySelector("input").value;
  if (input === "") {
    if (invalue === false) {
      // Warning tag for the empty element.
      let todo = document.querySelector(".todo-input");
      const p = document.createElement("p");
      p.className = "warning";
      p.id = "warning";

      p.style.textAlign = "left";
      p.style.marginLeft = "20px";
      p.style.padding = "2px";
      p.style.color = "white";

      const addText = document.createTextNode("Enter some value");
      p.appendChild(addText);

      // append the element
      todo.appendChild(p);
      invalue = true;
    }
  } else {
    let trdata = document.querySelector(".tr-data");
    if (trdata !== null) {
      trdata.remove();
    }
    // Process for removing the warning tag
    let p = document.querySelector(".warning");
    document.querySelector("input").value = "";
    if (p !== null) {
      p.remove();
    }

    // button3ing if we are in Edit mode
    if (document.querySelector(".add").textContent === "Save") {
      editItem();
      return;
    }

    // button3 if the item already exists
    let duplicate = arr.find((ele) => ele.name === input);
    if (duplicate) {
      alert("Duplicate value added");
      return;
    }

    // Create element
    let tr = document.createElement("tr");
    tr.classList.add("table-row");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td3.classList.add("action");

    const taskNumber = arr.length + 1;

    td1.textContent = taskNumber;
    td2.textContent = input;

    const tempObj = {};
    tempObj.name = input;
    tempObj.id = taskNumber;
    tempObj.isCompleted = false;

    // Edit button
    const button1 = document.createElement("button");
    button1.classList.add("edit");
    button1.innerHTML = "&#9998";
    button1.id = taskNumber;

    // Delete button
    const button2 = document.createElement("button");
    button2.classList.add("delete");
    button2.textContent = "\u00D7";
    button2.id = taskNumber;

    const button3 = document.createElement("button");
    button3.classList.add("check");
    button3.innerHTML = "&#10003";
    button3.id = taskNumber;

    td3.appendChild(button1);
    td3.appendChild(button2);
    td3.appendChild(button3);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    todoBody.appendChild(tr);

    arr.push(tempObj);
    addLocal(arr); // Save to localStorage

    // Editing the elements
    button1.addEventListener("click", editItem);

    // Removing the elements
    button2.addEventListener("click", (e) => {
      arr = arr.filter((ele) => ele.id !== parseFloat(e.target.id));
      if (window.confirm("Sure you want to delete? ")) {
        e.target.closest("tr").remove();
        reindexItems();
        console.log(arr);
        addLocal(arr);
        displayList();
      }
    });
    // checking the elements
    button3.addEventListener("click", (e) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === parseFloat(e.target.id)) {
          const taskText = e.target
            .closest("tr")
            .querySelector("td:nth-child(2)");
          if (taskText) {
            if (arr[i].isCompleted) {
              taskText.style.textDecoration = "none";
              e.target.innerHTML = "&#10003";
              arr[i].isCompleted = false;
            } else {
              taskText.style.textDecoration = "line-through";
              e.target.innerHTML = "&#10004";
              arr[i].isCompleted = true;
            }
          }
        }
      }
      addLocal(arr);
    });
  }
}

function editItem(event) {
  let editdisabled = document.querySelectorAll('.edit');
  let disabled = document.querySelectorAll('.delete');
  let checkdisabled = document.querySelectorAll('.check');

  editdisabled.forEach((editdisable)=>{
    editdisable.setAttribute('disabled',true);
  })
  disabled.forEach((disable)=>{
    disable.setAttribute('disabled',true);
  })

  checkdisabled.forEach((button3disable)=>{
    button3disable.setAttribute('disabled',true);
  })

  let x = arr.filter((ele) => ele.id === parseFloat(event.target.id));
  console.log(x);

  if (x.length === 0) return;

  let initialInput = document.querySelector("input");
  initialInput.value = x[0].name;
  console.log(initialInput.value);

  let id = x[0].id;
  console.log(id);

  document.querySelector(".add").className = "save";
  document.querySelector(".save").textContent = "Save";
  document.querySelector(".save").style.backgroundColor = "green";

  document.querySelector(".save").onclick = function () {
    let updatedName = initialInput.value;

    let itemToUpdate = arr.find((ele) => ele.id === id);
    if (itemToUpdate) {
      itemToUpdate.name = updatedName;
    }

    console.log("Updated item:", itemToUpdate);

    addLocal(arr);

    // Reset the button to Add
    document.querySelector(".save").textContent = "Add";
    document.querySelector(".save").className = "add";
    document.querySelector(".add").style.backgroundColor = "red";

    initialInput.value = "";
    displayList();
  };
}

function addLocal(items) {
  localStorage.setItem("event", JSON.stringify(items));
}

function displayList() {
  const savedItems = localStorage.getItem("event");
  if (savedItems) {
    arr = JSON.parse(savedItems);
    todoBody.innerHTML = ""; // Clear existing rows

    if (arr.length === 0) {
      let tr = document.createElement("tr");
      tr.classList.add("tr-data");
      todoBody.appendChild(tr);

      let td = document.createElement("td");
      td.classList.add("no-row");
      td.colSpan = 3;
      tr.appendChild(td);
      td.style.padding = "10px";
      td.style.fontSize = "20px";
      td.textContent = "No items to preview"; // Message when no items
    } else {
      arr.forEach((item) => {
        let tr = document.createElement("tr");
        tr.classList.add("table-row");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        
        td1.textContent = item.id;
        td2.textContent = item.name;
        td3.classList.add("action");

        const button1 = document.createElement("button");
        button1.classList.add("edit");
        button1.innerHTML = "&#9998";
        button1.id = item.id;

        const button2 = document.createElement("button");
        button2.classList.add("delete");
        button2.textContent = "\u00D7";
        button2.id = item.id;

        const button3 = document.createElement("button");
        button3.classList.add("check");
        button3.innerHTML = item.isCompleted ? "&#10004" : "&#10003"; // button3 the status of completion
        button3.id = item.id;

        td3.appendChild(button1);
        td3.appendChild(button2);
        td3.appendChild(button3);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        todoBody.appendChild(tr);

        button1.addEventListener("click", editItem);

        // Delete item
        button2.addEventListener("click", (e) => {
          arr = arr.filter((ele) => ele.id !== parseFloat(e.target.id));
          if (window.confirm("Sure you want to delete? ")) {
            e.target.closest("tr").remove();
            reindexItems();
            addLocal(arr);
            displayList();  
          }
        });

        // checking the items
        button3.addEventListener("click", (e) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === parseFloat(e.target.id)) {
              const taskText = e.target
                .closest("tr")
                .querySelector("td:nth-child(2)");
              if (taskText) {
                if (arr[i].isCompleted) {
                  taskText.style.textDecoration = "none";
                  e.target.innerHTML = "&#10003";
                  arr[i].isCompleted = false;
                } else {
                  taskText.style.textDecoration = "line-through";
                  e.target.innerHTML = "&#10004";
                  arr[i].isCompleted = true;
                }
              }
            }
          }
          addLocal(arr);
        });
      });
    }
  }
}

function reindexItems() {
  arr.forEach((item, index) => {
    item.id = index + 1;
  });

  addLocal(arr);
}
