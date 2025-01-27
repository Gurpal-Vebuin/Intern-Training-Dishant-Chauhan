let invalue: boolean = false;
let arr: any = [];

// Adding the content
let todoBody = document.querySelector(".table-body") as HTMLElement;

window.onload = function (): void {
  displayList();
};

type obj = {
  name: string;
  id: number;
  isCompleted: boolean;
};

function noItemstoPreview() {
  let tr = document.createElement("tr") as HTMLTableRowElement;
  tr.classList.add("tr-data");
  todoBody.appendChild(tr);

  let td = document.createElement("td") as HTMLTableCellElement;
  td.classList.add("no-row");
  td.colSpan = 3;
  tr.appendChild(td);
  td.style.padding = "10px";
  td.style.fontSize = "20px";
  td.textContent = "No items to preview"; // Message when no items
}

function addList(): void {
  let inputElement = document.querySelector("input") as HTMLInputElement | null;

  if (inputElement) {
    let input = inputElement.value.trim();

    if (input === "") {
      if (!invalue) {
        let todowarning = document.querySelector(
          ".todo-input"
        ) as HTMLElement | null;

        if (todowarning) {
          const p = document.createElement("p") as HTMLParagraphElement;
          p.className = "warning";
          p.id = "warning";
          p.style.textAlign = "left";
          p.style.marginLeft = "20px";
          p.style.padding = "2px";
          p.style.color = "white";
          const addText = document.createTextNode("Enter some value") as Text;
          p.appendChild(addText);
          todowarning.appendChild(p);
          invalue = true;
        } else {
          console.error("Element with class 'todo-input' not found!");
        }
      }
    } else {
      let emptydatawarnig = document.querySelector(
        ".tr-data"
      ) as HTMLElement | null;
      if (emptydatawarnig !== null) {
        emptydatawarnig.remove();
      }

      let p = document.querySelector(".warning") as HTMLElement | null;
      if (p !== null) {
        p.remove();
      }

      inputElement.value = "";

      const addButton = document.querySelector(
        ".add"
      ) as HTMLButtonElement | null;

      if (addButton && addButton.textContent === "Save") {
        editItem();
        return;
      }

      let duplicate = arr.find((ele: obj) => ele.name === input);
      if (duplicate) {
        alert("Duplicate value added");
        return;
      }

      let taskNumber = arr.length + 1;

      let tempObj = {
        name: input,
        id: taskNumber,
        isCompleted: false,
      };

      let tr = document.createElement("tr") as HTMLTableRowElement;
      tr.classList.add("table-row");

      const td1 = document.createElement("td") as HTMLTableCellElement;
      const td2 = document.createElement("td") as HTMLTableCellElement;
      const td3 = document.createElement("td") as HTMLTableCellElement;
      td3.classList.add("action");

      td1.textContent = taskNumber.toString();
      td2.textContent = input;

      const button1 = document.createElement("button") as HTMLButtonElement;
      button1.classList.add("edit");
      button1.innerHTML = "&#9998";
      button1.id = taskNumber.toString();

      const button2 = document.createElement("button") as HTMLButtonElement;
      button2.classList.add("delete");
      button2.textContent = "\u00D7";
      button2.id = taskNumber.toString();

      const button3 = document.createElement("button") as HTMLButtonElement;
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
  } else {
    console.error("Input element not found!");
  }
}

function editItem(event?: MouseEvent): void {
  let editdisabled = document.querySelectorAll(
    ".edit"
  ) as NodeListOf<HTMLElement>;
  let disabled = document.querySelectorAll(
    ".delete"
  ) as NodeListOf<HTMLElement>;
  let checkdisabled = document.querySelectorAll(
    ".check"
  ) as NodeListOf<HTMLElement>;

  editdisabled.forEach((editdisable) => {
    editdisable.setAttribute("disabled", "true");
  });
  disabled.forEach((disable) => {
    disable.setAttribute("disabled", "true");
  });

  checkdisabled.forEach((button3disable) => {
    button3disable.setAttribute("disabled", "true");
  });

  let x: obj[] = arr.filter(
    (ele: obj) => ele.id === parseFloat((event?.target as HTMLElement).id)
  );
  if (x.length === 0) return;

  let initialInput = document.querySelector("input") as HTMLInputElement;
  initialInput.value = x[0].name;

  let id = x[0].id;

  let saveButton = document.querySelector(".add") as HTMLButtonElement;
  if (!saveButton) {
    console.error("Save button not found!");
    return;
  }

  saveButton.className = "save";
  saveButton.textContent = "Save";
  saveButton.style.backgroundColor = "green";

  saveButton.onclick = function () {
    let updatedName = initialInput.value;

    let itemToUpdate = arr.find((ele: obj) => ele.id === id);
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

function deleteItem(event?: MouseEvent): void {
  arr = arr.filter(
    (ele: obj) => ele.id !== parseFloat((event?.target as HTMLElement).id)
  );
  if (window.confirm("Sure you want to delete? ")) {
    (event?.target as HTMLElement).closest("tr")?.remove();
    reindexItems();
    addLocal(arr);
    displayList();
  }
}

function checkedItem(event: MouseEvent): void {  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === parseFloat((event?.target as HTMLElement).id)) {
      const taskText = (event?.target as HTMLElement)
        .closest("tr")
        ?.querySelector("td:nth-child(2)") as HTMLElement;
      if (taskText) {
        if (arr[i].isCompleted) {
          taskText.style.textDecoration = "none";
          (event?.target as HTMLElement).innerHTML = "&#10003";
          arr[i].isCompleted = false;
        } else {
          taskText.style.textDecoration = "line-through";
          (event?.target as HTMLElement).innerHTML = "&#10004";
          arr[i].isCompleted = true;
        }
      }
    }
  }
  addLocal(arr);
}

function addLocal(
  items: { name: string; id: number; isCompleted: boolean }[]
): void {
  localStorage.setItem("event", JSON.stringify(items));
}

function displayList(): void {
  const savedItems = localStorage.getItem("event");
  if (savedItems) {
    arr = JSON.parse(savedItems);
    todoBody.innerHTML = "";

    if (arr.length === 0) {
      noItemstoPreview();
    } else {
      arr.forEach((item: obj) => {
        let tr = document.createElement("tr") as HTMLTableRowElement;
        tr.classList.add("table-row");

        const td1 = document.createElement("td") as HTMLTableCellElement;
        const td2 = document.createElement("td") as HTMLTableCellElement;
        const td3 = document.createElement("td") as HTMLTableCellElement;

        td1.textContent = item.id.toString();
        td2.textContent = item.name;
        td3.classList.add("action");

        const button1 = document.createElement("button") as HTMLButtonElement;
        button1.classList.add("edit");
        button1.innerHTML = "&#9998";
        button1.id = item.id.toString();

        const button2 = document.createElement("button") as HTMLButtonElement;
        button2.classList.add("delete");
        button2.textContent = "\u00D7";
        button2.id = item.id.toString();

        const button3 = document.createElement("button") as HTMLButtonElement;
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
}

function reindexItems(): void {
  arr.forEach((item: obj, index: number) => {
    item.id = index + 1;
  });

  addLocal(arr);
}
