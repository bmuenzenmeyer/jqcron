(function ($) {
	$.fn.jsCronUI = function (settings) {
		var value;

		//if (!settings) {
		//    settings = {};
		//}

		if (typeof settings === 'string') {
			//call method
			var args = Array.prototype.slice.call(arguments, 1);

			this.each(function () {
				var instance = $.data(this, 'jsCronUI');
				if (!instance) {
					throw 'Cannot call method ' + settings + ' on jsCronUI prior to initialization';
				}
				if (!$.isFunction(instance[settings]) || settings.charAt(0) === '_') {
					throw 'No such method ' + settings;
				}
				value = instance[settings].apply(instance, args);
			});
		} else {
			return this.each(function () {
				var cron;
				var $this = $(this);
				cron = new jsCronUI(settings, $this);

				$(this).data('jsCronUI', cron);
			});
		}

		return typeof value !== 'undefined' ? value : this;
	};
}).call(this, jQuery);

(function ($) {
	function jsCronUI(settings, $element) {
		var self = this;
		self.$el = $element;
		var disableUiUpdates = false;
		var currentState = {
			time: '12:00',
			pattern: 'monthly',
			dailyOptions: {
				selected: ''
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

		this.reset = function () {
			currentState = {
				time: '12:00',
				pattern: 'monthly',
				dailyOptions: {
					selected: ''
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

			disableUiUpdates = true;
			updateDom();
			disableUiUpdates = false;
		};

		this.init = function () {

			if (!settings.bind_to || !settings.bind_to instanceof jQuery) {
				self.$el.append('<div class="c-schedule-type"><ul class="c-schedule-type-options"><li><input type="radio" value="daily" name="ScheduleType"/>Daily</li><li><input type="radio" value="weekly" name="ScheduleType"/>Weekly</li><li><input type="radio" value="monthly" name="ScheduleType"/>Monthly</li><li><input type="radio" value="yearly" name="ScheduleType"/>Yearly</li></ul></div><div class="c-schedule-options" style="display: none;"><div class="js-schedule-tod"><label> Time<input type="time" name="time" /></label></div></div><div class="js-schedule-daily"><div><input type="radio" value="daily" name="dailyPattern" />Every day</div><div><input type="radio" value="weekday" name="dailyPattern" />Every weekday</div></div><div class="js-schedule-weekly"><div>Recur every week on:<br/><span><input type="checkbox" value="1" name="weeklyDays" />Sunday</span><span><input type="checkbox" value="2" name="weeklyDays" />Monday</span><span><input type="checkbox" value="3" name="weeklyDays" />Tuesday</span><span><input type="checkbox" value="4" name="weeklyDays" />Wednesday</span><span><input type="checkbox" value="5" name="weeklyDays" />Thursday</span><span><input type="checkbox" value="6" name="weeklyDays" />Friday</span><span><input type="checkbox" value="7" name="weeklyDays" />Saturday</span></div></div><div class="js-schedule-monthly"><div><input type="radio" value="date" name="monthlyPattern" />Day(s) <input name="date" /> of every month<br/></div><div><input type="radio" value="last" name="monthlyPattern" />The last day of the month.</div><div><input type="radio" value="week" name="monthlyPattern" />The<select name="weekOccurrence"><option value="#1">First</option><option value="#2">Second</option><option value="#3">Third</option><option value="#4">Fourth</option><option value="#5">Fifth</option><option value="L">Last</option></select><select name="dayOfWeek"><option value="1">Sunday</option><option value="2">Monday</option><option value="3">Tuesday</option><option value="4">Wednesday</option><option value="5">Thursday</option><option value="6">Friday</option><option value="7">Saturday</option></select> of every month.</div></div><div class="js-schedule-yearly"><div>Recur every year</div><div><input type="radio" name="yearPattern" value="specificDay"/>On:<select multiple name="monthSpecificDay"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select><input name="dayOfMonth" /></div><div><input type="radio" name="yearPattern" value="weekOccurrence" />On the:<select name="weekOccurrence"><option value="#1">First</option><option value="#2">Second</option><option value="#3">Third</option><option value="#4">Fourth</option><option value="#5">Fifth</option><option value="L">Last</option></select><select name="dayOfWeek"><option value="1">Sunday</option><option value="2">Monday</option><option value="3">Tuesday</option><option value="4">Wednesday</option><option value="5">Thursday</option><option value="6">Friday</option><option value="7">Saturday</option></select> of<select multiple name="monthOccurrence"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select></div></div>');
			}

			wireEvents();
			updateDom();

			self.$el.find('input,select').on('change', function () {
				updateFromDom();
			});
		};

		this.setCron = function (expression) {
			function pad(string, max) {
				string = string.toString();

				return string.length < max ? pad("0" + string, max) : string;
			}

			if (!expression) {
				return;
			}

			//Model expression format: ss MM hh dd mm ww yyyy
			var values = expression.split(' ');

			if (values.length == 6) {
				values.push("*"); //explicitely declare every year
			}

			if (values.length != 7) {
				throw "Invalid Cron: " + expression;
			}

			//reset model to default values
			this.reset();

			currentState.time = pad(values[2], 2) + ':' + pad(values[1], 2);

			if (values[4] != '*') {
				var state = currentState.yearlyOptions;
				//Expression is yearly
				currentState.pattern = 'yearly';
				state.months = values[4].split(',');

				if (values[3] != '?') {
					//Specific day of the month
					state.selected = 'specificDay';
					state.days = values[3].split(',');
				}
				else if (values[5].indexOf('#') > 0) {
					//Specific occurrence of the month
					state.selected = 'weekOccurrence';
					var occArr = values[5].split('#');

					state.dayOfWeek = occArr[0];
					state.occurrence = '#' + occArr[1];
				}
				else {
					throw "Unrecognized yearly cron pattern: " + expression;
				}
			}
			else if (values[3] == '*' || values[5] == '*') {
				//Expression is daily - every day
				currentState.pattern = 'daily';
				currentState.dailyOptions.selected = 'daily';
			}
			else if (values[5] == '2-6' || values[5] == '2,3,4,5,6') {
				//Expression is daily - weekdays
				currentState.pattern = 'daily';
				currentState.dailyOptions.selected = 'weekday';
			}
			else if (values[5].indexOf('#') == -1 && values[5].indexOf('L') == -1 && values[5] != '?') {
				//Expression is weekly
				currentState.pattern = 'weekly';
				if (values[5].indexOf('-') > 0) {
					var inDays = values[5].split('-');
					var days = [];
					for (var i = parseInt(inDays[0]) ; i <= parseInt(inDays[1]) ; i++) {
						days.push(i);
					};
					currentState.weeklyOptions.days = days;
				}
				else {
					currentState.weeklyOptions.days = values[5].split(',');
				}
			}
			else {
				//Expression is monthly
				currentState.pattern = 'monthly';
				var state = currentState.monthlyOptions;

				if (values[3] == 'L') {
					state.selected = 'last';
				}
				else if (values[5].indexOf('#') > 0) {
					var weekdays = values[5].split('#');

					state.selected = 'week';
					state.dayOfWeek = weekdays[0];
					state.occurrence = '#' + weekdays[1];
				}
				else if (values[5].indexOf('L') > 0) {
					var weekday = values[5].split('L')[0];

					state.selected = 'week';
					state.dayOfWeek = weekday;
					state.occurrence = 'L';
				}
				else {
					state.selected = 'date';
					if (values[3].indexOf('-') > 0) {
						var inDays = values[3].split('-');
						var days = [];
						for (var i = parseInt(inDays[0]) ; i <= parseInt(inDays[1]) ; i++) {
							days.push(i);
						};
						state.days = days;
					}
					else {
						state.days = values[3].split(',');
					}

				}
			}

			disableUiUpdates = true;
			updateDom();
			disableUiUpdates = false;
		};

		this.getCron = function () {
            var minute = '*',
            hour = '*',
            dayOfMonth = '*',
            month = '*',
            year = '*',
            dayOfWeek = '?';

			if (currentState.time != '') {
				var timeArr = currentState.time.split(':');
				hour = parseInt(timeArr[0]) + "";
				minute = parseInt(timeArr[1]) + "";
			}

			switch (currentState.pattern) {
				case 'daily':
					var state = currentState.dailyOptions;
					switch (state.selected) {
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
					switch (state.selected) {
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
					switch (state.selected) {
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

			cron = cron.map(function (val) {
				if (val == "")
					return '*';

				return val.toString();
			});

			return cron.join(' ');
		};

		function updateDom() {
			self.$el.find('[name="ScheduleType"][value="' + currentState.pattern + '"]').prop('checked', true).change();
			self.$el.find('[name="time"]').val(currentState.time).change();

			switch (currentState.pattern) {
				case 'daily':
					self.$el.find('[name="dailyPattern"][value="' + currentState.dailyOptions.selected + '"]').prop('checked', true).change();
					break;
				case 'weekly':
					$.each(currentState.weeklyOptions.days, function () {
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
		};

		function updateFromDom() {
			if (disableUiUpdates)
				return;

			currentState.pattern = self.$el.find('[name="ScheduleType"]:checked').val();
			currentState.time = self.$el.find('[name="time"]').val();

			switch (currentState.pattern) {
				case 'daily':
					currentState.dailyOptions.selected = self.$el.find('[name="dailyPattern"]:checked').val();
					break;
				case 'weekly':
					currentState.weeklyOptions.days = self.$el.find('[name="weeklyDays"]:checkbox:checked').map(function () { return this.value; }).get();
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
					state.days = self.$el.find('[name="dayOfMonth"]').val().split(/[\s,]+/).sort(function (a, b) { return (parseInt(b) < parseInt(a)) });
					state.occurrence = self.$el.find('[name="weekOccurrence"]').val();
					state.dayOfWeek = self.$el.find('[name="dayOfWeek"]').val();
					break;
			}
		};

		function hideAll() {
			self.$el.find('.js-schedule-daily').hide();
			self.$el.find('.js-schedule-weekly').hide();
			self.$el.find('.js-schedule-monthly').hide();
			self.$el.find('.js-schedule-yearly').hide();
		};

		function wireEvents() {
			self.$el.find('select[name^="month"]').multipleSelect({
				width: 300,
				multiple: true,
				multipleWidth: 149,
				placeholder: 'Select months',
				selectAll: false,
				minimumCountSelected: 4,
				ellipsis: true,
				allSelected: 'Every month'
			});

			self.$el.find('select[name="monthSpecificDay"]').on('change', function () {
				var thisSelects = $(this).multipleSelect('getSelects');
				var monthOccurrenceSelects = self.$el.find('select[name="monthOccurrence"]').multipleSelect('getSelects');

				//Check to see if they match - otherwise the updates get called recursively forever
				if (!($(thisSelects).not(monthOccurrenceSelects).length === 0 && $(monthOccurrenceSelects).not(thisSelects).length === 0)) {
					self.$el.find('select[name="monthOccurrence"]').multipleSelect('setSelects', $(this).multipleSelect('getSelects'));
				}
			});

			self.$el.find('select[name="monthOccurrence"]').on('change', function () {
				var thisSelects = $(this).multipleSelect('getSelects');
				var specificDaySelects = self.$el.find('select[name="monthSpecificDay"]').multipleSelect('getSelects');

				//Check to see if they match - otherwise the updates get called recursively forever
				if (!($(thisSelects).not(specificDaySelects).length === 0 && $(specificDaySelects).not(thisSelects).length === 0)) {
					self.$el.find('select[name="monthSpecificDay"]').multipleSelect('setSelects', $(this).multipleSelect('getSelects'));
				}
			})

			self.$el.find('[name="ScheduleType"]').on('change', function () {
				self.$el.find('.c-schedule-options').show();
				var scr = '.js-schedule-' + $(this).val();
				hideAll();
				self.$el.find(scr).show();
			});

			//synchronize inputs that have the same name across all options
			self.$el.find('[name$="Frequency"]').on('change', function () {
				self.$el.find('[name$="Frequency"]').val($(this).val());
			});

			self.$el.find('[name="weekOccurrence"]').on('change', function () {
				self.$el.find('[name="weekOccurrence"]').val($(this).val());
			});

			self.$el.find('[name="dayOfWeek"]').on('change', function () {
				self.$el.find('[name="dayOfWeek"]').val($(this).val());
			});

			self.$el.find('[name="month"]').on('change', function () {
				self.$el.find('[name="month"]').val($(this).val());
			});
		};

		this.toEnglishString = function (template) {
		    var result = '';
		    
		    if (!template) {
		        template = '<time>';
		    }

		    if (template.indexOf('<time>')) {
		        return template;
		    }

			var toTimeString = function (val) {
			    var time = val.trim().match(/^(\d{2})(?::)(\d{2})(?::)?(\d{2})?$/i);
			    if (time === null) return null;

			    var hours = Number(time[1]);
			    var minutes = Number(time[2]);
			    var ampm = 'am';

			    if (hours >= 12) {
			        ampm = 'pm';
			        hours = hours === 12 ? 12 : hours - 12;
			    }
			    if (hours === 0)
			        hours = 12;

			    return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm.toUpperCase();
			}

			var timeString = toTimeString(currentState.time);

			var toAltValues = function (stringsArr, values) {
				if ($.isArray(values)) {
					res = $(values).map(function (i, val) { return stringsArr[parseInt(val) - 1]; });
				} else {
					res = stringsArr[parseInt(values) - 1];
				}

				return $.makeArray(res);
			}

			var toEnglishDays = function (values) {
				var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

				return toAltValues(dayList, values);
			};

			var toEnglishMonths = function (values) {
				var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

				return toAltValues(monthList, values);
			};

			var toEnglishOccurrence = function (values) {
				var occurrenceList = ["first", "second", "third", "fourth", "fifth"];

				return toAltValues(occurrenceList, values);
			};

			switch (currentState.pattern) {
				case 'daily':
				    result = "Every " + (currentState.dailyOptions.selected == 'weekday' ? 'week' : '') + "day at " + timeString;
					break;
				case 'weekly':
				    result = "Every week on " + toEnglishDays(currentState.weeklyOptions.days).join(', ') + " at " + timeString;
					break;
				case 'monthly':
					var state = currentState.monthlyOptions;
					result = 'Every month on the ';
					switch (state.selected) {
						case 'date':
						    result += state.days.join(', ') + " at " + timeString;
							break;
						case 'week':
							if (state.occurrence != '') {
								if (state.occurrence == 'L') {
									result += "last";
								} else {
									result += toEnglishOccurrence(state.occurrence.split('#')).join('');
								}

								result += " " + toEnglishDays(state.dayOfWeek).join('') + " at " + timeString;
							}
							break;
						case 'last':
						    result += "last day of the month at " + timeString;
							break;
						default:
							throw 'Not implemented: Monthly.' + state.selected + '.toEnglishString';
					}
					break;
				case 'yearly':
					var state = currentState.yearlyOptions;
					switch (state.selected) {
						case 'specificDay':
						    result = "Every year on " + toEnglishMonths(state.months).join(', ') + " " + state.days.join(', ') + " at " + timeString;
							break;
						case 'weekOccurrence':
						    result = "Every year on the " + toEnglishOccurrence(state.occurrence.split('#')).join('') + " " + toEnglishDays(state.dayOfWeek).join('') + " of " + toEnglishMonths(state.months).join(', ') + " at " + timeString;
							break;
						default:
							throw 'Not implemented: Yearly.' + state.selected + '.toEnglishString';
					}

					break;
				default:
					throw 'Not implemented: ' + currentState.pattern + '.toEnglishString';
			}
            			
			return template.replace('<time>', result);
		};

		try {
			this.init();
		}
		catch (e) {
			console.log(e);
		}
	}
	this.jsCronUI = jsCronUI;
}).call(this, jQuery);
