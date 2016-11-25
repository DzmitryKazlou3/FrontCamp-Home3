// Represents the single news item.
export default class Article {
    constructor(title, url, description, author, urlToImage, publishedAt) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }
}