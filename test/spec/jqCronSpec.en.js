describe("#Player", function() {

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

    afterEach(function() {
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

    it("should translate last friday of month schedule correctly", function () {
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
