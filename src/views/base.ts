export const elements = {
  likesList: document.querySelector(".likes__list") as HTMLElement,
  likesMenu: document.querySelector(".likes__field") as HTMLElement,
  recipe: document.querySelector(".recipe") as HTMLElement,
  searchForm: document.querySelector(".search") as HTMLElement,
  searchInput: document.querySelector(".search__field") as HTMLInputElement,
  searchRes: document.querySelector(".results") as HTMLLIElement,
  searchResList: document.querySelector(".results__list") as HTMLLIElement,
  searchResPages: document.querySelector(".results__pages") as HTMLLIElement,
  shopping: document.querySelector(".shopping__list") as HTMLLIElement,
};

export const elementStrings = {
  loader: "loader",
};

export const renderLoader = (parent: HTMLElement) => {
  const loader = `
    <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
