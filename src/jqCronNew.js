var a;

(function($){
	$.fn.jqCron = function(settings) {
		var saved_settings = settings;
		return this.each(function() {
			var cron, saved;
			var $this = $(this);

			// autoset bind_to if it is an input
			if($this.is(':input')) {
				settings.bind_to = settings.bind_to || $this;
			}

			// init cron object
			if(settings.bind_to){
				if(settings.bind_to.is(':input')) {
					// auto bind from input to object if an input, textarea ...
					settings.bind_to.blur(function(){
						var value = settings.bind_method.get(settings.bind_to);
						$this.jqCronGetInstance().setCron(value);
					});
				}
				saved = settings.bind_method.get(settings.bind_to);
				cron = new jqCron(settings);
				cron.setCron(saved);
			}
			else {
				cron = new jqCron(settings);
			}
			$(this).data('jqCron', cron);
		});
	};
}).call(this, jQuery);

(function($){
	$.fn.jqCronGetInstance = function() {
		return this.data('jqCron');
	};
}).call(this, jQuery);

$(function(){
	var hideAll	= function(){
		$('#dailyOptions').hide();
		$('#weeklyOptions').hide();
		$('#monthlyOptions').hide();
		$('#yearlyOptions').hide();		
	};

	hideAll();
	$('select[name^="month"]').multipleSelect({
		width: 260,
		multiple: true,
		multipleWidth: 120,
		placeholder: 'Select months',
		selectAll: false,
		minimumCountSelected: 4,
		ellipsis: true,
		allSelected: 'Every month'
	});

	$('select[name="monthSpecificDay"]').on('change', function(){
		var thisSelects = $(this).multipleSelect('getSelects');
		var monthOccurrenceSelects = $('select[name="monthOccurrence"]').multipleSelect('getSelects');

		//Check to see if they match - otherwise the updates get called recursively forever		
		if (!($(thisSelects).not(monthOccurrenceSelects).length === 0 && $(monthOccurrenceSelects).not(thisSelects).length === 0)){
			$('select[name="monthOccurrence"]').multipleSelect('setSelects', $(this).multipleSelect('getSelects'));
		}
	});

	$('select[name="monthOccurrence"]').on('change', function(){
		var thisSelects = $(this).multipleSelect('getSelects');
		var specificDaySelects = $('select[name="monthSpecificDay"]').multipleSelect('getSelects');

		//Check to see if they match - otherwise the updates get called recursively forever
		if (!($(thisSelects).not(specificDaySelects).length === 0 && $(specificDaySelects).not(thisSelects).length === 0)){
			$('select[name="monthSpecificDay"]').multipleSelect('setSelects', $(this).multipleSelect('getSelects'));
		}
	})

	$('[name="ScheduleType"]').on('change', function(){
		var scr = "#" + $(this).val() + "Options";
		hideAll();
		$(scr).show();
	});

	$('[name$="Frequency"]').on('change', function(){
		$('[name$="Frequency"]').val($(this).val());
	});

	$('[name="weekOccurrence"]').on('change', function(){
		$('[name="weekOccurrence"]').val($(this).val());
	});

	$('[name="dayOfWeek"]').on('change', function(){
		$('[name="dayOfWeek"]').val($(this).val());
	});

	$('[name="month"]').on('change', function(){
		$('[name="month"]').val($(this).val());
	});
});

(function($){
	function jqCron(){
		var currentState = {
			time: '12:00',
			pattern: 'daily',
			dailyOptions: {
				selected: 'weekday'
			},
			weeklyOptions: {
				days: []
			},
			monthlyOptions: {
				selected: '',
				days: [],
				occurrence: '',
				dayOfWeek: ''
			},
			yearlyOptions: {
				selected: 'weekOccurrence',
				months: [],
				days: [],
				occurrence: '',
				dayOfWeek: ''
			}
		};

		this.reset = function(){
			currentState = {
				time: '12:00',
				pattern: 'daily',
				dailyOptions: {
					selected: 'weekday'
				},
				weeklyOptions: {
					days: []
				},
				monthlyOptions: {
					selected: '',
					days: [],
					occurrence: '',
					dayOfWeek: ''
				},
				yearlyOptions: {
					selected: '',
					months: [],
					days: [],
					occurrence: '',
					dayOfWeek: ''
				}
			};			
		}

		var disableUiUpdates = false;

		this.init = function(){
			updateDom();
			$('input,select').on('change', function(){
				updateFromDom();				
				//console.log(this.getCron());
			});
		}

		this.setCron = function(expression){
			function pad(string, max){
				string = string.toString();

				return string.length < max ? pad("0" + string, max) : string;
			}

			//Model expression format: ss MM hh dd mm ww yyyy
			var values = expression.split(' ');

			if (values.length == 6){
				values.push("*"); //explicitely declare every year
			}

			if (values.length != 7){
				throw "Invalid Cron: " + expression;
			}

			//reset model to default values
			this.reset();

			currentState.time = pad(values[2], 2) + ':' + pad(values[1], 2);

			if (values[4] != '*'){
				var state = currentState.yearlyOptions;
				//Expression is yearly
				currentState.pattern = 'yearly';
				state.months = values[4].split(',');

				if (values[3] != '?'){
					//Specific day of the month
					state.selected = 'specificDay';
					state.days = values[3].split(',');
				}
				else if(values[5].indexOf('#') > 0) {
					//Specific occurrence of the month
					state.selected = 'weekOccurrence';
					var occArr = values[5].split('#');

					state.dayOfWeek = occArr[0];
					state.occurrence = '#' + occArr[1];
				}
				else{
					throw "Unrecognized yearly cron pattern: " + expression;
				}
			}
			else if (values[3] == '*'){
				//Expression is daily - every day
				currentState.pattern = 'daily';
				currentState.dailyOptions.selected = 'daily';
			}
			else if (values[5] == '2-6'){
				//Expression is daily - weekdays
				currentState.pattern = 'daily';
				currentState.dailyOptions.selected = 'weekday';
			}
			else if (values[5].indexOf('#') == -1 && values[5].indexOf('L') == -1 && values[5] != '?'){
				//Expression is weekly
				currentState.pattern = 'weekly';
				if (values[5].indexOf('-') > 0){
					var inDays = values[5].split('-');
					var days = [];
					for (var i = parseInt(inDays[0]); i <= parseInt(inDays[1]); i++) {
						days.push(i);
					};
					currentState.weeklyOptions.days = days;
				}
				else{
					currentState.weeklyOptions.days = values[5].split(',');
				}
			}
			else{
				//Expression is monthly
				currentState.pattern = 'monthly';
				var state = currentState.monthlyOptions;

				if (values[3] == 'L'){
					state.selected == 'last';
				}
				else if (values[5].indexOf('#') > 0){
					var weekdays = values[5].split('#');

					state.selected = 'week';
					state.dayOfWeek = weekdays[0];
					state.occurrence = '#' + weekdays[1];
				}
				else if (values[5].indexOf('L') > 0){
					var weekday = values[5].split('L')[0];

					state.selected = 'week';
					state.dayOfWeek = weekday;
					state.occurrence = 'L';
				}
				else{
					state.selected = 'date';
					if (values[3].indexOf('-') > 0){
						var inDays = values[3].split('-');
						var days = [];
						for (var i = parseInt(inDays[0]); i <= parseInt(inDays[1]); i++) {
							days.push(i);
						};
						state.days = days;
					}
					else{
						state.days = values[3].split(',');
					}
					
				}
			}

			

			disableUiUpdates = true;
			updateDom();
			disableUiUpdates = false;
		};

		this.getCron = function(){
			var minute = '*',
				hour = '*',
				dayOfMonth = '*',
				month = '*',
				year = '*',
				dayOfWeek = '?';

			if (currentState.time != ''){
				var timeArr = currentState.time.split(':');
				hour = parseInt(timeArr[0]) + "";
				minute = parseInt(timeArr[1]) + "";
			}

			switch (currentState.pattern){
				case 'daily':
					var state = currentState.dailyOptions;
					switch (state.selected){
						case 'daily':
							//Do nothing - use defaults
							break;							
						case 'weekday':
							dayOfWeek = '2-6';
							dayOfMonth = '?';
							break;
						default:
							throw 'Unknown daily state: ' + state.selected;
					}
					break;
				case 'weekly':
					dayOfWeek = currentState.weeklyOptions.days.join(',');
					dayOfMonth = '?';
					break;
				case 'monthly':
					var state = currentState.monthlyOptions;
					switch (state.selected){
						case 'date':
							dayOfMonth = state.days.join(',');
							break;
						case 'last':
							dayOfMonth = 'L';
							break;							
						case 'week':
							dayOfMonth = '?';
							dayOfWeek = state.dayOfWeek + state.occurrence;
							break;
						default:
							throw 'Unknown monthly state: ' + state.selected;
					}
					break;					
				case 'yearly':
					var state = currentState.yearlyOptions;

					month = state.months.join(',');
					switch (state.selected){
						case 'specificDay':
							dayOfMonth = state.days.join(',');
							break;
						case 'weekOccurrence':
							dayOfMonth = '?';
							dayOfWeek = state.dayOfWeek + state.occurrence;
							break;
						default:
							throw 'Unknown yearly state: ' + state.selected;
					}
					break;
				default:
					throw 'Unknown internal state: ' + currentState.pattern;
					break;
			}

			var cron = ['0', minute, hour, dayOfMonth, month, dayOfWeek, year]; //Default state = every minute

			cron = cron.map(function(val){
				if (val == "")
					return '*';

				return val.toString();
			});

			return cron.join(' ');
		};

		function updateDom(){
			$('[name="ScheduleType"][value="' + currentState.pattern + '"]').prop('checked', true).change();
			$('[name="time"]').val(currentState.time).change();

			switch (currentState.pattern){
				case 'daily':
					$('[name="dailyPattern"][value="' + currentState.dailyOptions.selected + '"]').prop('checked', true).change();
					break;
				case 'weekly':
					$.each(currentState.weeklyOptions.days, function(){
						$('[name="weeklyDays"][value="' + this + '"]').prop('checked', true).change();
					});
					break;
				case 'monthly':
					$('[name="monthlyPattern"][value="' + currentState.monthlyOptions.selected + '"]').prop('checked', true).change();
					$('[name="date"]').val(currentState.monthlyOptions.days.join()).change();
					$('[name="weekOccurrence"]').val(currentState.monthlyOptions.occurrence).change();
					$('[name="dayOfWeek"]').val(currentState.monthlyOptions.dayOfWeek).change();
					break;
				case 'yearly':
					$('[name="yearPattern"][value="' + currentState.yearlyOptions.selected + '"]').prop('checked', true).change();
					$('[name="monthSpecificDay"]').multipleSelect('setSelects', currentState.yearlyOptions.months);
					$('[name="dayOfMonth"]').val(currentState.yearlyOptions.days.join()).change();
					$('[name="dayOfWeek"]').val(currentState.yearlyOptions.dayOfWeek).change();
					$('[name="weekOccurrence"]').val(currentState.yearlyOptions.occurrence).change();
					break;
			}
		}

		function updateFromDom(){
			if (disableUiUpdates)
				return;

			currentState.pattern = $('[name="ScheduleType"]:checked').val();
			currentState.time = $('[name="time"]').val();

			switch (currentState.pattern){
				case 'daily':
					currentState.dailyOptions.selected = $('[name="dailyPattern"]:checked').val();
					break;
				case 'weekly':
					currentState.weeklyOptions.days = $('[name="weeklyDays"]:checkbox:checked').map(function() {return this.value;}).get();
					break;
				case 'monthly':
					var state = currentState.monthlyOptions;
					state.selected = $('[name="monthlyPattern"]:checked').val();
					state.occurrence = $('[name="weekOccurrence"]').val();
					state.dayOfWeek = $('[name="dayOfWeek"]').val();
					state.days = $('[name="date"]').val().split(/[\s,]+/);
					break;
				case 'yearly':
					var state = currentState.yearlyOptions;
					state.selected = $('[name="yearPattern"]:checked').val();
					state.months = $('[name="monthSpecificDay"]').multipleSelect('getSelects');
					state.days = $('[name="dayOfMonth"]').val().split(/[\s,]+/).sort(function(a, b){return (parseInt(b) < parseInt(a))});
					state.occurrence = $('[name="weekOccurrence"]').val();
					state.dayOfWeek = $('[name="dayOfWeek"]').val();
					break;
			}
		}

		this.toEnglishString = function(){
			var result = '';

			switch (currentState.pattern){
				case 'daily':
					result = "Every " + (currentState.dailyOptions.selected == 'weekday' ? 'week' : '') + "day at " + currentState.time;
					break;
				case 'weekly':
					var days = $(currentState.weeklyOptions.days).map(function(i, val){
						var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
						var res = dayList[parseInt(val) - 1];
						return res;
					});
					result = "Every week on " + $.makeArray(days).join(', ') + " at " + currentState.time;
					break;
				case 'monthly':
					result = "Every month on the " + currentState.monthlyOptions.days.join(', ') + " at " + currentState.time;
					break;
				case 'yearly':
					var months = $(currentState.yearlyOptions.months).map(function(i, val){
						var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
						var res = monthList[parseInt(val) - 1];
						return res;
					});
					result = "Every year on " + $.makeArray(months).join(', ') + " " + currentState.yearlyOptions.days.join(', ') + " at " + currentState.time;
					break;
				default:
					throw 'Not implemented: ' + currentState.pattern + '.toEnglishString';
			}

			return result;
		}

		try{
			this.init();
		}
		catch(e){ 
		}
	}
	this.jqCron = jqCron;	
}).call(this, jQuery);




/*$(function(){
	a = new jqCron();
	console.log(a.getCron());
});*/