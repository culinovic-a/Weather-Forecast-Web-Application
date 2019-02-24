let option = {
	id: 787657,
	appid: '5eb60d5c4cea51ae7a2e6aba25c6c327',
	units: 'metric'
}

let factory = {
	currentWeatherData: function() {
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?id=' + option.id + '&APPID=' + option.appid + '&units=' + option.units).done(function(response) {
			// console.log(response);
			factory.initCurrentData(response);
		});
	},
	initCurrentData: function(data) {
		// trenutno vreme 
		let datum = new Date(data.dt * 1000);
		// vreme izlaska sunca
		let sunrise = new Date(data.sys.sunrise * 1000);
		// vreme zalaska sunca
		let sunset = new Date(data.sys.sunset * 1000);

		$('.curr-img img').attr('src', factory.checkWeatherIcon(data.weather[0].icon));
		$('.place').text(data.name);
		$('.temp span').text(Math.round(data.main.temp));
		$('.tx').text(data.weather[0].description);
		$('.humidity').text(data.main.humidity + ' %');
		$('.wind').text(data.wind.speed + ' km/h');
		$('.pressure').text(data.main.pressure + ' mbar');
		$('.cloudness').text(data.clouds.all + ' %');

		if(datum > sunrise && datum < sunset) {
			$('.container-fluid').css('background-image', 'url("../images/nis.png")');
		} else {
			$('.container-fluid').css('background-image', 'url("../images/nis-n.png")');
		}
	},
	dailyWeatherData: function() {
		$.getJSON('http://api.openweathermap.org/data/2.5/forecast?id=' + option.id + '&APPID=' + option.appid + '&units=' + option.units + '').done(function(response) {
			// console.log(response);
			factory.initDailyData(response);
		});
	},
	checkWeatherIcon: function(name) {
		switch(name) {
			// night
			case '01n': 
				return 'https://img.icons8.com/ultraviolet/50/000000/bright-moon.png'; 
				break;
			case '02n': 
				return 'https://img.icons8.com/ultraviolet/50/000000/partly-cloudy-night.png'; 
				break;
			case '03n': 
				return 'https://img.icons8.com/ultraviolet/40/000000/cloud.png'; 
				break;
			case '04n': 
				return 'https://img.icons8.com/ultraviolet/40/000000/clouds.png'; 
				break;
			case '09n': 
				return 'https://img.icons8.com/ultraviolet/40/000000/torrential-rain.png'; 
				break;
			case '10n': 
				return 'https://img.icons8.com/ultraviolet/40/000000/rain.png'; 
				break;
			case '11n': 
				return 'https://img.icons8.com/ultraviolet/40/000000/storm.png'; 
				break;
			case '13n': 
				return 'https://img.icons8.com/ultraviolet/40/000000/snow.png'; 
				break;
			case '50n': 
				return 'https://img.icons8.com/ultraviolet/40/000000/fog-night.png'; 
				break;
			// DAYYYYYYYY
			case '01d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/sun.png'; 
				break;
			case '02d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/partly-cloudy-day.png'; 
				break;
			case '03d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/cloud.png'; 
				break;
			case '04d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/clouds.png'; 
				break;
			case '09d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/torrential-rain.png'; 
				break;
			case '10d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/rain.png'; 
				break;
			case '11d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/storm.png'; 
				break;
			case '13d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/snow.png'; 
				break;
			case '50d': 
				return 'https://img.icons8.com/ultraviolet/40/000000/fog-day.png'; 
				break;			
			default: 
				return 'https://img.icons8.com/ultraviolet/40/000000/sun.png';
		}
	},
	initDailyData: function(data) {
		let dani = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let dailyData = [];
		let trenutniDatum = new Date();
		trenutniDatum.setHours(0,0,0,0);

		$.each(data.list, function(index, value) {
			let loopDate = new Date(value.dt_txt);

			if(trenutniDatum.getHours() === loopDate.getHours()) {
				dailyData.push(value);
			}
		});

		$.each(dailyData, function(index, value) {
			let datum = new Date(value.dt_txt).getDay();
			$('#' + (index + 1) + ' .card-header').text(dani[datum]);
			$('#' + (index + 1) + ' .card-body img').attr('src', factory.checkWeatherIcon(value.weather[0].icon));
			$('#' + (index + 1) + ' .card-footer span').text(Math.round(value.main.temp));
		});
		// console.log(dailyData);
	}
}

factory.currentWeatherData();
factory.dailyWeatherData();