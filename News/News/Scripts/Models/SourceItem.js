import UrlsToLogos from './UrlsToLogos';

// Represents the source
export default class SourceItem {
    constructor(id, name, description, url, category, language, country, urlsToLogos, sortBysAvailable) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.category = category;
        this.language = language;
        this.country = country;
        this.urlsToLogos = new UrlsToLogos(urlsToLogos.small, urlsToLogos.medium, urlsToLogos.large);
        this.sortBysAvailable = sortBysAvailable;
    }
}