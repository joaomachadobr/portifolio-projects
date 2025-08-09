let inputTask = document.querySelector('#new-task-input')
let task = document.querySelector('.task-list')
let list = []

inputTask.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        add()
    }
})

//função para criar o elemento da tarefa (DOM)
function createTaskElement(taskObjeto) { 
        let item = document.createElement('li')
        let text = document.createElement('span')
        let button = document.createElement('button')
        button.innerHTML = '❌'

        text.innerHTML = taskObjeto.text
        item.appendChild(text)
        item.appendChild(button)

        // Aplica a classe .done se a tarefa estiver marcada
        if(taskObjeto.done) {
            item.classList.add('done')
        }

        // evento para marcar/desmarcar a tarefa
        item.addEventListener('click', function(e) {           
            if (e.target === button) return //se clicou no botao, nao marca
            item.classList.toggle('done')

            // atualiaza o estado .done no objeto dentro do array
            let taskPosition = list.indexOf(taskObjeto)
            if (taskPosition > -1) {
                list[taskPosition].done = item.classList.contains('done')
            }
            saveTasks() //atualiza no localStorage

        })

        button.addEventListener('click', function(e) {
            e.stopPropagation() //impede o clique de afetar o item

            // let taskText = item.firstChild.textContent.trim() --- nao vou usar agora, so qunado for possivel editar a tarefa
    
            let taskPosition = list.indexOf(taskObjeto)
            if (taskPosition > -1) {
                list.splice(taskPosition, 1) // remove do array
            }
            item.remove() // remove do dom

            saveTasks()
  
        })

        task.appendChild(item)
        
    
}

//Agora sua função add() vai focar só em: validar, atualizar o array, chamar a criação do item e salvar.
function add() {
    if (inputTask.value.trim() === '') {
        alert('campo vazio')
        return
    }
    let newTask = {text: inputTask.value, done: false}
    list.push(newTask)
    createTaskElement(newTask)
    saveTasks()
    inputTask.value = ''
    inputTask.focus()
}

function loadTasks() {
    let saved = localStorage.getItem('tasks')
    if(saved) {
        list = JSON.parse(saved)
        list.forEach(taskObjeto => createTaskElement(taskObjeto))
    }
}

window.onload = loadTasks //nao precisa de parenteses aqui?


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(list))
    // console.log(localStorage.getItem('tasks'))
}

