import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import addRecipeView from './views/addRecipeView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import { MODEL_CLOSE_SEC } from './config.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) update result view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    //1) update bookmark view
    bookmarksView.update(model.state.bookmarks);
    //2) loading recipe
    await model.loadRecipe(id);
    // 3)rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) load search results
    await model.loadSearchResult(query);

    // 3)render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());
    // 4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const paginationController = function (goToPage) {
  // 3)render NEW results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultPage(goToPage));
  // 4) render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // update the recipe serving (in state)
  model.updateServings(newServing);
  //   update recipe view
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  //1) add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) update recipe view
  recipeView.update(model.state.recipe);

  //   3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // Render recipe
    recipeView.render(model.state.recipe);
    // display success message
    addRecipeView.renderMessage();

    // render bookmark View
    bookmarksView.render(model.state.bookmarks);

    //cheng ID
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close new recipe window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`💥💥💥💥 ${err}`);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(paginationController);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
