const form = document.querySelector('#add-form');
const datatList = document.querySelector('#dataList')
const inputElement = document.querySelector('#detail');

loadData();

document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
    inputElement.value = '';
  });
});

function addTask() {
  const inputValue = inputElement.value;
  if (inputValue != "") {
    const storedData = JSON.parse(localStorage.getItem('myData')) || [];
    storedData.push(inputValue);
    localStorage.setItem("myData", JSON.stringify(storedData));
    loadData();
  } else {
    alert("please enter your task");
    inputElement.focus();
  }
}

function loadData() {
  const storedData = JSON.parse(localStorage.getItem("myData")) || [];
  datatList.innerHTML = "";
  storedData.forEach((element, index) => {
    const li = `
    <li>${element}
    <div>
        <button id="btn-edit" data-index="${index}">Edit</button>
        <button id="btn-delete" data-index="${index}">delete</button>
      </div>
    </li>  
    `;
    datatList.innerHTML += li;
  });
  const btnDelete = document.querySelectorAll('#btn-delete');
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", deleteData);
  })
  const btnEdit = document.querySelectorAll('#btn-edit')
  btnEdit.forEach((btn) => {
    btn.addEventListener("click", editData)
  })
}

function deleteData() {
  if (confirm("confirm are you delete the task")) {
    const index = this.dataset.index;
    const storedData = JSON.parse(localStorage.getItem('myData')) || [];
    storedData.splice(index, 1);
    localStorage.setItem("myData", JSON.stringify(storedData));
    loadData();
  }
}

function editData() {
  const index = this.dataset.index;
  const storedData = JSON.parse(localStorage.getItem('myData')) || [];
  const newData = prompt("Edit your task", storedData[index]);
  if (newData != null) {
    storedData[index] = newData;
    localStorage.setItem("myData", JSON.stringify(storedData));
    loadData();
  }
}

