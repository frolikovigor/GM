export default function comments(){

    return {
        Init: (function(){

        })(),

        //Удаление комментариев
        CommentRemove: function(id) {
            $.ajax({
                url : '/udata/content/comment_remove/'+id,
                type : 'POST',
                dataType : 'html',
                success : function(data) {
                    location.reload();
                }
            });
        },

        //Отправка комментария
        SendComment: function(elem){
            var comment = elem.closest(".comments__comment");
            var objId = comment.attr("data-page");
            var parentId = comment.attr("data-parent");
            var per_page = comment.attr("data-per_page");
            var content = comment.find("textarea").val();
            var anonymous = comment.find("input[name='anonymous']").prop("checked") ? "1" : "0";
            var name = comment.find("input[name='name']").val();
            var existName = comment.find("input[name='name']").length ? true : false;
            if (!content || (existName && !name)) {
                if (!content) comment.find("textarea").focus();
                if (!name) comment.find("input[name='name']").focus();
                return false;
            } else {
                if (objId != undefined){
                    if (elem.attr("data-captcha") == undefined){
                        elem.removeAttr("data-send");
                        comment.find("img.preloader").removeClass("hide");
                        $.ajax({
                            url : "/udata/content/sendComment/?transform=modules/comments/comments.xsl",
                            type : "POST",
                            dataType : 'html',
                            data : {objId: objId, parent_id: (parentId != undefined) ? parentId : "", name : name, content: content, per_page:per_page, anonymous:anonymous},
                            success : function(data) {
                                comment.find("img.preloader").addClass("hide");
                                comment.find("input[name='name'], textarea").val('');
                                comment.find("input[name='anonymous']").prop('checked', false);
                                var comments = comment.closest(".comments");
                                comments.append($(".comments__comment--float"));
                                $(".comments__comment--float").slideUp(function(){
                                    comments.find(".comments__list").html(data);
                                    var comments_amount = comments.find(".comments_amount").html();
                                    comments.find(".comments__title span").html(comments_amount);
                                    GM.View.Masonry.init();
                                });
                            }
                        });
                    } else {
                        $(".comments__comment button").removeAttr("data-send");
                        elem.attr("data-send","1");
                    }
                }
            }
        }

    };
}
