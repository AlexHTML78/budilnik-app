var app = {
  audioCount: 0,
  count: 0,
  bud_num: 0,
  deleteBud: function () {
    $(".budilnik").on("click touchstart", "#del", function () {
      //Выбирает число-ключ из класса элемента
      var key = this.parentNode.parentNode.className.split(" ").pop();
      //Убирает будильник из Local Storage
      localStorage.removeItem(key);
      //Удаляет сам будильник из списка
      this.parentNode.parentNode.remove();
      //Уменьшает количество будильников в переменной
      app.bud_num = app.bud_num - 1;
    });
  },
  updateBudList: function () {
    //Запись будильников из Local Storage в список
    for (var i = 0; i <= localStorage.length; i++) {
      var textnode = localStorage.getItem(i);
     if (textnode !== null) {
      var node = document.createElement("li");
      node.className = "budilnik " + i;
      
      node.innerHTML = textnode;
      document.getElementById("spisokBud").appendChild(node);
      app.bud_num = localStorage.length;
      setOptions();
      }
    }
    alarm();
    app.deleteBud();
  },
  saveBud: function () {
    let deleteBtn = document.createElement("button");
    let textInBtn = document.createTextNode("Удалить");
    deleteBtn.setAttribute("id", "del");
    deleteBtn.appendChild(textInBtn);
    let li = document.createElement("li");
    li.setAttribute("class", "budilnik " + app.bud_num);
    let switcher = document.createElement("input");
    switcher.setAttribute("type", "checkbox");
    switcher.classList.add("onOff");
    let timerOutPlace = document.createElement("h2");
    timerOutPlace.setAttribute("id", "time");
    let timeHasLeft_p = document.createElement("p");
    timeHasLeft_p.setAttribute("id", "info");
    let timeHasLeft_span = document.createElement("span");
    timeHasLeft_span.setAttribute("id", "time_left");
    timeHasLeft_p.appendChild(timeHasLeft_span);
    app.bud_num = app.bud_num + 1;
    li.innerHTML =
      "<div class='bud_header'> <h2 id='time'>-:-</h2> <p id='info'>До срабатывания: <span id='time_left'></span></p>  </div> <label class='switch'> <input type='checkbox' name='onOff' class='onOff'> <span class='slider round'></span></label><div class='expanded_div'><div class='bud_footer'><h2 id='za_skolko_text'><span>За</span><select class='hr_offset'></select><select class='min_offset'></select><span>до</span><select class='para' id='para'></select> <span>пары</span></h2></div></div><div id='delete_dropdown' class='arrow-4'><span class='arrow-4-left'></span><span class='arrow-4-right'></span></div>";
    /*следущая строка добавляет сам новый будильник */

    $("#spisokBud").append(li);
    let container = document.querySelectorAll(".expanded_div");
    let lastChild = container[container.length - 1];
    lastChild.append(deleteBtn);

    var key = li.className.split(" ");
    key = key.pop();
    var value = li.innerHTML;
    localStorage.setItem(key, value);
    alarm();
    app.deleteBud();
    changeTheme(); // Для стилизации только что созданных будильников
  },
};

//Подгрузка будильников из Local Storage
document.addEventListener("DOMContentLoaded", app.updateBudList);

$("#add_timer").on("click touchstart", function () {
  app.saveBud();
  setOptions();
});

$("ul").on("click touchstart", ".arrow-4", function () {
  $(this).toggleClass("open");

  if ($(this).parent().height() <= 60) {
    $(this).parent().animate(
      {
        height: "150px",
      },
      500
    );
    $(this).parent().find(".expanded_div")
    .css({display: "flex",})
    .hide()
    .fadeIn('slow');
  } else if ($(this).parent().height() > 60) {
    $(this).parent().find(".expanded_div")
    //.css({display: "none",})
    .fadeOut('fast');
    $(this).parent().animate(
     {
       height: "60px",
     },
      600
    );
  }
});

function setOptions() {
  function setPara() {
    var select = document.getElementsByClassName("para");
    var x = select.length - 1;
    var numOfPara = 6;
    for (i = 1; i <= numOfPara; i++) {
      select[x].options[select[x].options.length] = new Option(i);
    }
  }

  setPara();

  function hoursMenu() {
    var select = document.getElementsByClassName("hr_offset");
    var x = select.length - 1;
    var hrs = 6;

    for (i = 0; i <= hrs; i++) {
      select[x].options[select[x].options.length] = new Option(
        i < 10 ? "0" + i : i,
        i
      );
    }
  }
  hoursMenu();

  function minMenu() {
    var select = document.getElementsByClassName("min_offset");
    var x = select.length - 1;
    var min = 59;

    for (i = 0; i <= min; i++) {
      select[x].options[select[x].options.length] = new Option(
        i < 10 ? "0" + i : i,
        i
      );
    }
  }
  minMenu();
} 

function alarm() {
  function ifClicked() {
    $(document).on("click touchstart", ".onOff", function () {
      let time_left = $(this)
        .parent()
        .parent()
        .children(".bud_header")
        .children("#info")
        .children("#time_left");
      time_left.text(" ");
      var intervalUpdate = setInterval(() => {
        if (this.checked) {
          let alarmTimeOut = $(this)
            .parent()
            .parent()
            .children(".bud_header")
            .children("#time");
          let hr = $(this)
            .parent()
            .parent()
            .children(".expanded_div")
            .children('.bud_footer')
            .children('#za_skolko_text')
            .children('.hr_offset')
            .val();
          let min = $(this)
            .parent()
            .parent()
            .children(".expanded_div")
            .children('.bud_footer')
            .children('#za_skolko_text')
            .children(".min_offset")
            .val();
          let para = $(this)
            .parent()
            .parent()
            .children(".expanded_div")
            .children('.bud_footer')
            .children('#za_skolko_text')
            .children(".para")
            .val();
          function alarmSet() {
            var deadline = {
              hours: 8,
              minutes: 0,
            };
            switch (para) {
              case "1":
                deadline.hours = 8;
                deadline.minutes = 0;
                break;
              case "2":
                deadline.hours = 9;
                deadline.minutes = 45;
                break;
              case "3":
                deadline.hours = 11;
                deadline.minutes = 30;
                break;
              case "4":
                deadline.hours = 13;
                deadline.minutes = 30;
                break;
              case "5":
                deadline.hours = 15;
                deadline.minutes = 10;
                break;
              case "6":
                deadline.hours = 16;
                deadline.minutes = 50;
                break;
            }

            var selectedHour = deadline.hours - hr;
            var selectedMin = deadline.minutes - min;
            if (selectedMin < 0) {
              selectedHour = selectedHour - 1;
              selectedMin += 60;
            }
            var selectedSec = 0;

            alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin);
            alarmTimeOut.text(alarmTime);
            /* подсчет текущего времени, выбор строки, выводимой в качестве времени до звонка
             */
            var date = new Date();

            var hours = date.getHours();

            var minutes = date.getMinutes();

            var seconds = date.getSeconds();

            if (selectedHour - hours < 0 && selectedMin - minutes < 0) {
              time_left.text(
                selectedHour - hours + 24 + ":" + addZero(selectedMin - minutes + 60)
              );
            } else if (selectedMin - minutes < 0) {
              if (selectedHour - hours > 0) {
                time_left.text("0" + ":" + addZero(selectedMin - minutes + 60));
              } else {
                time_left.text(
                  selectedHour - hours + ":" + addZero(selectedMin - minutes + 60)
                );
              }
            } else if (selectedHour - hours < 0) {
              time_left.text(
                selectedHour - hours + 24 + ":" + addZero(selectedMin - minutes)
              );
            } else if (this.checked == false) {
              time_left.text("   ");
            } else {
              time_left.text(
                selectedHour - hours + ":" + (selectedMin - minutes)
              );
            }
            //когда alarmTime совпадает с текущим, звучит сигнал
            alarmTime =
              addZero(selectedHour) +
              ":" +
              addZero(selectedMin) +
              ":" +
              addZero(selectedSec);
            var currentTime =
              addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
            if (alarmTime == currentTime) {
              musicc();
            }
          }
          alarmSet();
        } else {
          clearInterval(intervalUpdate);
          time_left.text("");
        }
      }, 1000);
    });
  }
  ifClicked();
}
var sound = new Audio("easy.mp3");
function addZero(time) {
  return time < 10 ? "0" + time : time;
}

function musicc() {
  setTimeout(function () {
    sound.play();
  });
}


// Смена темы путем замены стилей на заготовленные варианты
function changeTheme() {
  let checkTheme = localStorage.getItem("app.count");
  if (checkTheme != undefined) {
    app.count = checkTheme;
  }
  let images = [
    "url(jpg/app_background_1.png)",
    "url(jpg/app_background_2.png)",
    "url(jpg/app_background_3.png)",
    "url(jpg/app_background_4.png)",
    "url(jpg/app_background_5.png)",
    "url(jpg/app_background.png)"
  ];
  let fonts = [
    'Reef',
    'Reef',
    'Reef',
    'Reef',
    'Reef',
    'Reef'
  ];

  let table = [
    "rgba(83,136,173,0.5))",
    "rgba(35,43,86,0.8)",
    "rgba(35,43,86,0.8)",
    "rgba(6,11,23,0.32)",
    "rgba(53,53,53,0.9)",
    "rgba(91,91,91,0.3)"
  ];

  let theme = [
    "rgba(83,136,173,0.5))",
    "rgba(35,43,86,0.8)",
    "rgba(35,43,86,0.8)",
    "rgba(6,11,23,0.32)",
    "rgba(53,53,53,0.9)",
    "rgba(91,91,91,0.3)"
  ];
  let audio = [
    "rgba(83,136,173,0.5))",
    "rgba(35,43,86,0.8)",
    "rgba(35,43,86,0.8)",
    "rgba(6,11,23,0.32)",
    "rgba(53,53,53,0.9)",
    "rgba(91,91,91,0.3)"
  ];
  let dev = [
    "rgba(83,136,173,0.5))",
    "rgba(35,43,86,0.8)",
    "rgba(35,43,86,0.8)",
    "rgba(6,11,23,0.32)",
    "rgba(53,53,53,0.9)",
    "rgba(91,91,91,0.3)"
  ];
  let main = [
    "rgba(83,136,173,0.5))",
    "rgba(35,43,86,0.8)",
    "rgba(35,43,86,0.8)",
    "rgba(6,11,23,0.32)",
    "rgba(53,53,53,0.9)",
    "rgba(91,91,91,0.3)"
  ];
  let addTimer = [
    "rgba(83,136,173,0.5))",
    "rgba(35,43,86,0.8)",
    "rgba(35,43,86,0.8)",
    "rgba(6,11,23,0.32)",
    "rgba(53,53,53,0.9)",
    "rgba(91,91,91,0.3)"
  ];
  let point1 = [
    "#ffffff",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)"
  ];
  let point2 = [
    "rgba(0,0,0,0)",
    "#ffffff",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)"
  ];
  let point3 = [
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "#ffffff",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)"
  ];
  let point4 = [
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "#ffffff",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)"
  ];
  let point5 = [
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "#ffffff",
    "rgba(0,0,0,0)"
  ];
  let point0 = [
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0)",
    "#ffffff"
  ];
  $(".point0").css("background-color", point0[app.count]);
  $(".point1").css("background-color", point1[app.count]);
  $(".point2").css("background-color", point2[app.count]);
  $(".point3").css("background-color", point3[app.count]);
  $(".point4").css("background-color", point4[app.count]);
  $(".point5").css("background-color", point5[app.count]);
  $("body").css("background-image", images[app.count]);
  $("*").css("font-family", fonts[app.count]);
  $(".table").css("background-color", table[app.count]);
  $(".theme").css("background-color", theme[app.count]);
  $(".audio").css("background-color", audio[app.count]);
  $(".dev").css("background-color", dev[app.count]);
  $(".budilnik").css("background-color", main[app.count]);
  $(".addTimer").css("background-color", addTimer[app.count]);
}

function changeAlarmAudio() {
  let checkAudio = localStorage.getItem("app.audioCount");
  if (checkAudio != undefined) {
    app.audioCount = checkAudio;
  }
  let alarms = [
    'sound/hard.mp3',
    'sound/easy.mp3',
    'sound/medium.mp3'
  ];
  let testAudio = new Audio(alarms[app.audioCount]);
  let easy = [
    "rgba(255,255,255,0.5)",
    "#ffffff",
    "rgba(255,255,255,0.5)"
  ];
  let medium = [
    "rgba(255,255,255,0.5)",
    "rgba(255,255,255,0.5)",
    "#ffffff"
  ];
  let hard = [
    "#ffffff",
    "rgba(255,255,255,0.5)",
    "rgba(255,255,255,0.5)"
  ];
  let easytxt = [
    "rgba(255,255,255,0.5)",
    "#ffffff",
    "rgba(255,255,255,0.5)"
  ];
  let mediumtxt = [
    "rgba(255,255,255,0.5)",
    "rgba(255,255,255,0.5)",
    "#ffffff"
  ];
  let hardtxt = [
    "#ffffff",
    "rgba(255,255,255,0.5)",
    "rgba(255,255,255,0.5)"
  ];
  $(".easy").css("border-color", easy[app.audioCount]);
  $(".medium").css("border-color", medium[app.audioCount]);
  $(".hard").css("border-color", hard[app.audioCount]);
  $(".easytxt").css("color", easytxt[app.audioCount]);
  $(".mediumtxt").css("color", mediumtxt[app.audioCount]);
  $(".hardtxt").css("color", hardtxt[app.audioCount]);

  sound = testAudio;
  testAudio.pause();
  testAudio.play();
  testAudio.addEventListener("canplaythrough", function () {
    setTimeout(function () {
      testAudio.pause();
    }, 3000)
  }, false);
}

// Подгружаем ранее выбранную тему и мелодию после загрузки страницы
$(changeTheme);
$(changeAlarmAudio);

// По клику на кнопку "Сменить тему/мелодию" устанавливаем порядок темы и мелодии, запускаем changeTheme() и changeAlarmAudio()
$(".theme").click(function () {
  app.count++;
  if (app.count > 5) {
    app.count = 0;
  }
  localStorage.setItem("app.count", app.count);
  changeTheme();
});
$(".audio").click(function () {
  app.audioCount++;
  if (app.audioCount > 2) {
    app.audioCount = 0;
  }
  localStorage.setItem("app.audioCount", app.audioCount);
  changeAlarmAudio();
});

function opentab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

// Титры для вкладки О разработчиках
$('#developers').on("click touchstart", function () {
  console.log('work')
  $('#credits').show();
  $('#runningBlock').show();
  $('#creditsClose').show();
  var pos = 0;
  height = $(document).height();

  var intervalID = setInterval(function() { 
    if (pos >= height*0.6) {
      console.log('end of the credits');
      clearInterval(intervalID);
    }
        $('#runningBlock').css('bottom', pos += 1);
  }, 55) 
  
});
$('#creditsClose').on("click touchstart", function () {
  console.log('deleted');
  $('#credits').hide();
  $('#runningBlock').hide();
  $('#creditsClose').hide();
});
