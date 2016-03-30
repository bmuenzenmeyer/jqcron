describe("JQCron", function(){
    beforeAll(function() {   
        $(function () {
            $('#Schedule').jqCron({});
        });     
    });


    beforeEach(function() {
        $('#Schedule input:checked').prop('checked', false);        
        $('#Schedule').jqCronGetInstance().reset();
    });

    describe("should translate a CRON schedule", function() {

        it("for every day correctly", function () {
            var cronExp = "0 20 10 * * ?";
            var cronHumanTextInEnglish = "Every day at 10:20";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for every weekday correctly", function () {
            var cronExp = "0 20 10 ? * 2-6";
            var cronHumanTextInEnglish = "Every weekday at 10:20";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for every week correctly", function () {
            var cronExp = "0 23 14 ? * 1,4";
            var cronHumanTextInEnglish = "Every week on Sunday, Wednesday at 14:23";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for every month correctly", function () {
            var cronExp = "0 52 9 26 * ?";
            var cronHumanTextInEnglish = "Every month on the 26 at 09:52";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for every year correctly", function () {
            var cronExp = "0 34 21 3 5 ?";
            var cronHumanTextInEnglish = "Every year on May 3 at 21:34";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for the last saturday of month correctly", function () {
            var cronExp = "0 15 10 ? * 6L";
            var cronHumanTextInEnglish = "Every month on the last Friday at 10:15";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for the last day of the month correctly", function () {
            var cronExp = "0 15 10 L * ?";
            var cronHumanTextInEnglish = "Every month on the last day of the month at 10:15";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for the specific occurrence a day of a month correctly", function () {
            var cronExp = "0 15 10 ? * 7#3";
            var cronHumanTextInEnglish = "Every month on the third Saturday at 10:15";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

    });

    describe("should correctly intrepret dropdowns", function() {

        it("for every day", function () {
            var cronExp = "0 20 5 * * ? *";
            var englishString = "Every day at 05:20";

            $('#Schedule [name="ScheduleType"][value="daily"]').click();
            $('#Schedule #timeOfDayOptions [name="dailyPattern"][value="daily"]').click();
            $('#Schedule [name="time"]').val("05:20").change();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every weekday", function(){
            var cronExp = "0 21 7 ? * 2-6 *";
            var englishString = "Every weekday at 07:21";

            $('#Schedule [name="ScheduleType"][value="daily"]').click();
            $('#Schedule #timeOfDayOptions [name="dailyPattern"][value="weekday"]').click();
            $('#Schedule [name="time"]').val("07:21").change();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every week", function () {
            var cronExp = "0 20 10 ? * 1,2,3,4,5 *";
            var englishString = "Every week on Sunday, Monday, Tuesday, Wednesday, Thursday at 10:20";

            $('#Schedule [name="ScheduleType"][value="weekly"]').click();
            $('#Schedule [name="time"]').val("10:20").change();
            $('#Schedule #timeOfDayOptions #weeklyOptions input[name="weeklyDays"][value="1"]').click();
            $('#Schedule #timeOfDayOptions #weeklyOptions input[name="weeklyDays"][value="2"]').click();
            $('#Schedule #timeOfDayOptions #weeklyOptions input[name="weeklyDays"][value="3"]').click();
            $('#Schedule #timeOfDayOptions #weeklyOptions input[name="weeklyDays"][value="4"]').click();
            $('#Schedule #timeOfDayOptions #weeklyOptions input[name="weeklyDays"][value="5"]').click();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);    
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for specific range of days of the month", function () {
            var cronExp = "0 52 8 8-11 * ? *";
            var englishString = "Every month on the 8-11 at 08:52";

            $('#Schedule [name="ScheduleType"][value="monthly"]').click();
            $('#Schedule [name="time"]').val("08:52").change();
            $('#Schedule #timeOfDayOptions #monthlyOptions [name="monthlyPattern"][value="date"]').click();
            $('#Schedule #timeOfDayOptions #monthlyOptions [name="date"]').val('8-11').change();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for specific days of the month", function () {
            var cronExp = "0 52 9 8,14,26 * ? *";
            var englishString = "Every month on the 8, 14, 26 at 09:52";

            $('#Schedule [name="ScheduleType"][value="monthly"]').click();
            $('#Schedule [name="time"]').val("09:52").change();
            $('#Schedule #timeOfDayOptions #monthlyOptions [name="monthlyPattern"][value="date"]').click();
            $('#Schedule #timeOfDayOptions #monthlyOptions [name="date"]').val('8,14,26').change();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for specific occurrence of the month", function () {
            var cronExp = "0 4 9 ? * 2#3 *";
            var englishString = "Every month on the third Monday at 09:04";

            $('#Schedule [name="ScheduleType"][value="monthly"]').click();
            $('#Schedule [name="time"]').val("09:04").change();
            $('#Schedule #timeOfDayOptions #monthlyOptions [name="monthlyPattern"][value="week"]').click();
            $('#Schedule #timeOfDayOptions #monthlyOptions [name="weekOccurrence"]').val('#3').change();
            $('#Schedule #timeOfDayOptions #monthlyOptions [name="dayOfWeek"]').val('2').change();
            
            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every year", function () {
            var cronExp = "0 34 21 3 5 ? *";
            
            /*clickValue(periodSelector, "year");
            clickValue(minuteSelector, "34");
            clickValue(timeHourSelector, "21");
            clickValue(dayOfMonthSelector, "03");
            clickValue(monthSelector, "may");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for the last saturday of month", function () {
            var cronExp = "0 15 10 ? * 6L *";
            
            /*clickValue(periodSelector, "month");
            clickValue(dayOfMonthOccurrenceSelector, "the last");
            clickValue(dayOfWeekSelector, "saturday");
            clickValue(minuteSelector, "15");
            clickValue(timeHourSelector, "10");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for the last day of a month", function () {
            var cronExp = "0 15 10 L * ? *";
            
            /*clickValue(periodSelector, "month");
            clickValue(dayOfMonthOccurrenceSelector, "the last");
            clickValue(minuteSelector, "15");
            clickValue(timeHourSelector, "10");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for a specific occurrence of a day every month", function () {
            var cronExp = "0 15 10 ? * 6#3 *";
            
            /*clickValue(periodSelector, "month");
            clickValue(dayOfMonthOccurrenceSelector, "the third");
            clickValue(dayOfWeekSelector, "saturday");
            clickValue(minuteSelector, "15");
            clickValue(timeHourSelector, "10");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("when changing occurrence multiple times", function () {
            var cronExp = "0 15 10 15-16 * ? *";
            
            /*clickValue(periodSelector, "month");
            clickValue(dayOfMonthOccurrenceSelector, "the third");
            clickValue(dayOfWeekSelector, "friday");
            clickValue(minuteSelector, "15");
            clickValue(timeHourSelector, "10");
            clickValue(dayOfWeekOccurrenceSelector, "every");
            clickValue(dayOfMonthSelector, "15");
            clickValue(dayOfMonthSelector, "16");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });
    });

    describe("UI should", function() {

        it ("ensure the occurrence is hidden for 'week' options", function(){
            var cronHumanTextInEnglish = "Every week on friday at 16:05";

            /*clickValue(periodSelector, "week");
            clickValue(dayOfWeekSelector, "friday");
            clickValue(timeHourSelector, "16");
            clickValue(timeMinuteSelector, "05");*/

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);        
        });

        it ("ensure the day of the week is visible for 'month' options when 'every' occurrence isn't set", function(){
            var cronHumanTextInEnglish = "Every month on the second sunday at 14:25";

            /*clickValue(periodSelector, "month");
            clickValue(dayOfMonthOccurrenceSelector, "the second");
            clickValue(dayOfWeekSelector, "sunday");
            clickValue(timeHourSelector, "14");
            clickValue(timeMinuteSelector, "25");*/

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);        
        });

        it ("ensure the occurrence is hidden for 'month' options when days are chosen", function(){
            var cronHumanTextInEnglish = "Every month on 18,26 at 13:20";

            /*clickValue(periodSelector, "month");
            clickValue(timeHourSelector, "13");
            clickValue(timeMinuteSelector, "20");
            clickValue(dayOfMonthSelector, "18");
            clickValue(dayOfMonthSelector, "26");*/

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);        
        });

        it ("ensure the occurrence is hidden for 'month' options when days are chosen after changing the occurrence", function(){
            var cronHumanTextInEnglish = "Every month on 18,26 at 13:20";

            /*clickValue(periodSelector, "month");            
            clickValue(timeHourSelector, "13");
            clickValue(timeMinuteSelector, "20");
            clickValue(dayOfMonthOccurrenceSelector, "the fourth");
            clickValue(dayOfMonthOccurrenceSelector, "every");
            clickValue(dayOfMonthSelector, "18");
            clickValue(dayOfMonthSelector, "26");*/

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);        
        });

        it ("ensure the occurrence is hidden for 'week' options even when no day is selected", function(){
            var cronHumanTextInEnglish = "Every week on day of the week at 04:34";
            
            /*clickValue(periodSelector, "month");
            clickValue(periodSelector, "week");
            clickValue(timeHourSelector, "04");
            clickValue(timeMinuteSelector, "34");*/

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it ("not switch week and month positions when selecting a day of the week for a year schedule", function(){
            var cronHumanTextInEnglish = "Every year on the third sunday of august at 06:12";

            /*clickValue(periodSelector, "year");
            clickValue(timeHourSelector, "06");
            clickValue(timeMinuteSelector, "12");
            clickValue(dayOfWeekOccurrenceSelector, "the third");
            clickValue(dayOfWeekSelector, "sunday");
            $('.jqCron-month > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "august"; }).click();*/

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it ("not allow multiple weekdays to be selected when an occurrence is selected", function(){
            var cronHumanTextInEnglish = "Every month on the third saturday at 14:27";

            /*clickValue(periodSelector, "month");
            clickValue(timeHourSelector, "14");
            clickValue(timeMinuteSelector, "27");
            clickValue(dayOfWeekOccurrenceSelector, "the third");
            clickValue(dayOfWeekSelector, "sunday");
            clickValue(dayOfWeekSelector, "saturday");*/

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });
    });
});