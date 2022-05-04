import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMassage = 'NO recipes found for your search, please try again :)';
  _massage = '';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
