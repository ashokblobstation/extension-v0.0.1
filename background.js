$(document).click(function(e){
 if(!$(e.target).closest(".options").length && !$(e.target).closest(".mainsetting").length){
  $('.showbgcolor').fadeOut(300);
  $('.showbgimage').fadeOut(300);
   $('.mainsetting').fadeOut(300);	
 }
			//$('.mainsetting').fadeOut(300);
		});
function updateClock ( )
{
 var currentTime = new Date ( );
 var currentHours = currentTime.getHours ( );
 var currentMinutes = currentTime.getMinutes ( );
 var currentSeconds = currentTime.getSeconds ( );
 var weekday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
 var n = weekday[currentTime.getDay()];
 var date=currentTime.getDate()+'/'+currentTime.getMonth()+'/'+currentTime.getFullYear();
 var ampm='<span>AM</span>';
 ampm=(currentHours>12)?'<span>PM</span>':ampm;
 currentHours = ( currentHours>12 ) ? currentHours - 12 : currentHours;
 currentHours = ( currentHours == 0 ) ? 12 : currentHours;
 if (currentHours<10) {
  currentHours='0'+currentHours;
}
if (currentMinutes<10) {
  currentMinutes='0'+currentMinutes;
}
if (currentSeconds<10) {
  currentSeconds='0'+currentSeconds;
}  	
var currentTimeString = currentHours + ":" + currentMinutes + "&nbsp;"+ampm;
$("#time").html(currentTimeString);
$("#day").html(n);
$("#date").html(date);

}
var geolocation;
function getLocation() {
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else { 
  geolocation = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
 geolocation = "Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude;

 var APIKEY = '46abd6a925a0cddb77b8d6d55fc58a72';
 var latitude = position.coords.latitude;
 var longitude = position.coords.longitude;
 var url='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units=metric&APPID='+APIKEY;

 $.ajax({url: url,
  dataType: "json",async:true,
  crossDomain:true, 
  success: function(result){
   var temp=JSON.stringify(result);
   var obj=JSON.parse(temp);
   localStorage.setItem('temperature',temp);    
   var obj=JSON.parse(localStorage.getItem('temperature'));
   var img='<img src="assets/images/weatherimages/'+obj.weather[0].icon+'.png">'
   var temperature=obj.main.temp+' <sup>o</sup>c ';
   $("#weather").html(temperature);
   $("#weatherimage").html(img);
 }});

}
function setdefault(){
  $(document).ready(function(){
 var bgcolor=localStorage.getItem('bgcolor');
 var bgimage=localStorage.getItem('bgimage');
 var clocksetting=localStorage.getItem('clocksetting');
 var weathersetting=localStorage.getItem('weathersetting');
 var searchengine=localStorage.getItem('searchengine');
 var searchnav=localStorage.getItem('searchnav');
 if(bgimage==null && bgcolor==null) {
   bgimage='assets/images/bgimages/bluesky-bg.jpg';
   $('body').css('background-image','url("'+bgimage+'")');
 }
 if (bgcolor!=null) {
  document.body.style.cssText=bgcolor;
  document.getElementById('clickshowbgcolor').style.cssText=bgcolor;
}
if(bgimage!=null)
{
  $('body').css('background-image','url("'+bgimage+'")');
  $('#clickshowbgimage').attr('src',bgimage);
  
}

if (clocksetting == null || clocksetting == 'true') {
/*  $(document).ready(function(){*/
    $('#clockstatus').attr("checked","checked");/*});*/
}
else{
  /*$(document).ready(function(){*/
    $('#clockstatus').attr("checked",false);
    $("#showtime").hide();
 /* });*/
}
if (weathersetting == null || weathersetting == 'true') {
/*  $(document).ready(function(){*/
    $('#weatherstatus').attr("checked","checked");/*});*/
}
else{
  /*$(document).ready(function(){*/
    $('#weatherstatus').attr("checked",false);
    $("#showweather").hide();
  /*});*/
}

if (searchengine !=null) {
  if(searchengine == 'bing'){
  $('#searchengine option').eq(1).attr('selected','selected');}
}
if (searchnav !=null) {
  if(searchnav == 'Videos'){
  $('.searchnavdiv .searchnav').eq(2).addClass('active').siblings().removeClass('active');
}
    if(searchnav == 'Images'){
  $('.searchnavdiv .searchnav').eq(1).addClass('active').siblings().removeClass('active');
}
}


});
}
$(document).ready(function(){
  updateClock();
  	//setInterval('updateClock()', 1000);
  	 //display weather
  	 getLocation();
    setdefault();

    $(".options").click(function(){
     $(".mainsetting").show();
   });

    $("#closesetting").click(function(){
     $(".mainsetting").hide();
   });
    $(".clickshowbgcolor").click(function(){
     $(".showbgcolor").show();
   });
    $('.showbgcolor1').click(function() {
     var bgcolor=$(this).attr('style');
     $('#mainbodybody').css('background-image','none');
  	 	//console.log($('body').css('background-image','none'));
  	 	document.body.style.cssText=bgcolor;
  	 	document.getElementById('clickshowbgcolor').style.cssText=bgcolor;
      $('#clickshowbgimage').removeAttr('src');
      $('#clickshowbgimage').attr('src','https://dummyimage.com/300.png');
      localStorage.setItem('bgcolor',bgcolor);
      localStorage.removeItem('bgimage');
      $('.showbgcolor').hide();
    });
    $(".clickshowbgimage").click(function(){
     $(".showbgimage").show();
   });
    $('.showbgimage1').click(function() {
     var bgimage=$(this).attr('src');
     $('body').css('background-image','url("'+bgimage+'")');
     $('#clickshowbgimage').attr('src',bgimage);
  	 	//document.body.style.cssText=x;
  	 	//document.getElementById('clickshowbgimage')..cssText=x;
     localStorage.setItem('bgimage',bgimage);
     localStorage.removeItem('bgcolor');
     $('.showbgimage').hide();
   });
    $('#clockstatus').click(function() {
     if(this.checked){
      $("#showtime").show();
      localStorage.setItem('clocksetting',this.checked);
    }else
    {
      $("#showtime").hide();
      localStorage.setItem('clocksetting',this.checked);
    }

  });
    $('#weatherstatus').click(function() {
     if(this.checked){
      $("#showweather").show();
      localStorage.setItem('weathersetting',this.checked);
    }
    else{
      $("#showweather").hide();
      localStorage.setItem('weathersetting',this.checked);}
    });

    $('#searchform').submit(function(){
      var searchengine=localStorage.getItem('searchengine');
      var searchnav=localStorage.getItem('searchnav');    
      var action='https://www.bing.com/search?q='

      if (searchnav=='Images') {

        if(searchengine!=='bing'){

          action='https://images.search.yahoo.com/search/images?p='
        }
        else
        {
          action='https://www.bing.com/images/search?q='
        }
      }
      else if(searchnav=='Videos')
      {
        if(searchengine!=='bing'){

          action='https://video.search.yahoo.com/search/video?p='
        }
        else
        {
          action='https://www.bing.com/videos/search?q='
        }
      }
      else
      {
        if(searchengine!=='bing'){
          action='https://in.search.yahoo.com/search?p='
        }
        else
        {
          action='https://www.bing.com/search?q='
        }
      }
      var searchtext = $("input[name='searchtext']",this).val();
      action = action+searchtext;
      $("#searchform").attr('action',action);
    });
    $('#searchengine').click(function() {
      var searchengine = $("#searchengine option:selected").val();
      localStorage.setItem('searchengine',searchengine);
    });
    $('.searchtext').keyup(function(){
      if($.trim($(this).val()) !=''){
        $('.searchsubmit').prop('disabled', false);
      }
      else
      { 
        $('.searchsubmit').prop('disabled', true);
      }

    });
    $(".searchnav").click(function(){
      var searchnav=$(this).text();
      var index = $("p").index(this);
       $('.searchnavdiv p.searchnav').eq(index).addClass('active').siblings().removeClass('active');
      /*var header = document.getElementById("searchnavdiv");
      var nav = header.getElementsByClassName("searchnav");
     /*
     /* for (var i = 0; i < nav.length; i++) {
        nav[i].addEventListener("click", function() {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
        });
      }*/
      localStorage.setItem('searchnav',searchnav);
    });

  });
    //https://api.bing.com/osjson.aspx?query=ashok