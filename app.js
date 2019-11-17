var weekdayArr=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
var timeArr = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','50','51','52','53','54','55','56','57','58','59'];
var mobileSelect1 = new MobileSelect({
    trigger: '#time_picker',
    wheels: [
        {data: weekdayArr},
        {data: timeArr}
    ],
});

document.getElementById('add_timer').addEventListener('click', function() {

    document.getElementById('add_timer').style.display = 'none';
    document.getElementById('spisokBud').style.display = 'none';
    document.getElementById('makeNewBud').style.display = 'flex';
});
document.getElementById('saveTimer').addEventListener('click', function() {

    document.getElementById('add_timer').style.display = 'block';
    document.getElementById('spisokBud').style.display = 'flex';
    document.getElementById('makeNewBud').style.display = 'none';
});



