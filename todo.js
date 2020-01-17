let todoList = document.getElementById('item');
// let todoList = document.getElementsByClassName('li-list');
let counter=0;
let list =[];

document.getElementById('form_tag').addEventListener('submit',addTodoItem); 
getTodoList();    
refreshDOM();

function addTodoItem(e){
    e.preventDefault();
    let newTodoItem = document.getElementById('entry').value;
    let count =0;
    // check dublicate item
    for(let content of list){
        console.log(content.text);
        if(content.text != newTodoItem){
            count++;
        }
    }
    // if item is not dublicate and is not empty
    if(newTodoItem != "" && count == list.length){
        let newobj = {text:newTodoItem,status:false};
        list.push(newobj);
        document.getElementById('entry').value=null;
        updateDOM();
        refreshDOM();
        
    }
}


// Storing data to local Storage
function updateDOM(){
    localStorage.setItem('list',JSON.stringify(list));
}

function getTodoList(){
    list =JSON.parse(localStorage.getItem("list"));
    if(!list){
        list=[];
    }
}


// delete the from todolist
todoList.addEventListener('click', deleteTodoItem);

function deleteTodoItem(e){
    // e.preventDefault();
    if(e.target.classList.contains('del')){
        // todoList.removeChild(e.target.parentElement);
        let remove =e.target.parentElement;
        let index = remove.getAttribute("Position");
        list.splice(index,1);
        updateDOM();
        refreshDOM();
    }
}
    
// line-through the todoitem if it is checked
todoList.addEventListener('click',check)
function check(e){
    console.log(e);
    e.preventDefault();
    let checkitem = e.target.parentElement;
    let index= checkitem.getAttribute('position');
    list[index].status = e.target.checked;
    updateDOM();
    refreshDOM();
}
    
// Refreshing the DOM
function refreshDOM(){
    while (todoList.hasChildNodes()){
        todoList.lastChild.remove();
    }
    for(let listContent of list){
        if(listContent.text){
        let li = document.createElement('li');
        li.draggable= true;
        li.className = 'li-list';
        li.setAttribute('position',list.indexOf(listContent));
        
        // adding checkbox 
        let todoCheckBox=document.createElement('input')
        todoCheckBox.type="checkbox";
        todoCheckBox.checked= listContent.status;
        todoCheckBox.className='check-box';
        li.appendChild(todoCheckBox);

        // adding item 
        li.appendChild(document.createTextNode(listContent.text));
        todoList.appendChild(li);
        document.getElementById('entry').value="";

        // adding delete button 
        let deletebtn = document.createElement('button');
        deletebtn.appendChild(document.createTextNode('delete'));
        deletebtn.className='del';
        li.appendChild(deletebtn);
        todoList.appendChild(li);
            if(listContent.status === true){
                li.style.textDecoration = 'line-through';
                li.style.color='red'
            }

            const dragg = document.querySelector(".item_list");

            dragg.addEventListener('dragstart',dragStart);
            dragg.addEventListener('dragend',dragEnd);
            dragg.addEventListener('dragover',dragOver);
        }
        
    }
}

let position_start;
let position_over;
let position_drop;

function dragStart(e){
    // item = e.target;
    // console.log(e.target.attributes.position);
    position_start = e.target.getAttribute('position');
    console.log(position_start);
 }

function dragOver(e){
    e.preventDefault();
    // console.log(e.target.attributes.position);
    position_over = e.target.getAttribute('position'); 
}

function dragEnd(e){
    const startcontent = list.splice(position_start,1);
    // console.log(startcontent);  
    list.splice(position_over,0,startcontent[0]);
    updateDOM();
    refreshDOM();    
}

