import ProxyCache from "../Common/ProxyCache";

export default class ArticleServiceProxy extends ProxyCache {
    constructor(articleService) {
        super();
        this._articleService = articleService;
    }

    getArticlesBySourceId(sourceId) {
        if (this._cache[sourceId]) {
            return Promise.resolve(this._cache[sourceId]);
        } else {
            return this._articleService.getArticlesBySourceId(sourceId)
                .then((data) => {
                    this._cache[sourceId] = data;
                    return data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}