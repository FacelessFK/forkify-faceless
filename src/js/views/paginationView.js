import icons from 'url:../../img/icons.svg';
import View from './view';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const generateBtn = function (type) {
      const countPage = type === 'next' ? curPage + 1 : curPage - 1;
      const pos =
        type === 'next'
          ? `
            <span>Page ${countPage}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right">
                </use>
            </svg>    
            `
          : `
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${countPage}</span>`;
      return `
        <button data-goto="${countPage}" class="btn--inline pagination__btn--${type}">${pos}
        </button>
    `;
    };

    // generate buttons

    // page1, and there are other pages
    if (curPage === 1 && numPage > 1) {
      return generateBtn('next');
    }
    // last page
    if (curPage === numPage && numPage > 1) {
      return generateBtn('prev');
    }
    // Other page
    if (curPage < numPage) {
      return `${generateBtn('next')}${generateBtn('prev')}`;
    }
    // page1, and there are NO other pages
    return '';
  }
}
export default new PaginationView();
