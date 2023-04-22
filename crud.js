// http://localhost:3000/to-do-list

let app = new function() {
  this.el = document.getElementById('tasks');

  this.tasks = [];

  
  
  this.fetchAll = function() {
    let data = '';

    if (this.tasks.length > 0) {
      for (i = 0; i < this.tasks.length; i++) {
        data += '<tr>';
        data += '<td>'+(i+1)+". " + this.tasks[i] + '</td>';
        data += '<td><button onclick="app.edit(' + i + ')"  class="btn btn-warning mr-2">Edit</button> <button onclick="app.delete(' + i + ')"  class="btn btn-danger">Delete</button></td>';
        data += '</tr>';
      }
    }

    return this.el.innerHTML = data;
  };

  this.add = function () {
    el = document.getElementById('add-task');
    // Get the value
    let task = el.value;

    if (task) {
      // Add the new value
      this.tasks.push(task.trim());
      // Reset input value
      el.value = '';
      // Dislay the new list
      this.el.focus()
      this.fetchAll();
    }
  };

  this.edit = function (item) {
    let el = document.getElementById('edit-todo');
    // Display value in the field
    el.value = this.tasks[item];
    // Display fields
    document.getElementById('edit-box').style.display = 'block';
    self = this;

    document.getElementById('save-edit').onsubmit = function() {
      // Get value
      let task = el.value;

      if (task) {
        // Edit value
        self.tasks.splice(item, 1, task.trim());
        // Display the new list
        self.fetchAll();
        // Hide fields
        closeInput();
      } else {
        document.getElementById('edit-error').innerHTML= "Please Enter Changes"
      }
    }
  };

  this.delete = function (item) {
    // Delete the current row
    this.tasks.splice(item, 1);
    // Display the new list
    this.fetchAll();
  };


}

app.fetchAll();

function closeInput() {
  document.getElementById('edit-box').style.display = 'none';
}