const URL = "http://localhost:3000/toDoList"

$.get(URL).then(data => {
    data.map(task => {
        $('tbody').append(
            $(`
            <tr data-id="${task.id}">
            <td>${task.id}</td>
            <td>${task.taskName}</td>
            <td>${task.details}</td>
            <td>
            <button onclick="editTask(${task.id})" class="btn btn-info me-2">Edit</button>
            <button onclick="deleteTask(${task.id})" class="btn btn-success">Done!</button>
            </td>
            </tr>
            `)
            );
        })
    })
    
function isFieldValid(inputId, inputErrorId) {
    let input = document.getElementById(inputId).value;
    let inputError = document.getElementById(inputErrorId);
   
    if (input === '') {
     document.getElementById(inputId).classList.add('is-invalid');
        inputError.textContent = 'Please Enter a Task';
        console.log(`added class 'is-invalid to input id:${inputId}`)
       return false;
     } else {
         document.getElementById(inputId).classList.remove('is-invalid');
       inputError.textContent = '';
     return true
     }
 }
  



document.getElementById('task-btn').addEventListener('click', ()=> {

    let validField = isFieldValid('task-input', 'task-empty')

    if(validField) {
    $.post(URL, {taskName: document.getElementById('task-input').value, 
                details: document.getElementById('details-input').value })
    }

});




function deleteTask(id) {
  $.ajax(`${URL}/${id}`, {
    method:'DELETE'
  });
}

function editTask(id) {
    // Retrieve the task data to be edited
    $.get(`${URL}/${id}`).then(task => {
      // fill the form fields with the task data
      document.getElementById('task-input').value = task.taskName;
      document.getElementById('details-input').value = task.details;
      document.getElementById('save-btn').style.display = "block"

      document.getElementById('save-btn').addEventListener('click', () => {
        let validField = isFieldValid('task-input', 'task-empty')

        if(validField) {

        // send PUT request to update the task data
        $.ajax(`${URL}/${id}`, {
          method: 'PUT',
          data: {
            taskName: document.getElementById('task-input').value,
            details: document.getElementById('details-input').value
          }
        }).then(updatedTask => {
          // Update the table row with the updated task data
          $(`tr[data-id="${id}"]`).html(`
            <td>${updatedTask.id}</td>
            <td>${updatedTask.taskName}</td>
            <td>${updatedTask.details}</td>
            <td>
              <button onclick="editTask(${updatedTask.id})" class="btn btn-info me-2">Edit</button>
              <button onclick="deleteTask(${updatedTask.id})" class="btn btn-success">Done!</button>
            </td>
          `);

        });
        }   
      });
    });
  }


  document.addEventListener('keypress', function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === 'Enter') {
      // Trigger the button element with a click
      document.getElementById('task-btn').click();
    
    }
  });