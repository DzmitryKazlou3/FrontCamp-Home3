import Observable from '../Common/Observable';

export default class ArticlesPresenter {
    constructor(articlesView, articleService) {
        this._articleService = articleService;
        this._articlesView = articlesView;
        this._articlesView.Presenter = this;
    }

    loadArticles(sourceId) {
        this._articleService.getArticlesBySourceId(sourceId)
            .then(articlesModel => {
                this.setArticles(articlesModel.Articles);
            })
            .catch(err => alert(err));
    }

    setArticles(articles) {
        this._articlesView.showArticles(articles);
    }

    goBack() {
        Observable.Instance.emit("back");
    }
}