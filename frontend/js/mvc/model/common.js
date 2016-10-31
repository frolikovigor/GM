import getGridster from './components/gridster';
import newPoll from './components/newPoll';
import newArticle from './components/newArticle';
import getMasonry from './components/masonry';
import getIntroJs from './components/introJs';
import getColorBox from './components/colorBox';
import getCabinet from './components/cabinet';
import getGoogleMap from './components/googleMap';
import getComments from './components/comments';
import getFeedback from './components/feedback';
import getPoll from './components/poll';
import getFeed from './components/feed';
import getImages from './components/image';

export default class model {
    constructor() {
        this.Gridster = getGridster();
        this.NewPoll = newPoll();
        this.NewArticle = newArticle();
        this.Masonry = getMasonry();
        this.IntroJs = getIntroJs(); //Пошаговые подсказки
        this.ColorBox = getColorBox();
        this.Cabinet = getCabinet();
        this.GoogleMap = getGoogleMap();
        this.Comments = getComments();
        this.Feedback = getFeedback();
        this.Poll = getPoll();
        this.Feed = getFeed();
        this.Images = getImages();
    }

    //Пагинация
    Paginate(this_){
        return new Promise(function(resolve, reject){
            var udata = this_.attr("data-udata");
            var transform = this_.attr("data-transform");
            var page = this_.attr("data-page");
            var search_string = this_.attr("data-search_string");

            page = (page !== undefined) ? (parseInt(page) + 1) : 1;
            this_.attr("data-page", page);
            $.ajax({
                url : udata+"?transform="+transform,
                type : "POST",
                dataType : 'html',
                data : {p:page, search_string:search_string},
                success : function(data) {
                    resolve(data);
                }
            });
        });
    }
}
