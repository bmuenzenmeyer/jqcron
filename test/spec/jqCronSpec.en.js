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

        it("for the specific day of a year correctly", function () {
            var cronExp = "0 18 22 14 11 ? *";
            var cronHumanTextInEnglish = "Every year on November 14 at 22:18";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

        it("for the specific occurrence of a year correctly", function () {
            var cronExp = "0 3 1 ? 12 2#4 *";
            var cronHumanTextInEnglish = "Every year on the fourth Monday of December at 01:03";

            $('#Schedule').jqCronGetInstance().setCron(cronExp);

            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(cronHumanTextInEnglish);
        });

    });

    describe("should correctly intrepret dropdowns", function() {

        it("for every day", function () {
            var cronExp = "0 20 5 * * ? *";
            var englishString = "Every day at 05:20";

            $('#Schedule [name="ScheduleType"][value="daily"]').click();
            $('#Schedule [name="dailyPattern"][value="daily"]').click();
            $('#Schedule [name="time"]').val("05:20").change();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every weekday", function(){
            var cronExp = "0 21 7 ? * 2-6 *";
            var englishString = "Every weekday at 07:21";

            $('#Schedule [name="ScheduleType"][value="daily"]').click();
            $('#Schedule [name="dailyPattern"][value="weekday"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("07:21").change();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every week", function () {
            var cronExp = "0 20 10 ? * 1,2,3,4,5 *";
            var englishString = "Every week on Sunday, Monday, Tuesday, Wednesday, Thursday at 10:20";

            $('#Schedule [name="ScheduleType"][value="weekly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("10:20").change();
            $('#Schedule #weeklyOptions input[name="weeklyDays"][value="1"]').click();
            $('#Schedule #weeklyOptions input[name="weeklyDays"][value="2"]').click();
            $('#Schedule #weeklyOptions input[name="weeklyDays"][value="3"]').click();
            $('#Schedule #weeklyOptions input[name="weeklyDays"][value="4"]').click();
            $('#Schedule #weeklyOptions input[name="weeklyDays"][value="5"]').click();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);    
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for specific range of days of the month", function () {
            var cronExp = "0 52 8 8-11 * ? *";
            var englishString = "Every month on the 8-11 at 08:52";

            $('#Schedule [name="ScheduleType"][value="monthly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("08:52").change();
            $('#Schedule #monthlyOptions [name="monthlyPattern"][value="date"]').click();
            $('#Schedule #monthlyOptions [name="date"]').val('8-11').change();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for specific days of the month", function () {
            var cronExp = "0 52 9 8,14,26 * ? *";
            var englishString = "Every month on the 8, 14, 26 at 09:52";

            $('#Schedule [name="ScheduleType"][value="monthly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("09:52").change();
            $('#Schedule #monthlyOptions [name="monthlyPattern"][value="date"]').click();
            $('#Schedule #monthlyOptions [name="date"]').val('8, 14, 26').change();

            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for specific occurrence of the month", function () {
            var cronExp = "0 4 9 ? * 2#3 *";
            var englishString = "Every month on the third Monday at 09:04";

            $('#Schedule [name="ScheduleType"][value="monthly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("09:04").change();
            $('#Schedule #monthlyOptions [name="monthlyPattern"][value="week"]').click();
            $('#Schedule #monthlyOptions [name="weekOccurrence"]').val('#3').change();
            $('#Schedule #monthlyOptions [name="dayOfWeek"]').val('2').change();
            
            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for the last day of a week of month", function () {
            var cronExp = "0 15 10 ? * 6L *";
            var englishString = "Every month on the last Friday at 10:15";

            $('#Schedule [name="ScheduleType"][value="monthly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("10:15").change();
            $('#Schedule #monthlyOptions [name="monthlyPattern"][value="week"]').click();
            $('#Schedule #monthlyOptions [name="weekOccurrence"]').val('L').change();
            $('#Schedule #monthlyOptions [name="dayOfWeek"]').val('6').change();
            
            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for the last day of a month", function () {
            var cronExp = "0 15 10 L * ? *";
            var englishString = "Every month on the last day of the month at 10:15";

            $('#Schedule [name="ScheduleType"][value="monthly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("10:15").change();
            $('#Schedule #monthlyOptions [name="monthlyPattern"][value="last"]').click();
            
            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every year on a specific day", function () {
            var cronExp = "0 34 21 3 5 ? *";
            var englishString = "Every year on May 3 at 21:34";

            $('#Schedule [name="ScheduleType"][value="yearly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("21:34").change();
            $('#Schedule #yearlyOptions [name="yearPattern"][value="specificDay"]').click();
            $('#Schedule #yearlyOptions select[name="monthSpecificDay"]').multipleSelect('setSelects', ["5"]);
            $('#Schedule #yearlyOptions [name="dayOfMonth"]').val('3').change();
            
            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every year on multiple days", function () {
            var cronExp = "0 18 21 3,6 7 ? *";
            var englishString = "Every year on July 3, 6 at 21:18";

            $('#Schedule [name="ScheduleType"][value="yearly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("21:18").change();
            $('#Schedule #yearlyOptions [name="yearPattern"][value="specificDay"]').click();
            $('#Schedule #yearlyOptions select[name="monthSpecificDay"]').multipleSelect('setSelects', ["7"]);
            $('#Schedule #yearlyOptions [name="dayOfMonth"]').val('3, 6').change();
            
            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every year on a specific occurrence", function () {
            var cronExp = "0 27 21 ? 8 3#1 *";
            var englishString = "Every year on the first Tuesday of August at 21:27";

            $('#Schedule [name="ScheduleType"][value="yearly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("21:27").change();
            $('#Schedule #yearlyOptions [name="yearPattern"][value="weekOccurrence"]').click();
            $('#Schedule #yearlyOptions select[name="weekOccurrence"]').val('#1').change();
            $('#Schedule #yearlyOptions select[name="dayOfWeek"]').val('3').change();
            $('#Schedule #yearlyOptions select[name="monthOccurrence"]').multipleSelect('setSelects', ["8"]);
            
            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });

        it("for every year on a specific occurrence of multiple months", function () {
            var cronExp = "0 12 21 ? 1,2,3 7#4 *";
            var englishString = "Every year on the fourth Saturday of January, February, March at 21:12";

            $('#Schedule [name="ScheduleType"][value="yearly"]').click();
            $('#Schedule #timeOfDayOptions [name="time"]').val("21:12").change();
            $('#Schedule #yearlyOptions [name="yearPattern"][value="weekOccurrence"]').click();
            $('#Schedule #yearlyOptions select[name="weekOccurrence"]').val('#4').change();
            $('#Schedule #yearlyOptions select[name="dayOfWeek"]').val('7').change();
            $('#Schedule #yearlyOptions select[name="monthOccurrence"]').multipleSelect('setSelects', ["1", "2", "3"]);
            
            expect($('#Schedule').jqCronGetInstance().getCron()).toEqual(cronExp);
            expect($('#Schedule').jqCronGetInstance().toEnglishString()).toEqual(englishString);
        });
    });
});