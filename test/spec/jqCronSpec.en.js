describe("JQCron", function(){
    beforeAll(function() {   
        $(function () {
            $('#Schedule').jqCron({});
        });     
    });


    beforeEach(function() {
        $('#Schedule').jqCronGetInstance().reset();
    });

    describe("should translate a CRON schedule", function() {

        it("for every hour correctly", function () {
            var cronExp = "0 43 * * * ?";
            var cronHumanTextInEnglish = "Every hour at 43 minute(s) past the hour";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });


        it("for every day correctly", function () {
            var cronExp = "0 20 5,7,10 * * ?";
            var cronHumanTextInEnglish = "Every day at 05,07,10:20";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for every week correctly", function () {
            var cronExp = "0 20 10 ? * 1-5";
            var cronHumanTextInEnglish = "Every week on monday-friday at 10:20";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for every month correctly", function () {
            var cronExp = "0 52 8-9 26 * ?";
            var cronHumanTextInEnglish = "Every month on 26 at 08-09:52";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for every year correctly", function () {
            var cronExp = "0 34 21 3 5 ?";
            var cronHumanTextInEnglish = "Every year on 03 of may at 21:34";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for the last saturday of month correctly", function () {
            var cronExp = "0 15 10 ? * 6L";
            var cronHumanTextInEnglish = "Every month on the last saturday at 10:15";

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
            var cronExp = "0 15 10 ? * 6#3";
            var cronHumanTextInEnglish = "Every month on the third saturday at 10:15";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

    });

    describe("should correctly intrepret dropdowns", function() {

        it ("for a specific hour correctly", function(){
            var cronExp = "0 43 * * * ?";

            /*clickValue(periodSelector, "hour");

            clickValue(minuteSelector, "43");        */

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);        
        })

        it("for every day", function () {
            var cronExp = "0 20 5,7,10 * * ?";

            /*clickValue(periodSelector, "day");        
            clickValue(timeHourSelector, "05");        
            clickValue(timeHourSelector, "07");        
            clickValue(timeHourSelector, "10"); 
            clickValue(minuteSelector, "20");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);    
        });

        it("for every week", function () {
            var cronExp = "0 20 10 ? * 1-5";
            
            /*clickValue(periodSelector, "week");
            clickValue(minuteSelector, "20");
            clickValue(timeHourSelector, "10");
            clickValue(dayOfWeekSelector, "monday");
            clickValue(dayOfWeekSelector, "tuesday");
            clickValue(dayOfWeekSelector, "wednesday");
            clickValue(dayOfWeekSelector, "thursday");
            clickValue(dayOfWeekSelector, "friday");*/


            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);    
        });

        it("for every month", function () {
            var cronExp = "0 52 8-9 26 * ?";
            
            /*clickValue(periodSelector, "month");
            clickValue(minuteSelector, "52");
            clickValue(timeHourSelector, "08");
            clickValue(timeHourSelector, "09");
            clickValue(dayOfMonthSelector, "26");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for every year", function () {
            var cronExp = "0 34 21 3 5 ?";
            
            /*clickValue(periodSelector, "year");
            clickValue(minuteSelector, "34");
            clickValue(timeHourSelector, "21");
            clickValue(dayOfMonthSelector, "03");
            clickValue(monthSelector, "may");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for the last saturday of month", function () {
            var cronExp = "0 15 10 ? * 6L";
            
            /*clickValue(periodSelector, "month");
            clickValue(dayOfMonthOccurrenceSelector, "the last");
            clickValue(dayOfWeekSelector, "saturday");
            clickValue(minuteSelector, "15");
            clickValue(timeHourSelector, "10");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for the last day of a month", function () {
            var cronExp = "0 15 10 L * ?";
            
            /*clickValue(periodSelector, "month");
            clickValue(dayOfMonthOccurrenceSelector, "the last");
            clickValue(minuteSelector, "15");
            clickValue(timeHourSelector, "10");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for a specific occurrence of a day every month", function () {
            var cronExp = "0 15 10 ? * 6#3";
            
            /*clickValue(periodSelector, "month");
            clickValue(dayOfMonthOccurrenceSelector, "the third");
            clickValue(dayOfWeekSelector, "saturday");
            clickValue(minuteSelector, "15");
            clickValue(timeHourSelector, "10");*/

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("when changing occurrence multiple times", function () {
            var cronExp = "0 15 10 15-16 * ?";
            
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