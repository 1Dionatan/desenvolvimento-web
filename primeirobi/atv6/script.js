const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskDateInput = document.getElementById('taskDateInput');
const taskTimeInput = document.getElementById('taskTimeInput');

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value.trim();

    if (taskText !== '') {
        const newLi = document.createElement('li');
        const taskInfoContainer = document.createElement('div');
        taskInfoContainer.className = 'task-info';
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = taskText;

        taskInfoContainer.appendChild(taskTextSpan);

        if (taskDate !== '') {
            const dateSpan = document.createElement('span');
            dateSpan.className = 'task-date';
            const formattedDate = new Date(taskDate).toLocaleDateString('pt-BR');
            dateSpan.textContent = `Data: ${formattedDate}`;
            taskInfoContainer.appendChild(dateSpan);
        }

        if (taskTime !== '') {
            const timeSpan = document.createElement('span');
            timeSpan.className = 'task-time';
            timeSpan.textContent = `Horário: ${taskTime}`;
            taskInfoContainer.appendChild(timeSpan);
        }

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.innerHTML = '✔️';
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '✏️';
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '❌';

        newLi.appendChild(taskInfoContainer);
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(removeBtn);
        newLi.appendChild(actionsDiv);

        taskList.appendChild(newLi);

        taskInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
    }
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskList.addEventListener('click', (event) => {
    const target = event.target;
    const li = target.closest('li');

    if (!li) return;

    if (target.classList.contains('complete-btn')) {
        li.classList.toggle('completed');
    }

    else if (target.classList.contains('remove-btn')) {
        li.remove();
    }

    else if (target.classList.contains('edit-btn')) {
        const taskTextSpan = li.querySelector('.task-text');
        const currentText = taskTextSpan.textContent;
        const newText = prompt('Editar tarefa:', currentText);

        if (newText !== null && newText.trim() !== '') {
            taskTextSpan.textContent = newText.trim();
        }
    }
});