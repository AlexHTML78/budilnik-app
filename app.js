var weekdayArr=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
var timeArr = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','50','51','52','53','54','55','56','57','58','59'];
var mobileSelect1 = new MobileSelect({
    trigger: '#time_picker',
    wheels: [
        {data: weekdayArr},
        {data: timeArr}
    ],
});



/* Дальше Макс не трогает */

/* Сентябрина работает с этим */
//$("#saveTimer").click(function(){ 

/* следущие три строки нужны для добавления кнопки со стрелкой вниз - открытие доп настроек и кнопки удалить */
//let txt = document.createElement('div');
//txt.className = 'arrow-4';
//txt.innerHTML = "<span class='arrow-4-left'></span><span class='arrow-4-right'></span>";
/*следущая строка добавляет сам новый будильник */
 //   $('#spisokBud').append("<li class='budilnik'><div class='bud_header'> <h2 id='time'>05:45</h2> <p id='info'>Вам осталось спать 4:43</p>  </div> <label class='switch'> <input type='checkbox' name='onOff' id='onOff'> <span class='slider round'></span></label><div class='expanded_div'> <button id='del'>Удалить будильник</button></div><div id='delete_dropdown' class='arrow-4'><span class='arrow-4-left'></span><span class='arrow-4-right'></span></div></li>"); 
 //   $('.delete_div').prepend(txt);
 // for (var i = 0; i < document.querySelectorAll('.budilnik').length;i++) {
  //   document.querySelectorAll('.budilnik')[i].onclick = function(){
  //  alert('gay');
 // }
//}
   // }); 
/* здесь Сентябрина должна сделать функцию удаления будильника */
  



    var app = {
        //newPassw: "",
        bud_num: 0,
        counter: 0,
        budilniki: [],
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
          li.innerHTML = "<div class='bud_header'> <h2 id='time'>05:45</h2> <p id='info'>Вам осталось спать 4:43</p>  </div> <label class='switch'> <input type='checkbox' name='onOff' id='onOff'> <span class='slider round'></span></label><div class='expanded_div'></div><div id='delete_dropdown' class='arrow-4'><span class='arrow-4-left'></span><span class='arrow-4-right'></span></div>"
            /*следущая строка добавляет сам новый будильник */
         
          $('#spisokBud').append(li); 
          let container = document.querySelectorAll('.expanded_div');
          let lastChild = container[container.length-1];
          lastChild.append(deleteBtn);
           

          //Проверка длины Local Storage для того, чтобы не перезаписать имеющиеся пароли
          /*app.counter = localStorage.length;
          for (var i = 0; i <= 1; i++) {
            localStorage.setItem(app.newBud, app.newBud);
          }
          app.counter += 1; */
          var key = li.className.split(' ');
          key = key.pop()
          var value = li.innerHTML;
          localStorage.setItem(key, value);
          //app.updateBudList();  
        },
      };

      

      //Сохранение пароля
     
      
      //Подгрузка паролей из Local Storage
      document.addEventListener("DOMContentLoaded", app.updateBudList);
      
      
      //Макароны для работы на IOS
        
      /*
      //Сохранение пароля
      document.getElementById("saveTimer").addEventListener("touchstart", function() {
       
          app.saveBud();
      }); */


 /* Макс работает с этим */
$('#saveTimer').on('click touchstart', function() {
app.saveBud();
  $('#add_timer').css({ 
      'display': 'block'});
  $('#spisokBud').css({ 
      'display': 'flex'
   });
  $('#makeNewBud').css({ 
      'display': 'none'
   });
});

$('#add_timer').on('click touchstart', function() {
  $(this).css('display', 'none');
  $('#spisokBud').css('display', 'none');
  $('#makeNewBud').css('display', 'flex');
})


$('ul').on('click touchstart','.arrow-4', function() {
    $(this).toggleClass('open');
      
    if ($(this).parent().height() <= 60) {
     $(this).parent().animate({
         height: '200px'
     }, 1000);
     $(this).parent().css({ 
        'background-color': 'rgba(91, 91, 91, 0.45)'
     })
     $(this).parent().find('.expanded_div').css({ 
         display: 'flex' 
      })                 
    }
    else if ($(this).parent().height() > 60) {
      $(this).parent().css({ 
        'background-color': 'rgba(91, 91, 91, 0.3)'
    })
     $(this).parent().find('.expanded_div').css({
         display: 'none'
     })
     $(this).parent().animate({
        height: '60px'
    }, 1000);
    }
    
    
});

     
