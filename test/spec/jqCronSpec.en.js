describe("JQCron", function(){

    beforeAll(function() {   
        $(function () {
            $('#cronexp').jqCron({
                enabled_minute: false,
                multiple_dom: true,
                multiple_month: true,
                multiple_mins: true,
                multiple_dow: true,
                multiple_time_hours: true,
                multiple_time_minutes: true,
                default_period: 'week',
                default_value: '0 * * * * ?',
                no_reset_button: true,
                lang: 'en',
                numeric_zero_pad: true
            });
        });     
    });


    beforeEach(function() {
      $('#cronexp').jqCronGetInstance().clear();
    });

    describe("should translate a CRON schedule", function() {

        it("for every hour correctly", function () {
            var cronExp = "0 43 * * * ?";
            var cronHumanTextInEnglish = "Every hour at 43 minute(s) past the hour";

            $('#cronexp').jqCronGetInstance().setCron(cronExp);

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });


        it("for every day correctly", function () {
            var cronExp = "0 20 5,7,10 * * ?";
            var cronHumanTextInEnglish = "Every day at 05,07,10:20";

            $('#cronexp').jqCronGetInstance().setCron(cronExp);

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

        it("for every week correctly", function () {
            var cronExp = "0 20 10 ? * 1-5";
            var cronHumanTextInEnglish = "Every week on monday-friday at 10:20";

            $('#cronexp').jqCronGetInstance().setCron(cronExp);

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

        it("for every month correctly", function () {
            var cronExp = "0 52 8-9 26 * ?";
            var cronHumanTextInEnglish = "Every month on 26 at 08-09:52";

            $('#cronexp').jqCronGetInstance().setCron(cronExp);

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

        it("for every year correctly", function () {
            var cronExp = "0 34 21 3 5 ?";
            var cronHumanTextInEnglish = "Every year on 03 of may at 21:34";

            $('#cronexp').jqCronGetInstance().setCron(cronExp);

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

        it("for the last saturday of month correctly", function () {
            var cronExp = "0 15 10 ? * 6L";
            var cronHumanTextInEnglish = "Every month on the last saturday at 10:15";

            $('#cronexp').jqCronGetInstance().setCron(cronExp);

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

        it("for the last day of the month correctly", function () {
            var cronExp = "0 15 10 L * ?";
            var cronHumanTextInEnglish = "Every month on the last day of the month at 10:15";

            $('#cronexp').jqCronGetInstance().setCron(cronExp);

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

        it("for the specific occurrence a day of a month correctly", function () {
            var cronExp = "0 15 10 ? * 6#3";
            var cronHumanTextInEnglish = "Every month on the third saturday at 10:15";

            $('#cronexp').jqCronGetInstance().setCron(cronExp);

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

    });

    describe("should intrepret dropdowns", function() {

        it ("for a specific hour correctly", function(){
            var cronExp = "0 43 * * * ?";

            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "hour"; }).click();        
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "43"; }).click();        

            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);        
        })

        it("for every day correctly", function () {
            var cronExp = "0 20 5,7,10 * * ?";

            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "day"; }).click();        
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "05"; }).click();        
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "07"; }).click();        
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click(); 
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "20"; }).click();

            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);    
        });

        it("for every week correctly", function () {
            var cronExp = "0 20 10 ? * 1-5";
            
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "week"; }).click();
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "20"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "monday"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "tuesday"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "wednesday"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "thursday"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "friday"; }).click();


            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);    
        });

        it("for every month correctly", function () {
            var cronExp = "0 52 8-9 26 * ?";
            
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "52"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "08"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "09"; }).click();
            $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "26"; }).click();


            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for every year correctly", function () {
            var cronExp = "0 34 21 3 5 ?";
            
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "year"; }).click();
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "34"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "21"; }).click();
            $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "03"; }).click();
            $('.jqCron-month > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "may"; }).click();


            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for the last saturday of month correctly", function () {
            var cronExp = "0 15 10 ? * 6L";
            
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
            $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the last"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "saturday"; }).click();
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "15"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click();

            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for the last day of a month correctly", function () {
            var cronExp = "0 15 10 L * ?";
            
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
            $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the last"; }).click();
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "15"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click();

            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("for a specific occurrence of a day every month correctly", function () {
            var cronExp = "0 15 10 ? * 6#3";
            
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
            $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the third"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "saturday"; }).click();
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "15"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click();

            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
        });

        it("when changing occurrence multiple times correctly", function () {
            var cronExp = "0 15 10 15-16 * ?";
            
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
            $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the third"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "friday"; }).click();
            $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "15"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click();
            $('.jqCron-dow > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "every"; }).click();
            $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "15"; }).click();
            $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "16"; }).click();

            expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
        });
    });

    describe("UI should", function() {

        it ("ensure the occurrence is hidden for 'week' options", function(){
            var cronHumanTextInEnglish = "Every week on friday at 16:05";

            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "week"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "friday"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "16"; }).click();
            $('.jqCron-time > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "05"; }).click();

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);        
        });

        it ("ensure the day of the week is visible for 'month' options when 'every' occurrence isn't set", function(){
            var cronHumanTextInEnglish = "Every month on the second sunday at 14:25";

            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
            $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the second"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "sunday"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "14"; }).click();
            $('.jqCron-time > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "25"; }).click();

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);        
        });

        it ("ensure the occurrence is hidden for 'month' options when days are chosen", function(){
            var cronHumanTextInEnglish = "Every month on 18,26 at 13:20";

            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "13"; }).click();
            $('.jqCron-time > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "20"; }).click();
            $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "18"; }).click();
            $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "26"; }).click();

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);        
        });

        it ("ensure the occurrence is hidden for 'month' options when days are chosen after changing the occurrence", function(){
            var cronHumanTextInEnglish = "Every month on 18,26 at 13:20";

            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();            
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "13"; }).click();
            $('.jqCron-time > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "20"; }).click();
            $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the fourth"; }).click();
            $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "every"; }).click();
            $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "18"; }).click();
            $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "26"; }).click();

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);        
        });

        it ("always hide the occurrence on a week schedule even when no day is selected", function(){
            var cronHumanTextInEnglish = "Every week on day of the week at 04:34";
            
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "week"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "04"; }).click();
            $('.jqCron-time > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "34"; }).click();

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

        it ("not switch week and month positions when selecting a day of the week for a year schedule", function(){
            var cronHumanTextInEnglish = "Every year on the third sunday of august at 06:12";

            $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "year"; }).click();
            $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "06"; }).click();
            $('.jqCron-time > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "12"; }).click();
            $('.jqCron-dow > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the third"; }).click();
            $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "sunday"; }).click();
            $('.jqCron-month > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "august"; }).click();

            expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
        });

    });
});