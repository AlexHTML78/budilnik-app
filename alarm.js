var sound = new Audio("alarm.mp3");
        sound.loop = true;
        
var clicked = false;


function addZero(time) {

    return (time < 10) ? "0" + time : time;

}

function setPara(){

    var select = document.getElementById('para');
    var numOfPara = 6
    
    for (i=1; i <= numOfPara; i++) {
        select.options[select.options.length] = new Option(i);
        
    }
    }
    setPara();


function hoursMenu(){

var select = document.getElementById('hr_offset');
var hrs = 6

for (i=0; i <= hrs; i++) {
    select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
    
}
}
hoursMenu();

function minMenu(){

var select = document.getElementById('min_offset');
var min = 59;

for (i=0; i <= min; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
}
}
minMenu();

function alarmSet() {
    document.getElementById('time_left').innerText =  '...';
    var para = document.getElementById('para').value;
    var deadline = {
        hours: 8,
        minutes: 0
    };
    console.log(para);
    switch(para) {
        case '1':  
        deadline.hours = 8;
        deadline.minutes = 0;
          break;
        case '2':  
        deadline.hours = 9;
        deadline.minutes = 45;
          break;
        case '3':
        deadline.hours = 11;
        deadline.minutes = 30;
          break;
        case '4':
        deadline.hours = 13;
        deadline.minutes = 30;
          break; 
        case '5':
        deadline.hours = 15;
        deadline.minutes = 10;
          break;
        case '6':
        deadline.hours = 16;
        deadline.minutes = 50;
          break;  
        
      }
    var hr = document.getElementById('hr_offset');
	var min = document.getElementById('min_offset');
    

    var selectedHour = (deadline.hours - hr.options[hr.selectedIndex].value);
    var selectedMin = (deadline.minutes - min.options[min.selectedIndex].value);
    if (selectedMin < 0) {
        selectedHour = selectedHour - 1;
        selectedMin += 60;
    }
    var selectedSec = 0;

    var alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec);
    document.getElementById('time').innerText = addZero(selectedHour) + ":" + addZero(selectedMin);
   



//when alarmtime is equal to currenttime then play a sound


/*function to calcutate the current time 
then compare it to the alarmtime and play a sound when they are equal
*/

setInterval(function(){

	var date = new Date();
	
	var hours = date.getHours();
	
	var minutes = date.getMinutes();
	
	var seconds = date.getSeconds();


	//convert military time to standard time

	if (hours < 0) {
		hours = hours * -1;
	}  else {
		hours = hours;
	}
	
	var currentTime = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    if (alarmTime == currentTime && clicked == true) {
        musicc();
        }	

},1000);

function musicc() {
    setTimeout(function() {
        sound.play();
    }, 10000)
}
}

for (var i=0; i < document.querySelectorAll('#onOff').length; i++) {
        
        document.querySelectorAll('#onOff')[i].addEventListener('click', function(){
            if (clicked == true) {
                clicked = false;
                
            } else {
                clicked = true;
                alarmSet();
            }
        });    
}