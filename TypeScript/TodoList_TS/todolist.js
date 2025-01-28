var _a;
var invalue = false;
var arr = JSON.parse((_a = localStorage.getItem("event")) !== null && _a !== void 0 ? _a : "[]");
// Adding the content
var todoBody = document.querySelector(".table-body");
window.onload = function () {
    console.log("here");
    displayList();
};
function noItemstoPreview() {
    var tr = document.createElement("tr");
    tr.classList.add("tr-data");
    todoBody.appendChild(tr);
    var td = document.createElement("td");
    td.classList.add("no-row");
    td.colSpan = 3;
    tr.appendChild(td);
    td.style.padding = "10px";
    td.style.fontSize = "20px";
    td.textContent = "No items to preview"; // Message when no items
}
function addList() {
    var inputElement = document.querySelector("input");
    if (inputElement) {
        var input_1 = inputElement.value.trim();
        if (input_1 === "") {
            if (!invalue) {
                var todowarning = document.querySelector(".todo-input");
                if (todowarning) {
                    var p = document.createElement("p");
                    p.className = "warning";
                    p.id = "warning";
                    p.style.textAlign = "left";
                    p.style.marginLeft = "20px";
                    p.style.padding = "2px";
                    p.style.color = "white";
                    var addText = document.createTextNode("Enter some value");
                    p.appendChild(addText);
                    todowarning.appendChild(p);
                    invalue = true;
                }
                else {
                    console.error("Element with class 'todo-input' not found!");
                }
            }
        }
        else {
            var emptydatawarnig = document.querySelector(".tr-data");
            if (emptydatawarnig !== null) {
                emptydatawarnig.remove();
            }
            var p = document.querySelector(".warning");
            if (p !== null) {
                p.remove();
            }
            inputElement.value = "";
            var addButton = document.querySelector(".add");
            if (addButton && addButton.textContent === "Save") {
                editItem();
                return;
            }
            var duplicate = arr.find(function (ele) { return ele.name === input_1; });
            if (duplicate) {
                alert("Duplicate value added");
                return;
            }
            var taskNumber = arr.length + 1;
            var tempObj = {
                name: input_1,
                id: taskNumber,
                isCompleted: false,
            };
            var tr = document.createElement("tr");
            tr.classList.add("table-row");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            td3.classList.add("action");
            td1.textContent = taskNumber.toString();
            td2.textContent = input_1;
            var button1 = document.createElement("button");
            button1.classList.add("edit");
            button1.innerHTML = "&#9998";
            button1.id = taskNumber.toString();
            var button2 = document.createElement("button");
            button2.classList.add("delete");
            button2.textContent = "\u00D7";
            button2.id = taskNumber.toString();
            var button3 = document.createElement("button");
            button3.classList.add("check");
            button3.innerHTML = "&#10003";
            button3.id = taskNumber.toString();
            td3.appendChild(button1);
            td3.appendChild(button2);
            td3.appendChild(button3);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            todoBody.appendChild(tr);
            arr.push(tempObj);
            addLocal(arr);
            //  editItem
            button1.addEventListener("click", editItem);
            //  deleteItem
            button2.addEventListener("click", deleteItem);
            //  for checkmark
            button3.addEventListener("click", checkedItem);
        }
    }
    else {
        console.error("Input element not found!");
    }
}
function editItem(event) {
    var editdisabled = document.querySelectorAll(".edit");
    var disabled = document.querySelectorAll(".delete");
    var checkdisabled = document.querySelectorAll(".check");
    editdisabled.forEach(function (editdisable) {
        editdisable.setAttribute("disabled", "true");
    });
    disabled.forEach(function (disable) {
        disable.setAttribute("disabled", "true");
    });
    checkdisabled.forEach(function (button3disable) {
        button3disable.setAttribute("disabled", "true");
    });
    var x = arr.filter(function (ele) { return ele.id === parseFloat((event === null || event === void 0 ? void 0 : event.target).id); });
    if (x.length === 0)
        return;
    var initialInput = document.querySelector("input");
    initialInput.value = x[0].name;
    var id = x[0].id;
    var saveButton = document.querySelector(".add");
    if (!saveButton) {
        console.error("Save button not found!");
        return;
    }
    saveButton.className = "save";
    saveButton.textContent = "Save";
    saveButton.style.backgroundColor = "green";
    saveButton.onclick = function () {
        var updatedName = initialInput.value;
        var itemToUpdate = arr.find(function (ele) { return ele.id === id; });
        if (itemToUpdate) {
            itemToUpdate.name = updatedName;
        }
        addLocal(arr);
        displayList();
        saveButton.textContent = "Add";
        saveButton.className = "add";
        saveButton.style.backgroundColor = "red";
        initialInput.value = "";
        saveButton.onclick = addList;
    };
}
function deleteItem(event) {
    var _a;
    arr = arr.filter(function (ele) { return ele.id !== parseFloat((event === null || event === void 0 ? void 0 : event.target).id); });
    if (window.confirm("Sure you want to delete? ")) {
        (_a = (event === null || event === void 0 ? void 0 : event.target).closest("tr")) === null || _a === void 0 ? void 0 : _a.remove();
        reindexItems();
        addLocal(arr);
        displayList();
    }
}
function checkedItem(event) {
    var _a;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === parseFloat((event === null || event === void 0 ? void 0 : event.target).id)) {
            var taskText = (_a = (event === null || event === void 0 ? void 0 : event.target)
                .closest("tr")) === null || _a === void 0 ? void 0 : _a.querySelector("td:nth-child(2)");
            if (taskText) {
                if (arr[i].isCompleted) {
                    taskText.style.textDecoration = "none";
                    (event === null || event === void 0 ? void 0 : event.target).innerHTML = "&#10003";
                    arr[i].isCompleted = false;
                }
                else {
                    taskText.style.textDecoration = "line-through";
                    (event === null || event === void 0 ? void 0 : event.target).innerHTML = "&#10004";
                    arr[i].isCompleted = true;
                }
            }
        }
    }
    addLocal(arr);
}
function addLocal(items) {
    localStorage.setItem("event", JSON.stringify(items));
}
function displayList() {
    console.log(arr);
    if (arr.length === 0) {
        noItemstoPreview();
    }
    else {
        arr.forEach(function (item) {
            var tr = document.createElement("tr");
            tr.classList.add("table-row");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            td1.textContent = item.id.toString();
            td2.textContent = item.name;
            td3.classList.add("action");
            var button1 = document.createElement("button");
            button1.classList.add("edit");
            button1.innerHTML = "&#9998";
            button1.id = item.id.toString();
            var button2 = document.createElement("button");
            button2.classList.add("delete");
            button2.textContent = "\u00D7";
            button2.id = item.id.toString();
            var button3 = document.createElement("button");
            button3.classList.add("check");
            button3.innerHTML = item.isCompleted ? "&#10004" : "&#10003";
            button3.id = item.id.toString();
            td3.appendChild(button1);
            td3.appendChild(button2);
            td3.appendChild(button3);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            todoBody.appendChild(tr);
            button1.addEventListener("click", editItem);
            button2.addEventListener("click", deleteItem);
            button3.addEventListener("click", checkedItem);
        });
    }
}
function reindexItems() {
    arr.forEach(function (item, index) {
        item.id = index + 1;
    });
    addLocal(arr);
}
