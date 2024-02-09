let bookName=document.querySelector('#name');
let bookUrl=document.querySelector('#url');
let tbody=document.querySelector('#tbody');

let submit=document.getElementById('submit');
let update=document.getElementById('update');
let search=document.getElementById('Search');
let bookContainer;

if(localStorage.length){
    bookContainer=JSON.parse(localStorage.getItem('bookMarks'));
    displayWebsite(bookContainer);
}
else{
    bookContainer=[];
}

// Function Add
function addWebsite(){
    let books={
        name:bookName.value,
        url:bookUrl.value
    }
    bookContainer.push(books);
    localStorage.setItem('bookMarks',JSON.stringify(bookContainer));
    displayWebsite(bookContainer);
    clearForm();
}

// Function Clear
function clearForm(){
    bookName.value='';
    bookUrl.value='';
}

// Function Display
function displayWebsite(list){
    let marks=``;
    for(let i=0;i<list.length;i++){
        marks+=`<tr>
        <td>${list[i].name}</td>
        <td><a href="${list[i].url}" target="_blank"><button id="visit" class="btn btn-primary">Visit</button></a></td>
        <td><button onclick="updateBook(${i})" class="btn btn-warning text-white">Update</button></td>
        <td><button onclick="deleteBook(${i})" id="delete" class="btn btn-danger">Delete</button></td>
    </tr>`;
    }
    tbody.innerHTML=marks;
}

// Function Delete
function deleteBook(index){
    bookContainer.splice(index,1);
    localStorage.setItem('bookMarks',JSON.stringify(bookContainer));
    displayWebsite(bookContainer);
}

// Function Update
let indexUpdate=0;
function updateBook(indexUpdate){
    bookName.value=bookContainer[indexUpdate].name;
    bookUrl.value=bookContainer[indexUpdate].url;
    update.classList.replace('d-none','d-inline-block');
    submit.classList.remove('d-inline-block');
    submit.classList.add('d-none');
}

function updateBookLast(){
    bookContainer[indexUpdate].name=bookName.value;
    bookContainer[indexUpdate].url=bookUrl.value;
    localStorage.setItem('bookMarks',JSON.stringify(bookContainer));
    displayWebsite(bookContainer);
    clearForm();
    update.classList.replace('d-inline-block','d-none');
    submit.classList.replace('d-none','d-inline-block');
}

// Function search
function searchBook(searchTerm){
    let searchList=[];
    for(let i=0;i<bookContainer.length;i++){
        if(bookContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
            searchList.push(bookContainer[i]);
        }
    }
    displayWebsite(searchList);
}

// Function isValid

function isValid(){
    var nameRegex=/^[A-Za-z_]{1,}$/;
        var urlRegex=/^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.(com)|(net)$/;
    if(nameRegex.test(bookName.value)&&urlRegex.test(bookUrl.value)){
        return true;
    }else{
        return false;
    }
}


// Events
submit.addEventListener('click',function(){
    addWebsite();
})
update.addEventListener('click',function(){
    updateBookLast();
})

bookName.onkeyup=function(){
    if(isValid()){
        submit.removeAttribute("disabled")
    }else{
        submit.disabled="true";
    }
}

bookUrl.onkeyup=function(){
    if(isValid()){
        submit.removeAttribute("disabled")
    }else{
        submit.disabled="true";
    }
}
