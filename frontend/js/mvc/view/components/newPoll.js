export default function newPoll(){
    var XHR = false;
    
    return {
        refreshNewPoll: function(change, reload_form){
            if ($(".new_poll").length){
                var modify = change ? "1" : "0";
                if (reload_form) $("#disabled_screen").removeClass("hide");
                if (GM.Model.NewPoll.PTime) clearTimeout(GM.Model.NewPoll.PTime);
                GM.Model.NewPoll.PTime = setTimeout(function(){
                    $("#disabled_screen").addClass("hide");
                    location.reload();
                },10000);

                var data_type = $(".new_poll").attr("data-type");
                var data_for = $(".new_poll").attr("data-for");
                data_for = (data_for != undefined) ? data_for : "";
                var data_id = $(".new_poll").attr("data-id");
                data_id = (data_id != undefined) ? data_id : "";

                var fast = (data_type == "fast") ? "1/" : "";

                var scrollTextarea = $(".new_poll .chanels").scrollTop();

                if (XHR !== false) {
                    clearTimeout(XHR);
                };

                XHR = setTimeout(function(){
                    GM.Model.NewPoll.GetNewPollForm(
                        modify,
                        fast,
                        $(".new_poll #new_poll_form").serialize()+"&data_for="+data_for+"&data_id="+data_id+"&url="+encodeURIComponent(location.href)
                    ).then((data)=>{
                        XHR = false;
                        if (reload_form) {
                            var heightImages = $(".new_poll .images").outerHeight();
                            $(".new_poll").html(data);
                            $(".new_poll .images").css("height", heightImages+"px");

                            $(".new_poll .chanels").scrollTop(scrollTextarea);

                            if (GM.Model.Images.upload_image_currXhr != undefined) GM.Model.Images.upload_image_currXhr.abort();

                            GM.View.Gridster.refreshGridster();

                            setTimeout(function(){
                                GM.View.Masonry.init();
                                if (
                                    ($(".new_poll").attr("data-tooltips-id") != '') &&
                                    ($(".new_poll").attr("data-tooltips-id") !== undefined)
                                )
                                    $(".new_poll").addClass("tooltips");

                                if (
                                    ($(".article--poll.article--medium[data-type='poll']:first").find(".settings_item ul").attr("data-tooltips-id") != '') &&
                                    ($(".article--poll.article--medium[data-type='poll']:first").find(".settings_item ul").attr("data-tooltips-id") !== undefined)
                                ){
                                    $(".article--poll.article--medium[data-type='poll']:first").find(".settings_item ul").addClass("tooltips");
                                    $(".article--poll.article--medium[data-type='poll']:first").find(".settings_item").addClass("open_for_tooltip");
                                }

                                GM.View.IntroJs.init();
                            },50);

                            GM.View.CutContent();
                            GM.View.ColorBox.init();
                            GM.View.InitSetInfo();
                            GM.View.InitTooltips();
                        };

                        $("#disabled_screen").addClass("hide");
                        clearTimeout(GM.Model.NewPoll.PTime);
                        GM.Model.NewPoll.PTime = false;
                        if (GM.Model.NewPoll.LastClick !== false) {
                            $(GM.Model.NewPoll.LastClick).prop("disabled",false);
                            $(GM.Model.NewPoll.LastClick).click();
                            GM.Model.NewPoll.LastClick = false;
                        }
                    });
                }, 500);
            };
        }
    };
}
