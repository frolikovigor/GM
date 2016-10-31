export default function masonry(){
    var initMasonryInstance = false;

    return {
        init: function(){
            var scrollTop = $(window).scrollTop();
            if (initMasonryInstance)
                $(".masonry").masonry('destroy');

            $(".masonry").each(function(){
                var getClass = $(this).data("class-masonry");

                var getGutter = parseInt($(this).data("masonry-gutter"));
                $(this).masonry({
                    itemSelector: '.'+getClass,
                    gutter: getGutter
                });
            });
            initMasonryInstance = true;
            $(window).scrollTop(scrollTop);
        }
    };
};
