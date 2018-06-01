(function(document) {
    'use strict';
    
    var list = {
      //checking localstorage
      itemsList: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
           
      // loading display and setting localstorage
      displayItems: function() {
        var listUl = document.querySelector('#pending-items-list');
        var listUlCompleted = document.querySelector('#complete-items-list');
        listUl.innerHTML = '';
        listUlCompleted.innerHTML = '';
        document.getElementById('inputData').removeAttribute('placeholder');
        
        // initialize local storage
        localStorage.setItem('todos', JSON.stringify(list.itemsList));
        const storedList = JSON.parse(localStorage.getItem('todos'));
        
        storedList.forEach(function(todo, position) {
          var itemsLi = document.createElement('li');
          itemsLi.id = position;
          todo.completed ? (listUlCompleted.appendChild(itemsLi), itemsLi.style.color = '#a8a8a8') : (listUl.appendChild(itemsLi));
  
          var item = document.getElementById(position);
          item.innerHTML =  todo.itemName;
          item.appendChild(handlers.createDeleteButton());
          item.prepend(handlers.createToggleButton(position));
        });
      }
    }
  
    var handlers = {
  
        // add new item to the list(array)
        addItem: function() {
          var inputData= document.getElementById('inputData');
          if (inputData.value.length === 0) {
            inputData.setAttribute('placeholder', 'Enter Task');
            return false;
          }
          
          list.itemsList.push({
            itemName: inputData.value,
            completed: false
          });
          document.getElementById('inputData').value = '';
          document.getElementById('inputData').focus();
          list.displayItems();
        },
  
        // toggle completed on and off
        toggleCompleted: function(position) {
          list.itemsList[position].completed = !list.itemsList[position].completed;
          list.displayItems();
        },
      
      // toggle all items as completed on and off
        toggleAllCompleted: function() {
          var totalCompleted = 0;
          
          list.itemsList.forEach(function(item) {
            if (item.completed === true)
            totalCompleted++;
          });
          
          list.itemsList.forEach(function(item) {
            totalCompleted === list.itemsList.length ? (item.completed = false) : (item.completed = true);
          });
          list.displayItems();
        },
      
        // to delete item
        deleteItem: function(position) {
          list.itemsList.splice(position, 1);
          list.displayItems();
         },
      
        // delete all items
        deleteAllCompleted: function() {
          var i = list.itemsList.length
          while (i--){
            if (list.itemsList[i].completed === true) {
              list.itemsList.splice(i, 1);
            }
          }
          list.displayItems();
        },
      
         // create toggle button
        createToggleButton: function(position) {
          var btnToggle = document.createElement('input');
          btnToggle.setAttribute('type', 'checkbox');
          btnToggle.className = ('btn-toggle');
          list.itemsList[position].completed ? (btnToggle.checked = true) : (btnToggle.checked = false);
          return btnToggle;
        },
  
        // create delete button
        createDeleteButton: function() {
          var btnDelete = document.createElement('button');
            btnDelete.innerHTML = '&#10006';
            btnDelete.className = ('btn-delete');
          return btnDelete;
        },
        
        // submit when 'Enter' key pressed
        submitKey: function(e) {
          if (e.key == 'Enter') {
            handlers.addItem();
          }
        },
      
        // sets up event listeners on UL #pending-items-list for delete and toggle buttons
        init: function() {
          var itemUl = document.querySelector('#pending-items-list');
          var itemUlCompleted = document.querySelector('#complete-items-list');
          
          itemUl.addEventListener('click', function(e) {
            var clickedElement = e.target;
  
            if (clickedElement.className === 'btn-delete') {
              handlers.deleteItem(parseInt(clickedElement.parentNode.id));
            }
            else if (clickedElement.className === 'btn-toggle') {
              handlers.toggleCompleted(parseInt(clickedElement.parentNode.id));
            }
          });
          
          itemUlCompleted.addEventListener('click', function(e) {
            var clickedElement = e.target;
  
            if (clickedElement.className === 'btn-delete') {
              handlers.deleteItem(parseInt(clickedElement.parentNode.id));
            }
            else if (clickedElement.className === 'btn-toggle') {
              handlers.toggleCompleted(parseInt(clickedElement.parentNode.id));
            }
          });
          
          document.querySelector('.btn-toggleAll').addEventListener('click', handlers.toggleAllCompleted);
          document.querySelector('.btn-deleteCompleted').addEventListener('click', handlers.deleteAllCompleted);
          document.querySelector('#btn-add').addEventListener('click', handlers.addItem);
          document.querySelector('#inputData').addEventListener('keydown', handlers.submitKey);
          list.displayItems();
       },
    }
    
    handlers.init();

  })(document);