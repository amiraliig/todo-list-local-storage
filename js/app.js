//names
let $ = document
let input = $.getElementById('itemInput')
let addTodBtn = $.getElementById('addButton')
let clearTodo = $.getElementById('clearButton')
let todoList = $.getElementById('todoList')
let dataArr = []
//functions
function userData (){
    inputvalue = input.value
    let obj = {
        id: dataArr.length + 1,
        title: inputvalue,
        complete:false
    }
    input.value = ''
  dataArr.push(obj)
   localStorageset()
   ArrayGenarator()
}
function localStorageset(){
    localStorage.setItem('todos',JSON.stringify(dataArr))
}
function ArrayGenarator(){
    todoList.innerHTML = ''

    dataArr.forEach(function(data){
    let newLi = document.createElement('li')
    newLi.classList.add("completed","well")
    let newLabel = document.createElement('label')
    newLabel.innerHTML = data.title
    let completeBtn = document.createElement('button')
    completeBtn.innerHTML = 'complete'
    completeBtn.classList.add('btn-success','btn')
    completeBtn.setAttribute('onclick','completeHandler('+ data.id + ')')
    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'delete'
    deleteBtn.classList.add('btn-danger','btn')
    deleteBtn.setAttribute('onclick','deleteTodoHandler('+data.id+')')
    if (data.complete) {
        newLi.className = 'uncompleted well'
        completeBtn.innerHTML = 'UnComplete'
    }

    newLi.append(newLabel,completeBtn,deleteBtn)
    todoList.append(newLi)

    })
}
function getLocalstorage (){
    localStoragetodos = JSON.parse(localStorage.getItem('todos'))
    if(localStoragetodos){
    dataArr = localStoragetodos
    }else{
   dataArr = []
    }
   ArrayGenarator(dataArr)
}
function cleartodo(){
    dataArr = []

    todoList.innerHTML = ''
    localStorage.removeItem('todos')
}
function deleteTodoHandler(todoId){
console.log(todoId)
let localStoragedataDelete = JSON.parse(localStorage.getItem('todos'))
let indexForDelete = localStoragedataDelete.findIndex(function(todo){
return todo.id == todoId
})
dataArr = localStoragedataDelete
dataArr.splice(indexForDelete,1)
localStorage.setItem('todos',JSON.stringify(dataArr))
ArrayGenarator(dataArr)
}
function completeHandler(todoId){
    let localStoragedataComplete = JSON.parse(localStorage.getItem('todos'))
    let indexForcomplete = localStoragedataComplete.findIndex(function(todo){
    return todo.id == todoId
    })
    dataArr = localStoragedataComplete
    
    dataArr[indexForcomplete].complete = !dataArr[indexForcomplete].complete;
    localStorage.setItem('todos',JSON.stringify(dataArr))
    ArrayGenarator(dataArr)
    
}
//events
addTodBtn.addEventListener('click',userData)
window.addEventListener('load',getLocalstorage)
clearTodo.addEventListener('click',cleartodo)