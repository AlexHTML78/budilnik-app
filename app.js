var weekdayArr=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
var timeArr = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','50','51','52','53','54','55','56','57','58','59'];
var mobileSelect1 = new MobileSelect({
    trigger: '#time_picker',
    wheels: [
        {data: weekdayArr},
        {data: timeArr}
    ],
});


document.getElementById('saveTimer').addEventListener('click', function() {

    document.getElementById('add_timer').style.display = 'block';
    document.getElementById('spisokBud').style.display = 'flex';
    document.getElementById('makeNewBud').style.display = 'none';
});

$('#add_timer').click(function() {
    $(this).css('display', 'none');
    $('#spisokBud').css('display', 'none');
    $('#makeNewBud').css('display', 'flex');
})


$('ul').on('click','.arrow-4', function() {
    $(this).toggleClass('open');
    if ($(this).parent().height() <= 60) {
     $(this).parent().height( 200 );
     $('.expanded_div').css({ // сделать это
         display: 'flex' // в отдельной функции
      })                   // и с дисплеем: бокс тоже. сделать как с ul, чтобы работало только с event.target
    }
    else if ($(this).parent().height() == 200) {
     $('.expanded_div').css({
         display: 'none'
     })
     $(this).parent().height( 60 );
    }
    
    
});
$("#saveTimer").click(function(){ 
let txt = document.createElement('div');
txt.className = 'arrow-4';
txt.innerHTML = "<span class='arrow-4-left'></span><span class='arrow-4-right'></span>";
    $('#spisokBud').append("<li class='budilnik'><div class='bud_header'> <h2 id='time'>05:45</h2> <p id='info'>Вам осталось спать 4:43</p>  </div> <label class='switch'> <input type='checkbox' name='onOff' id='onOff'> <span class='slider round'></span></label><div class='expanded_div'> <button id='del'>Удалить будильник</button></div><div id='delete_dropdown' class='arrow-4'><span class='arrow-4-left'></span><span class='arrow-4-right'></span></div></li>"); 
    $('.delete_div').prepend(txt);
    }); 
    
    $("#del").click(function(){ 
        $('#pizza3').remove(); 
    }); 


