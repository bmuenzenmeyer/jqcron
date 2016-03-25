$(function(){
	var hideAll	= function(){
		$('#dailyOptions').hide();
		$('#weeklyOptions').hide();
		$('#monthlyOptions').hide();
		$('#yearlyOptions').hide();		
	};

	hideAll();

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
})
