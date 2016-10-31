export default function comments(){


    return {
        Init: function(){
            //Комментарии
            $(".comments__comment").each(function(){
                var c = $(this);
                var ta = c.children("textarea");
                ta.focus(function(){
                    ta.stop().animate({height: "75px"}, 250);
                });
                ta.blur(function(){
                    if(ta.val() == '') ta.stop().animate({height: "50px"}, 250);
                });
            });

            //Если количество блоков comments__comment--float больше 1, удаляем лишние
            $(".comments__comment--float").each(function(i){
                if (i>0) $(this).remove();
            });

            $("body").on("click", ".comment_this", function(){
                var this_ = $(this);
                if (this_.attr("data-opened") == undefined){
                    $(".comment_this").removeAttr("data-opened");
                    this_.attr("data-opened", "1");
                    $(".comments__comment--float").slideUp("fast",function(){
                        this_.closest(".comment_content").children(".answer").append($(".comments__comment--float"));
                        $(".comments__comment--float input, .comments__comment--float textarea").val('');
                        $(".comments__comment--float").slideDown("fast",function(){
                            setTimeout(function(){GM.View.Masonry.init();},200);
                        });
                        $(".comments__comment--float").attr("data-parent",this_.attr('data-parent'));
                        $(".comments__comment--float").attr("data-page",this_.attr('data-page'));
                        $(".comments__comment--float").attr("data-per_page",this_.attr('data-per_page'));
                        $(".comment_this").removeClass('hide');
                        $(".cancel_comment_this").addClass('hide');
                        this_.addClass('hide');
                        this_.closest(".comment_content").children(".cancel_comment_this").removeClass("hide");
                    });
                }
            });
            $("body").on("click", ".cancel_comment_this", function(){
                $(".comments__comment--float").slideUp("fast", function(){
                    setTimeout(function(){
                        GM.View.Masonry.init();
                    },200);
                });
                $(this).addClass("hide");
                $(this).closest(".comment_content").children(".comment_this").removeClass("hide");
                $(".comment_this").removeAttr("data-opened");
            });
        },

        //Подгрузка комментариев ajax
        GetListComments: function(elem,objId, per_page){
            elem.find("span").addClass("hide");
            elem.find("img").removeClass("hide");
            var per_page = parseInt(per_page) + 20;
            var comments_list = elem.closest(".comments__list");
            $.ajax({
                url : "/udata/content/getListComments/"+objId+"/"+per_page+"?transform=modules/comments/comments.xsl",
                type : "POST",
                dataType : 'html',
                success : function(data) {
                    comments_list.html(data);
                    GM.View.CutContent();
                    GM.View.Masonry.init();
                }
            });
            return false;
        }

    };
};
