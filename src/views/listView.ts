import * as types from "../types";
import { elements } from "./base";

export const renderItem = (item: types.IIngObj) => {
  const markup = `
  <li class="shopping__item" data-itemid=${item.ingId}>
    <div class="shopping__count">
        <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
        <p>${item.unit}</p>
    </div>
    <p class="shopping__description">${item.ingredient}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
  </li>
  `;
  elements.shopping.insertAdjacentHTML("beforeend", markup);
};

export const clearItems = () => {
  elements.shopping.innerHTML = "";
};

export const deleteItem = (id: string) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};
