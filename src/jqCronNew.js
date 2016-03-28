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
			pattern: 'daily',
			dailyOptions: {
				selected: 'daily'
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

		this.init = function(){
			updateDom();
		}

		this.setCron = function(expression){
			updateDom();
		};

		this.getCron = function(){
			
			return "0 * * * * ?";
		};

		function updateDom(){
			$('[name="ScheduleType"][value="' + currentState.pattern + '"]').prop('checked', true).change();

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
					$('[name="date"]').val(currentState.monthlyOptions.days.join());
					$('[name="weekOccurrence"]').val(currentState.monthlyOptions.occurrence);
					$('[name="dayOfWeek"]').val(currentState.monthlyOptions.dayOfWeek);
					break;
				case 'yearly':
					$('[name="yearPattern"][value="' + currentState.yearlyOptions.selected + '"]').prop('checked', true).change();
					$('[name="monthSpecificDay"]').multipleSelect('setSelects', currentState.yearlyOptions.months);
					$('[name="dayOfMonth"]').val(currentState.yearlyOptions.days.join());
					$('[name="dayOfWeek"]').val(currentState.yearlyOptions.dayOfWeek);
					$('[name="weekOccurrence"]').val(currentState.yearlyOptions.occurrence);
					break;
			}
		}

		try{
			this.init();
		}
		catch(e){ 
		}
	}
	this.jqCron = jqCron;	
}).call(this, jQuery);




$(function(){
	var a = new jqCron();
})