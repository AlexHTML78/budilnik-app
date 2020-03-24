
    var app = {
        bud_num: 0,
        deleteBud: function() {
          $(".budilnik").on('click touchstart', '#del', function() {
              //Убирает "Х" в конце строки
              var key = this.parentNode.parentNode.className.split(' ').pop();
              console.log(key);
              //Убирает пароль из Local Storage
              localStorage.removeItem(key);
              //Удаляет сам пароль из списка
              this.parentNode.parentNode.remove();
            });          
      
        },
        updateBudList: function() {
          //Запись паролей из Local Storage в список
          for (var i = 0; i < localStorage.length; i++) {
            var node = document.createElement("li")
            node.className = 'budilnik ' + i;
            var textnode = localStorage.getItem(i);
            node.innerHTML = textnode;
            document.getElementById("spisokBud").appendChild(node);
          }
          app.deleteBud();
        },
        saveBud: function() {
          let deleteBtn = document.createElement('button');
          let textInBtn = document.createTextNode('Удалить');
          deleteBtn.setAttribute('id', 'del');
          deleteBtn.appendChild(textInBtn);
          let li = document.createElement('li');
          li.setAttribute('class', 'budilnik ' + app.bud_num);
          app.bud_num = app.bud_num + 1;
          li.innerHTML = "<div class='bud_header'> <h2 id='time'>05:45</h2> <p id='info'>Вам осталось спать 4:43</p>  </div> <label class='switch'> <input type='checkbox' name='onOff' id='onOff'> <span class='slider round'></span></label><div class='expanded_div'><div class='bud_footer'<h2 id='za_skolko_text'>За<select id='hr_offset'></select><select id='min_offset'></select>до<select  id='para'></select> пары</h2></div></div><div id='delete_dropdown' class='arrow-4'><span class='arrow-4-left'></span><span class='arrow-4-right'></span></div>"
            /*следущая строка добавляет сам новый будильник */
         
          $('#spisokBud').append(li); 
          let container = document.querySelectorAll('.expanded_div');
          let lastChild = container[container.length-1];
          lastChild.append(deleteBtn);
          
          var key = li.className.split(' ');
          key = key.pop()
          var value = li.innerHTML;
          localStorage.setItem(key, value);
          app.deleteBud();
        },
      };

      

     
      
      //Подгрузка будильников из Local Storage
      document.addEventListener("DOMContentLoaded", app.updateBudList);
        
     


 /* Макс работает с этим */
$('#add_timer').on('click touchstart', function() {
  app.saveBud();
});




$('ul').on('click touchstart','.arrow-4', function() {
    $(this).toggleClass('open');
      
    if ($(this).parent().height() <= 60) {
     $(this).parent().animate({
         height: '200px'
     }, 500);
     $(this).parent().find('.expanded_div').css({ 
         display: 'flex' 
      })                 
    }
    else if ($(this).parent().height() > 60) {
     $(this).parent().find('.expanded_div').css({
         display: 'none'
     })
     $(this).parent().animate({
        height: '60px'
    }, 500);
    }
    
    
});

     
