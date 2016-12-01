import Observable from '../Common/Observable';

// The source Presenter
export default class SourcePresenter {
    constructor(sourceView, sourceService) {
        Observable.Instance.addObserver("back", this.loadSources.bind(this));
        this._sourceService = sourceService;
        this._sourceView = sourceView;
        this._sourceView.Presenter = this;
        this._selectedSourceId = null;
    }

    set SelectedSourceId(value) {
        this._selectedSourceId = value;
        Observable.Instance.emit("sourceChanged", this._selectedSourceId);
    }

    loadSources() {
        return this._sourceService.getSources()
            .then(sourceItems => {
                if (sourceItems) {
                    this.setSources(sourceItems);
                } else {
                    // TODO: move the alert message to constant.
                    alert("there is no source items");
                }
            }).catch(err => alert(err));
    }

    setSources(sourceItems) {
        this._sourceView.showSources(sourceItems);
    }
}