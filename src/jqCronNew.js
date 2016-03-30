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
					//BM: This seems like an assumption that could be done later / by the caller
					settings.bind_to.blur(function(){
						var value = settings.bind_method.get(settings.bind_to);
						$this.jqCronGetInstance().setCron(value);
					});
				}
				saved = settings.bind_method.get(settings.bind_to);
				cron = new jqCron(settings, $this);
				cron.setCron(saved);
			}
			else {
				cron = new jqCron(settings, $this);
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

(function($){
	function jqCron(settings, $element){
		//BM: pass this stuff in so you can wire up the handlers to $el inside init among other things
		console.log(settings);
		console.log($element);
		var self = this;
		self.$el = $element;
		var disableUiUpdates = false;
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

		this.init = function(){
			wireEvents();

			updateDom();
			self.$el.find('input,select').on('change', function(){
				updateFromDom();
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
			else if (values[5].indexOf('#') == -1 && values[5].indexOf('L') == -1){
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
			self.$el.find('[name="ScheduleType"][value="' + currentState.pattern + '"]').prop('checked', true).change();
			self.$el.find('[name="time"]').val(currentState.time).change();

			switch (currentState.pattern){
				case 'daily':
					self.$el.find('[name="dailyPattern"][value="' + currentState.dailyOptions.selected + '"]').prop('checked', true).change();
					break;
				case 'weekly':
					$.each(currentState.weeklyOptions.days, function(){
						self.$el.find('[name="weeklyDays"][value="' + this + '"]').prop('checked', true).change();
					});
					break;
				case 'monthly':
					self.$el.find('[name="monthlyPattern"][value="' + currentState.monthlyOptions.selected + '"]').prop('checked', true).change();
					self.$el.find('[name="date"]').val(currentState.monthlyOptions.days.join()).change();
					self.$el.find('[name="weekOccurrence"]').val(currentState.monthlyOptions.occurrence).change();
					self.$el.find('[name="dayOfWeek"]').val(currentState.monthlyOptions.dayOfWeek).change();
					break;
				case 'yearly':
					self.$el.find('[name="yearPattern"][value="' + currentState.yearlyOptions.selected + '"]').prop('checked', true).change();
					self.$el.find('[name="monthSpecificDay"]').multipleSelect('setSelects', currentState.yearlyOptions.months);
					self.$el.find('[name="dayOfMonth"]').val(currentState.yearlyOptions.days.join()).change();
					self.$el.find('[name="dayOfWeek"]').val(currentState.yearlyOptions.dayOfWeek).change();
					self.$el.find('[name="weekOccurrence"]').val(currentState.yearlyOptions.occurrence).change();
					break;
			}
		}

		function updateFromDom(){
			if (disableUiUpdates)
				return;

			currentState.pattern = self.$el.find('[name="ScheduleType"]:checked').val();
			currentState.time = self.$el.find('[name="time"]').val();

			switch (currentState.pattern){
				case 'daily':
					currentState.dailyOptions.selected = self.$el.find('[name="dailyPattern"]:checked').val();
					break;
				case 'weekly':
					currentState.weeklyOptions.days = self.$el.find('[name="weeklyDays"]:checkbox:checked').map(function() {return this.value;}).get();
					break;
				case 'monthly':
					var state = currentState.monthlyOptions;
					state.selected = self.$el.find('[name="monthlyPattern"]:checked').val();
					state.occurrence = self.$el.find('[name="weekOccurrence"]').val();
					state.dayOfWeek = self.$el.find('[name="dayOfWeek"]').val();
					state.days = self.$el.find('[name="date"]').val().split(/[\s,]+/);
					break;
				case 'yearly':
					var state = currentState.yearlyOptions;
					state.selected = self.$el.find('[name="yearPattern"]:checked').val();
					state.months = self.$el.find('[name="monthSpecificDay"]').multipleSelect('getSelects');
					state.days = self.$el.find('[name="dayOfMonth"]').val().split(/[\s,]+/).sort(function(a, b){return (parseInt(b) < parseInt(a))});
					state.occurrence = self.$el.find('[name="weekOccurrence"]').val();
					state.dayOfWeek = self.$el.find('[name="dayOfWeek"]').val();
					break;
			}
		}

		function hideAll(){
			//BM: convert these to their js equivalents. make sure you handle that autogenned #ID too
			self.$el.find('#dailyOptions').hide();
			self.$el.find('#weeklyOptions').hide();
			self.$el.find('#monthlyOptions').hide();
			self.$el.find('#yearlyOptions').hide();
		};

		function wireEvents() {
			self.$el.find('select[name^="month"]').multipleSelect({
				width: 260,
				multiple: true,
				multipleWidth: 120,
				placeholder: 'Select months',
				selectAll: false,
				minimumCountSelected: 4,
				ellipsis: true,
				allSelected: 'Every month'
			});

			self.$el.find('select[name="monthSpecificDay"]').on('change', function(){
				var thisSelects = $(this).multipleSelect('getSelects');
				var monthOccurrenceSelects = self.find('select[name="monthOccurrence"]').multipleSelect('getSelects');

				//Check to see if they match - otherwise the updates get called recursively forever
				if (!($(thisSelects).not(monthOccurrenceSelects).length === 0 && $(monthOccurrenceSelects).not(thisSelects).length === 0)){
					self.find('select[name="monthOccurrence"]').multipleSelect('setSelects', $(this).multipleSelect('getSelects'));
				}
			});

			self.$el.find('select[name="monthOccurrence"]').on('change', function(){
				var thisSelects = $(this).multipleSelect('getSelects');
				var specificDaySelects = $self.find('select[name="monthSpecificDay"]').multipleSelect('getSelects');

				//Check to see if they match - otherwise the updates get called recursively forever
				if (!($(thisSelects).not(specificDaySelects).length === 0 && $(specificDaySelects).not(thisSelects).length === 0)){
					self.find('select[name="monthSpecificDay"]').multipleSelect('setSelects', $(this).multipleSelect('getSelects'));
				}
			})

			self.$el.find('[name="ScheduleType"]').on('change', function(){
				self.$el.find('.c-schedule-options').show();
				var scr = "#" + $(this).val() + "Options";
				hideAll();
				self.$el.find(scr).show();
			});

			//synchronize inputs that have the same name across all options
			self.$el.find('[name$="Frequency"]').on('change', function(){
				self.$el.find('[name$="Frequency"]').val($(this).val());
			});

			self.$el.find('[name="weekOccurrence"]').on('change', function(){
				self.$el.find('[name="weekOccurrence"]').val($(this).val());
			});

			self.$el.find('[name="dayOfWeek"]').on('change', function(){
				self.$el.find('[name="dayOfWeek"]').val($(this).val());
			});

			self.$el.find('[name="month"]').on('change', function(){
				self.$el.find('[name="month"]').val($(this).val());
			});
		}

		this.toEnglishString = function(){
			if (currentState.pattern == 'daily'){
				result = "Every " + (currentState.dailyOptions.selected == 'weekday' ? 'week' : '') + "day at " + currentState.time;
			}
			else if (currentState.pattern == 'weekly'){
				var days = self.$el.find(currentState.weeklyOptions.days).map(function(i, val){
					var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
					var res = dayList[parseInt(val) - 1];
					return res;
				});
				result = "Every week on " + $.makeArray(days).join(', ') + " at " + currentState.time;
			}

			return result;
		}

		try{
			this.init();
		}
		catch(e){
			console.log(e);
		}
	}
	this.jqCron = jqCron;
}).call(this, jQuery);
