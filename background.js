$(document).click(function(e){
			if(!$(e.target).closest(".options").length && !$(e.target).closest(".mainsetting").length){
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
			var ampm='AM';
			ampm=(currentHours>12)?'PM':ampm;
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
			var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
			$("#time").html(currentTimeString);
			$("#ampm").html(ampm);
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
					var temperature=obj.main.temp+' <sup>o</sup>C ';
					$("#weather").html(temperature);
					$("#weatherimage").html(img);
				}});

		}
		$(document).ready(function(){
  	document.body.style.backgroundImage = "url('assets/images/bgimages/cupcake-bg.jpg')";
  	setInterval('updateClock()', 1000);
  	 //display weather
  	 getLocation();

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
  	 	var x=$(this).attr('style');
  	 	$('#mainbodybody').css('background-image','none');
  	 	//console.log($('body').css('background-image','none'));
  	 	document.body.style.cssText=x;
  	 	document.getElementById('clickshowbgcolor').style.cssText=x;
  	 	$('.showbgcolor').hide();
  	 });
  	  $(".clickshowbgimage").click(function(){
  	 	$(".showbgimage").show();
  	 });
  	  $('.showbgimage1').click(function() {
  	 	var bgimage=$(this).attr('src');
  	 	$('body').css('background-image','url("'+bgimage+'")');
  	 	//document.body.style.cssText=x;
  	 	//document.getElementById('clickshowbgimage')..cssText=x;
  	 	$('.showbgimage').hide();
  	 });
  	  $('#clockstatus').click(function() {
  	  		(this.checked)?$("#showtime").show():$("#showtime").hide()
  	  });
  	  $('#tempstatus').click(function() {
  	  		(this.checked)?$("#showweather").show():$("#showweather").hide()
  	  });
  	});