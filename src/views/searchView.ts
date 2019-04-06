import * as types from "../types";
import { elements } from "./base";

export const getSearchInput = () => elements.searchInput.value;

export const clearSearchInput = () => {
  elements.searchInput.value = "";
};

enum ButtonType {
  prev = "prev",
  next = "next",
}

export const limitRecipeTitle = (title: string, limit: number = 17) => {
  const newTitle: string[] = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc: number, cur: string) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")} ...`;
  } else {
    return title;
  }
};

const renderRecipeEntry = (recipe: types.IRecipeEntry) => {
  const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipeId}">
        <figure class="results__fig">
            <img src="${recipe.imgUrl}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>
  `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page: number, type: ButtonType) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === ButtonType.prev ? page - 1 : page + 1}>
        <span>Page ${type === ButtonType.prev ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === ButtonType.prev ? "left" : "right"}"></use>
        </svg>
    </button>
`;

const renderButton = (page: number, numResults: number, resPerPage: number) => {
  const numPages = Math.ceil(numResults / resPerPage);

  let button: string;
  if (page === 1 && numPages > 1) {
    // button to go to next page
    button = createButton(page, ButtonType.next);
  } else if (page < numPages) {
    button = `${createButton(page, ButtonType.prev)}
              ${createButton(page, ButtonType.next)} `;
  } else if (page === numPages && numPages > 1) {
    // only button to go to prev page
    button = createButton(page, ButtonType.prev);
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResList = (recipes: types.IRecipeEntry[], page: number = 1, resPerPage: number = 6) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipeEntry);
  renderButton(page, recipes.length, resPerPage);
};

export const clearResList = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

export const highlightSelected = (id: string) => {
  const resArr = Array.from(document.querySelectorAll(".results__link"));
  resArr.forEach((ele) => {
    ele.classList.remove("results__link--active");
  });
  const el = document.querySelector(`.results__link[href="#${id}"]`);
  el.classList.add("results__link--active");
};
