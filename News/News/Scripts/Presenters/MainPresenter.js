import Observable from '../Common/Observable';
import SourcePresenter from './SourcePresenter';
import ArticlesPresenter from './ArticlesPresenter';
import SourceService from '../Services/SourceService';
import ArticleService from '../Services/ArticleService';
import SourcesView from '../Views/SourcesView';
import ArticlesView from '../Views/ArticlesView';

export default class MainPresenter
{
    constructor()
    {
        this._observable = new Observable();
        this._sourcePresenter = new SourcePresenter(new SourcesView(), new SourceService(), this._observable);
        this._articlesPresenter = new ArticlesPresenter(new ArticlesView(), new ArticleService(), this._observable);
    }

    initialize() {
        this._sourcePresenter.loadSources();
    }
}