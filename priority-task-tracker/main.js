let NewTask = document.querySelector('#new-task-input')
let task = document.querySelector('.task-list')
let list = []

function add() {
    if (NewTask.value == '') {
        alert('campo vazio')
    } else {
        let item = document.createElement('li')
        let button = document.createElement('button')
        button.innerHTML = '❌'
    
        item.innerHTML = NewTask.value // adciona o conteudo dentro do no li
        item.appendChild(button)
        
        item.addEventListener('click', function(e) {
            // se clicou no botão, não marcar/desmarcar a tarefa
            if (e.target === button) return
            item.classList.toggle('done')
        })

        button.addEventListener('click', function(e) {
            e.stopPropagation() //impede o clique de afetar o item

            let taskText = item.firstChild.textContent.trim()

            // console.log('Antes da remoção:', list); // 👈 mostra o array antes

            let taskPosition = list.indexOf(taskText)

            if (taskPosition > -1) {
                list.splice(taskPosition, 1) // remove do array
            }
            item.remove() // remove do dom

            // console.log('tarefa removida',taskText)
            // console.log('lista atualkizada', list)
        })

        task.appendChild(item)
        list.push(NewTask.value)
        NewTask.value = ''
        NewTask.focus()
    }
}
