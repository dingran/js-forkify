import * as types from "../types";
import { elements } from "./base";
import { limitRecipeTitle } from "./searchView";

export const toggleLikeBtn = (isLiked: boolean) => {
  const iconString = isLiked ? `icon-heart` : `icon-heart-outlined`;
  // <use href="img/icons.svg#icon-heart-outlined"></use>
  document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${iconString}`);
};

export const toggleLikesMenu = (numLikes) => {
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

export const renderLike = (item: types.IRecipeEntry) => {
  const markup = `
    <li>
      <a class="likes__link" href="#${item.recipeId}">
          <figure class="likes__fig">
              <img src="${item.imgUrl}" alt="${item.title}">
          </figure>
          <div class="likes__data">
          <h4 class="results__name">${limitRecipeTitle(item.title)}</h4>
          <p class="results__author">${item.publisher}</p>
          </div>
      </a>
    </li>
  `;

  elements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = (id: string) => {
  const item = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
  if (item) {
    item.parentElement.removeChild(item);
  }
};
