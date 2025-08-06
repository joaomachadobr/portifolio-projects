let NewTask = document.querySelector('#new-task-input')
let task = document.querySelector('.task-list')
let list = []

function add() {
    if (NewTask.value == '') {
        alert('campo vazio')
    } else {
        let item = document.createElement('li')
        item.innerHTML = NewTask.value // adciona o conteudo dentro do no li
        item.addEventListener('click', function() {
            item.classList.toggle('done');
        });
        task.appendChild(item)
        list.push(NewTask.value)
    }
}
