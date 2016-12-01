import Observable from '../Common/Observable';

export default class MainPresenter
{
    constructor()
    {
        this._sourcePresenter = null;
        this._articlesPresenter = null;
    }

    // called from observable, when "sourceChanged" is emited.
    onSourceChanged(newSourceId) {
        // load article modules.
        // https://webpack.github.io/docs/code-splitting.html
        if (!this._articlesPresenter) {
            require(["./ArticlesPresenter", "../Services/ArticleServiceProxy", "../Services/ArticleService", "../Views/ArticlesView"],
                (ArticlesPresenter, ArticleServiceProxy, ArticleService, ArticlesView) => {
                    this._articlesPresenter = new ArticlesPresenter.default(new ArticlesView.default(), new ArticleServiceProxy.default(new ArticleService.default()));
                    this._articlesPresenter.loadArticles(newSourceId);
            });
        } else {
            this._articlesPresenter.loadArticles(newSourceId);
        }
    }

    initialize() {
        Observable.Instance.addObserver("sourceChanged", this.onSourceChanged.bind(this));
        
        // load article modules.
        // https://webpack.github.io/docs/code-splitting.html
        if (!this._articlesPresenter) {
            require(["./SourcePresenter", "../Services/SourceService", "../Views/SourcesView"],
                (SourcePresenter, SourceService, SourcesView) => {
                    this._sourcePresenter = new SourcePresenter.default(new SourcesView.default(), new SourceService.default());
                    this._sourcePresenter.loadSources();
                });
        } else {
            this._sourcePresenter.loadSources();
        }
    }
}