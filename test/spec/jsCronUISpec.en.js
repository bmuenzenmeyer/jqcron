describe("jsCronUI", function(){
    var $fixture;

    beforeAll(function() {      
        $fixture = jQuery('<div></div>');
        $fixture.jsCronUI({});
    });

    beforeEach(function() {
        $fixture.find('input:checked').prop('checked', false);        
        $fixture.jsCronUI('reset');
    });

    describe("should translate a CRON schedule", function() {

        it("for every day correctly", function () {
            var cronExp = "0 20 10 * * ?";
            var cronHumanTextInEnglish = "Every day at 10:20 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every weekday correctly", function () {
            var cronExp = "0 20 10 ? * 2-6";
            var cronHumanTextInEnglish = "Every weekday at 10:20 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every week correctly", function () {
            var cronExp = "0 23 14 ? * 1,4";
            var cronHumanTextInEnglish = "Every week on Sunday, Wednesday at 2:23 PM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every month correctly", function () {
            var cronExp = "0 52 9 26 * ?";
            var cronHumanTextInEnglish = "Every month on the 26 at 9:52 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every year correctly", function () {
            var cronExp = "0 34 21 3 5 ?";
            var cronHumanTextInEnglish = "Every year on May 3 at 9:34 PM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for the last saturday of month correctly", function () {
            var cronExp = "0 15 10 ? * 6L";
            var cronHumanTextInEnglish = "Every month on the last Friday at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for the last day of the month correctly", function () {
            var cronExp = "0 15 10 L * ?";
            var cronHumanTextInEnglish = "Every month on the last day of the month at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for the specific occurrence a day of a month correctly", function () {
            var cronExp = "0 15 10 ? * 7#3";
            var cronHumanTextInEnglish = "Every month on the third Saturday at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for the specific day of a year correctly", function () {
            var cronExp = "0 18 22 14 11 ? *";
            var cronHumanTextInEnglish = "Every year on November 14 at 10:18 PM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for the specific occurrence of a year correctly", function () {
            var cronExp = "0 3 1 ? 12 2#4 *";
            var cronHumanTextInEnglish = "Every year on the fourth Monday of December at 1:03 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every day correctly", function () {
            var cronExp = "0 0 12 * * ?";
            var cronHumanTextInEnglish = "Every day at 12:00 PM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every day as outlined by quartz", function () {
            var cronExp = "0 15 10 ? * *";
            var cronHumanTextInEnglish = "Every day at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every day as outlined by quartz", function () {
            var cronExp = "0 15 10 * * ?";
            var cronHumanTextInEnglish = "Every day at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every day as outlined by quartz", function () {
            var cronExp = "0 15 10 * * ? *";
            var cronHumanTextInEnglish = "Every day at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every weekday as outlined by quartz", function () {
            var cronExp = "0 15 10 ? * 2-6";
            var cronHumanTextInEnglish = "Every weekday at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every month on a specific day as outlined by quartz", function () {
            var cronExp = "0 15 10 15 * ?";
            var cronHumanTextInEnglish = "Every month on the 15 at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every month on the last day as outlined by quartz", function () {
            var cronExp = "0 15 10 L * ?";
            var cronHumanTextInEnglish = "Every month on the last day of the month at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every month on the last occurrence as outlined by quartz", function () {
            var cronExp = "0 15 10 ? * 6L";
            var cronHumanTextInEnglish = "Every month on the last Friday at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every month on a specific occurrence as outlined by quartz", function () {
            var cronExp = "0 15 10 ? * 6#3";
            var cronHumanTextInEnglish = "Every month on the third Friday at 10:15 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every year on a specific day as outlined by quartz", function () {
            var cronExp = "0 11 11 11 11 ?";
            var cronHumanTextInEnglish = "Every year on November 11 at 11:11 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        });

        it("for every year on the last day of a month", function(){
            var cronExp = "0 25 11 ? 1,4 6L *";
            var cronHumanTextInEnglish = "Every year on the last Friday of January, April at 11:25 AM";

            $fixture.jsCronUI('setCron', cronExp);

            expect($fixture.jsCronUI('toEnglishString')).toEqual(cronHumanTextInEnglish);
        })
    });

    describe("should correctly intrepret interface", function() {

        it("for every day", function () {
            var cronExp = "0 20 5 * * ? *";
            var englishString = "Every day at 5:20 AM";

            $fixture.find('.c-schedule-type input[value="daily"]').attr('checked', true).change();
            $fixture.find('.js-schedule-daily input[value="daily"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', '05:20').change();

            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for every weekday", function(){
            var cronExp = "0 21 7 ? * 2-6 *";
            var englishString = "Every weekday at 7:21 AM";

            $fixture.find('.c-schedule-type input[value="daily"]').attr('checked', true).change();
            $fixture.find('.js-schedule-daily input[value="weekday"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "07:21").change();

            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for every week", function () {
            var cronExp = "0 20 10 ? * 1,2,3,4,5 *";
            var englishString = "Every week on Sunday, Monday, Tuesday, Wednesday, Thursday at 10:20 AM";

            $fixture.find('.c-schedule-type input[value="weekly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "10:20").change();
            $fixture.find('.js-schedule-weekly input[value="1"]').attr('checked', true).change();
            $fixture.find('.js-schedule-weekly input[value="2"]').attr('checked', true).change();
            $fixture.find('.js-schedule-weekly input[value="3"]').attr('checked', true).change();
            $fixture.find('.js-schedule-weekly input[value="4"]').attr('checked', true).change();
            $fixture.find('.js-schedule-weekly input[value="5"]').attr('checked', true).change();

            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);    
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for specific range of days of the month", function () {
            var cronExp = "0 52 8 8-11 * ? *";
            var englishString = "Every month on the 8-11 at 8:52 AM";

            $fixture.find('.c-schedule-type input[value="monthly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "08:52").change();
            $fixture.find('.js-schedule-monthly [name="monthlyPattern"][value="date"]').attr('checked', true).change();
            $fixture.find('.js-schedule-monthly [name="date"]').val('8-11').change();

            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for specific days of the month", function () {
            var cronExp = "0 52 9 8,14,26 * ? *";
            var englishString = "Every month on the 8, 14, 26 at 9:52 AM";

            $fixture.find('.c-schedule-type input[value="monthly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "09:52").change();
            $fixture.find('.js-schedule-monthly [name="monthlyPattern"][value="date"]').attr('checked', true).change();
            $fixture.find('.js-schedule-monthly [name="date"]').val('8, 14, 26').change();

            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for specific occurrence of the month", function () {
            var cronExp = "0 4 9 ? * 2#3 *";
            var englishString = "Every month on the third Monday at 9:04 AM";

            $fixture.find('.c-schedule-type input[value="monthly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "09:04").change();
            $fixture.find('.js-schedule-monthly [name="monthlyPattern"][value="week"]').attr('checked', true).change();
            $fixture.find('.js-schedule-monthly [name="weekOccurrence"]').val('#3').change();
            $fixture.find('.js-schedule-monthly [name="dayOfWeek"]').val('2').change();
            
            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for the last day of a week of month", function () {
            var cronExp = "0 15 10 ? * 6L *";
            var englishString = "Every month on the last Friday at 10:15 AM";

            $fixture.find('.c-schedule-type input[value="monthly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "10:15").change();
            $fixture.find('.js-schedule-monthly [name="monthlyPattern"][value="week"]').attr('checked', true).change();
            $fixture.find('.js-schedule-monthly [name="weekOccurrence"]').val('L').change();
            $fixture.find('.js-schedule-monthly [name="dayOfWeek"]').val('6').change();
            
            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for the last day of a month", function () {
            var cronExp = "0 15 10 L * ? *";
            var englishString = "Every month on the last day of the month at 10:15 AM";

            $fixture.find('.c-schedule-type input[value="monthly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "10:15").change();
            $fixture.find('.js-schedule-monthly [name="monthlyPattern"][value="last"]').attr('checked', true).change();
            
            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for every year on a specific day", function () {
            var cronExp = "0 34 21 3 5 ? *";
            var englishString = "Every year on May 3 at 9:34 PM";

            $fixture.find('.c-schedule-type input[value="yearly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "21:34").change();
            $fixture.find('.js-schedule-yearly [name="yearPattern"][value="specificDay"]').attr('checked', true).change();
            $fixture.find('.js-schedule-yearly select[name="monthSpecificDay"]').multipleSelect('setSelects', ["5"]);
            $fixture.find('.js-schedule-yearly [name="dayOfMonth"]').val('3').change();
            
            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for every year on multiple days", function () {
            var cronExp = "0 18 21 3,6 7 ? *";
            var englishString = "Every year on July 3, 6 at 9:18 PM";

            $fixture.find('.c-schedule-type input[value="yearly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "21:18").change();
            $fixture.find('.js-schedule-yearly [name="yearPattern"][value="specificDay"]').attr('checked', true).change();
            $fixture.find('.js-schedule-yearly select[name="monthSpecificDay"]').multipleSelect('setSelects', ["7"]);
            $fixture.find('.js-schedule-yearly [name="dayOfMonth"]').val('3, 6').change();
            
            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for every year on a specific occurrence", function () {
            var cronExp = "0 27 21 ? 8 3#1 *";
            var englishString = "Every year on the first Tuesday of August at 9:27 PM";

            $fixture.find('.c-schedule-type input[value="yearly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "21:27").change();
            $fixture.find('.js-schedule-yearly [name="yearPattern"][value="weekOccurrence"]').attr('checked', true).change();
            $fixture.find('.js-schedule-yearly select[name="weekOccurrence"]').val('#1').change();
            $fixture.find('.js-schedule-yearly select[name="dayOfWeek"]').val('3').change();
            $fixture.find('.js-schedule-yearly select[name="monthOccurrence"]').multipleSelect('setSelects', ["8"]);
            
            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });

        it("for every year on a specific occurrence of multiple months", function () {
            var cronExp = "0 12 21 ? 1,2,3 7#4 *";
            var englishString = "Every year on the fourth Saturday of January, February, March at 9:12 PM";

            $fixture.find('.c-schedule-type input[value="yearly"]').attr('checked', true).change();
            $fixture.find('.js-schedule-tod [name="time"]').attr('data-time', "21:12").change();
            $fixture.find('.js-schedule-yearly [name="yearPattern"][value="weekOccurrence"]').attr('checked', true).change();
            $fixture.find('.js-schedule-yearly select[name="weekOccurrence"]').val('#4').change();
            $fixture.find('.js-schedule-yearly select[name="dayOfWeek"]').val('7').change();
            $fixture.find('.js-schedule-yearly select[name="monthOccurrence"]').multipleSelect('setSelects', ["1", "2", "3"]);

            expect($fixture.jsCronUI('getCron')).toEqual(cronExp);
            expect($fixture.jsCronUI('toEnglishString')).toEqual(englishString);
        });
    });
});