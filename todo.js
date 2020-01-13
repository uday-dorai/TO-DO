let itemlist = document.getElementById('item');
// let itemlist = document.getElementsByClassName('li-list');
let counter=0;
let list =[];

document.getElementById('form_tag').addEventListener('submit',additem); 
getList();    
DOMlist();

function additem(e){
    e.preventDefault();
    let newitem = document.getElementById('entry').value;
    let count =0;
    console.log(newitem);
    for(let content of list){
        console.log(content.text);
        if(content.text != newitem){
            count++;
            // console.log(count);
        }
    }
    // console.log(list.length);
    if(newitem != "" && count == list.length){
        let newobj = {text:newitem,status:false};
        list.push(newobj);
        document.getElementById('entry').value=null;
        update();
        DOMlist();
        
    }
}


// storing 
function update(){
    // const list =JSON.parse(localStorage.getItem("list"));
    localStorage.setItem('list',JSON.stringify(list));
    // DOMlist();
}

function getList(){
    list =JSON.parse(localStorage.getItem("list"));
    if(!list){
        list=[];
    }
}


// delete the list
// let itemlist = document.getElementById('item');
itemlist.addEventListener('click', removeitem);

function removeitem(e){
    // e.preventDefault();
    if(e.target.classList.contains('del')){
        // itemlist.removeChild(e.target.parentElement);
        let remove =e.target.parentElement;
        let index = remove.getAttribute("Position");
        list.splice(index,1);
        update();
        DOMlist();
    }
}
    
 // // strike the list
itemlist.addEventListener('click',check)
function check(e){
    console.log(e);
    e.preventDefault();
    // if(e.target.type != 'checkbox'){ return;}
    //     e.target.parentElement.classList.toggle('strike');
    let checkitem = e.target.parentElement;
    let index= checkitem.getAttribute('position');
    list[index].status = e.target.checked;
    // console.log()
    update();
    DOMlist();
}
    

function DOMlist(){
    while (itemlist.hasChildNodes()){
        itemlist.lastChild.remove();
    }
    for(let listContent of list){
        // console.log(listContent.text);
        if(listContent.text){
        let li = document.createElement('li');
        li.draggable= true;
        li.className = 'li-list';
        // console.log(list.indexOf(listContent));
        li.setAttribute('position',list.indexOf(listContent));
        // console.log(li.getAttribute('position'));

        let checkk=document.createElement('input')
        checkk.type="checkbox";
        checkk.checked= listContent.status;
        checkk.className='check-box';
        li.appendChild(checkk);

        // adding item to list
        li.appendChild(document.createTextNode(listContent.text));
        itemlist.appendChild(li);
        document.getElementById('entry').value="";

        // adding delete button to list
        let deletebtn = document.createElement('button');
        deletebtn.appendChild(document.createTextNode('delete'));
        deletebtn.className='del';
        li.appendChild(deletebtn);
        itemlist.appendChild(li);
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

// const dragg = document.querySelector(".item_list");

// dragg.addEventListener('dragstart',dragStart);
// dragg.addEventListener('dragend',dragEnd);
// dragg.addEventListener('dragover',dragOver);

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
    // console.log(position_over.value);
    
}

function dragEnd(e){
    const startcontent = list.splice(position_start,1);
    // console.log(startcontent);  
    list.splice(position_over,0,startcontent[0]);
    update();
    DOMlist();    
}

