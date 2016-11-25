﻿import 'whatwg-fetch';
import URLS from '../Common/URLS';
import Article from '../Models/Article';
import Articles from '../Models/Articles';

// The article service
export default class ArticleService {
    constructor() {
    }

    getArticlesBySourceId(sourceId) {
        let headers = new Headers();
        headers.append("X-Api-Key", "caa2a0adb8424a32bb0a582406293aa1");
        let init = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        };
        return fetch(URLS.HOST + URLS.API_VERSION + URLS.ARTICLES + sourceId, init)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.statusText);
                }
            }).then(function (json) {
                let articlesModel = new Articles(json.source, json.sortBy);
                for (let article of json.articles) {
                //title, url, description, author, urlToImage, publishedAt
                    articlesModel.Add(
                        new Article(
                        article.title,
                        article.url,
                        article.description,
                        article.author,
                        article.urlToImage,
                        article.publishedAt));
                }
                return articlesModel;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}