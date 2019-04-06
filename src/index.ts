import Likes from "./models/Likes";
import List from "./models/List";
import Recipe from "./models/Recipe";
import Search from "./models/Search";
import * as types from "./types";
import { clearLoader, elements, renderLoader } from "./views/base";
import * as likeView from "./views/likeView";
import * as listView from "./views/listView";
import * as recipeView from "./views/recipeView";
import * as searchView from "./views/searchView";

/*
global state
- search obj
- current recipe obj
- shopping list obj
- liked recipes
*/

const state: types.IState = {};

window.addEventListener("load", () => {
  state.likes = new Likes();
  state.likes.readStorage();
  likeView.toggleLikesMenu(state.likes.getNumLikes());
  state.likes.items.forEach((el) => likeView.renderLike(el));
});

const controlSearch = async () => {
  // Get query from view
  const query = searchView.getSearchInput();
  // console.log(query);

  if (query) {
    // new search obj and add to state
    state.search = new Search(query);

    // prepare UI for results
    searchView.clearSearchInput();
    searchView.clearResList();
    renderLoader(elements.searchRes);

    try {
      // search for recipes
      await state.search.getResults();

      // render results on UI
      clearLoader();
      searchView.renderResList(state.search.results, 1);
    } catch (error) {
      clearLoader();
    }
  }
};

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    if (state.search) {
      searchView.highlightSelected(id);
    }

    // create recipe obj, get recipe data
    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();

      // parse ingredients, calc servings/time
      state.recipe.calcServings();
      state.recipe.calcTime();
      state.recipe.parseIngredients();

      // render recipe
      // console.log(state.recipe);
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      clearLoader();
      alert("Error processing recipe!");
    }
  }
};

const newList = () => {
  state.ingList = new List();
  listView.clearItems();
  state.recipe.ingredientsObj.forEach((el) => {
    state.ingList.addItem(el);
    listView.renderItem(el);
  });
};

const controlLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }
  const id = state.recipe.recipeId;
  const recipeEntry = state.search.results.find((el) => el.recipeId === id);

  if (!state.likes.isLiked(id)) {
    // add like to state
    const newLike = state.likes.addItem(recipeEntry);

    // toggle like button
    likeView.toggleLikeBtn(true);

    // add like to UI list
    likeView.renderLike(recipeEntry);
  } else {
    // remove like from state
    state.likes.deleteItem(id);
    // toggle like button
    likeView.toggleLikeBtn(false);

    // add like to UI list
    likeView.deleteLike(id);
  }
  likeView.toggleLikesMenu(state.likes.getNumLikes());
};

// search
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

// pagination
elements.searchResPages.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest(".btn-inline") as HTMLElement;
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10); // fixme: goto is not type checked
    searchView.clearResList();
    searchView.renderResList(state.search.results, goToPage);
  }
});

// display recipe details
["hashchange", "load"].forEach((e) => window.addEventListener(e, controlRecipe));

// adjust serving and add to shopping list
elements.recipe.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).matches(".btn-decrease, .btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if ((e.target as HTMLElement).matches(".btn-increase, .btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if ((e.target as HTMLElement).matches(".recipe__btn--add, .recipe__btn--add *")) {
    newList();
  } else if ((e.target as HTMLElement).matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});

// edit shopping list
elements.shopping.addEventListener("click", (e) => {
  const id = ((e.target as HTMLElement).closest(".shopping__item") as HTMLElement).dataset.itemid;
  if ((e.target as HTMLElement).matches(".shopping__delete, .shopping__delete *")) {
    state.ingList.deleteItem(id);
    listView.deleteItem(id);
  } else if ((e.target as HTMLElement).matches(".shopping__count--value")) {
    const val = parseFloat((e.target as HTMLInputElement).value);
    state.ingList.updateCount(id, val);
  }
});
