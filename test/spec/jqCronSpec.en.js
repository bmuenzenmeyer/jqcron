describe("The CRON value provided", function() {

    beforeAll(function() {
        $(function () {
            $('#cronexp').jqCron({
                enabled_minute: false,
                multiple_dom: true,
                multiple_month: true,
                multiple_mins: false,
                multiple_dow: true,
                multiple_time_hours: true,
                multiple_time_minutes: false,
                default_period: 'week',
                default_value: '0 * * * * ?',
                no_reset_button: true,
                lang: 'en'
            });
        });
    });

    beforeEach(function() {
      $('#cronexp').jqCronGetInstance().clear();
    });

    it("should translate every hour schedule correctly", function () {
        var cronExp = "0 43 * * * ?";
        var cronHumanTextInEnglish = "Every hour at 43 minute(s) past the hour";

        $('#cronexp').jqCronGetInstance().setCron(cronExp);

        expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
    });


    it("should translate every day schedule correctly", function () {
        var cronExp = "0 20 5,7,10 * * ?";
        var cronHumanTextInEnglish = "Every day at 5,7,10:20";

        $('#cronexp').jqCronGetInstance().setCron(cronExp);

        expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
    });

    it("should translate every week schedule correctly", function () {
        var cronExp = "0 20 10 ? * 1-5";
        var cronHumanTextInEnglish = "Every week on monday-friday at 10:20";

        $('#cronexp').jqCronGetInstance().setCron(cronExp);

        expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
    });

    it("should translate every month schedule correctly", function () {
        var cronExp = "0 52 8-9 26 * ?";
        var cronHumanTextInEnglish = "Every month on 26 at 8-9:52";

        $('#cronexp').jqCronGetInstance().setCron(cronExp);

        expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
    });

    it("should translate every year schedule correctly", function () {
        var cronExp = "0 34 21 3 5 ?";
        var cronHumanTextInEnglish = "Every year on 3 of may at 21:34";

        $('#cronexp').jqCronGetInstance().setCron(cronExp);

        expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
    });

    it("should translate last saturday of month schedule correctly", function () {
        var cronExp = "0 15 10 ? * 6L";
        var cronHumanTextInEnglish = "Every month on the last saturday at 10:15";

        $('#cronexp').jqCronGetInstance().setCron(cronExp);

        expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
    });

    it("should translate last day of month schedule correctly", function () {
        var cronExp = "0 15 10 L * ?";
        var cronHumanTextInEnglish = "Every month on the last day of the month at 10:15";

        $('#cronexp').jqCronGetInstance().setCron(cronExp);

        expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
    });

    it("should translate the specific day occurance of month schedule correctly", function () {
        var cronExp = "0 15 10 ? * 6#3";
        var cronHumanTextInEnglish = "Every month on the third saturday at 10:15";

        $('#cronexp').jqCronGetInstance().setCron(cronExp);

        expect($('#cronexp').jqCronGetInstance().getHumanText()).toEqual(cronHumanTextInEnglish);
    });

});

describe("The dropdowns selected", function() {

    beforeAll(function() {        
    });

    beforeEach(function() {
      $('#cronexp').jqCronGetInstance().clear();
    });

    it ("should translate a specific hour schedule correctly", function(){
        var cronExp = "0 43 * * * ?";

        $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "hour"; }).click();        
        $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "43"; }).click();        

        expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);        
    })

    it("should translate every day schedule correctly", function () {
        var cronExp = "0 20 5,7,10 * * ?";

        $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "day"; }).click();        
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "5"; }).click();        
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "7"; }).click();        
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click(); 
        $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "20"; }).click();

        expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);    
    });


    it("should translate every week schedule correctly", function () {
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

    it("should translate every month schedule correctly", function () {
        var cronExp = "0 52 8-9 26 * ?";
        
        $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
        $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "52"; }).click();
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "8"; }).click();
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "9"; }).click();
        $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "26"; }).click();


        expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
    });

    it("should translate every year schedule correctly", function () {
        var cronExp = "0 34 21 3 5 ?";
        
        $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "year"; }).click();
        $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "34"; }).click();
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "21"; }).click();
        $('.jqCron-dom > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "3"; }).click();
        $('.jqCron-month > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "may"; }).click();


        expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
    });

    it("should translate last saturday of month schedule correctly", function () {
        var cronExp = "0 15 10 ? * 6L";
        
        $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
        $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the last"; }).click();
        $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "saturday"; }).click();
        $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "15"; }).click();
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click();

        expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
    });

    it("should translate last day of month schedule correctly", function () {
        var cronExp = "0 15 10 L * ?";
        
        $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
        $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the last"; }).click();
        $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "15"; }).click();
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click();

        expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
    });

    it("should translate the specific day occurance of month schedule correctly", function () {
        var cronExp = "0 15 10 ? * 6#3";
        
        $('.jqCron-period > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "month"; }).click();
        $('.jqCron-dom > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "the third"; }).click();
        $('.jqCron-dow > .jqCron-selector-2 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "saturday"; }).click();
        $('.jqCron-mins > .jqCron-selector > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "15"; }).click();
        $('.jqCron-time > .jqCron-selector-1 > .jqCron-selector-list > li').filter(function(a){return $(this).text() === "10"; }).click();

        expect($('#cronexp').jqCronGetInstance().getCron()).toEqual(cronExp);
    });

});
