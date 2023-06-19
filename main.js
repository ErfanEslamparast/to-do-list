let taskInput=document.querySelector("#task");
let addBtn=document.querySelector("#task-form button");
let list=document.querySelector(".list-group")
let clearBtn=document.querySelector(".clear-tasks")
let searchInput=document.querySelector("#filter")

    document.addEventListener("DOMContentLoaded",()=>{
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks=[];
        }else{
            tasks=JSON.parse(localStorage.getItem('tasks'))
        }
        tasks.forEach(task=>{
            let newItem=document.createElement("li")
            let removeItem=document.createElement("i")
            removeItem.classList="fas fa-times text-danger mr-auto delete-item"
            newItem.classList="list-group-item d-flex align-items-center"
            newItem.textContent=task;
            newItem.appendChild(removeItem)
            list.appendChild(newItem)
        })
    })
    
    function setTaskToLocalStorage(task){
    let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks=[];
        }else{
            tasks=JSON.parse(localStorage.getItem('tasks'))
        }
        tasks.push(task)
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

//Add New Tasks
addBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(!taskInput.value) alert("متن تسک مورد نظر را بنویسید ")
    else{
        let newTask=taskInput.value;
        createNewItem(newTask);
        setTaskToLocalStorage(taskInput.value)
        taskInput.value="";
    }
})
function createNewItem(newTask){
    let newItem=document.createElement("li")
    let removeItem=document.createElement("i")
    removeItem.classList="fas fa-times text-danger mr-auto delete-item"
    newItem.classList="list-group-item d-flex align-items-center"
    newItem.textContent=newTask
    newItem.appendChild(removeItem)
    list.appendChild(newItem)
}

    function removeTaskFromLocalStorage(taskItem){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks=[];
        }else{
            tasks=JSON.parse(localStorage.getItem('tasks'))
        }
        tasks.forEach((task,index)=>{
            if(taskItem.textContent === task){
                tasks.splice(index,1)
            }
            localStorage.setItem('tasks',JSON.stringify(tasks))
        })
    }

//Remove Tasks
list.addEventListener("click",(e)=>{
        if(e.target.classList.contains("delete-item")){
            if(confirm("آیا مطمئن هستید می خواهید این تسک را حذف کنید؟")){
                e.target.parentNode.remove();
                removeTaskFromLocalStorage(e.target.parentElement);
            }
        }
})
 //Clear Tasks
 clearBtn.addEventListener("click",(e)=>{
    localStorage.clear();
    list.innerHTML=""
 })

 //Search Tasks
searchInput.addEventListener("input",(e)=>{
    document.querySelectorAll(".list-group-item").forEach(task=>{
        if(task.textContent.indexOf(searchInput.value) != -1){
            task.classList.add("d-flex")
        }else{
            task.classList.remove("d-flex")
            task.style.display="none"
        }
    })
})