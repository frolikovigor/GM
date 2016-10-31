export default function masonry(){
   

    return {
        //Подписаться/отписаться на ленту
        FeedSubscribe: function(id){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url : "/udata/vote/subscribe/"+id+"/?transform=modules/feeds/feeds.xsl",
                    type : "POST",
                    dataType : 'html',
                    success : function(data) {
                        resolve(data);
                    }
                });
            });
        }
    };
};
