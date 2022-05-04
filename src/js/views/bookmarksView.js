import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMassage = 'NO bookmark yet. find a nice recipe and bookmark it ;)';
  _massage = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new BookmarksView();
