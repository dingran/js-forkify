export interface IIngObj {
  count: number;
  unit: string;
  ingId?: string;
  ingredient: string;
}
export interface IResultEntry {
  recipe_id: string;
  image_url: string;
  title: string;
  publisher: string;
  source_url: string;
}

export interface IRecipeEntry {
  recipeId: string;
  imgUrl: string;
  title: string;
  publisher: string;
  srcUrl: string;
  ingredients?: string[];
  ingredientsObj?: IIngObj[];
  time?: number;
  servings?: number;
  getRecipe(): Promise<void>;
  calcTime(): void;
  calcServings(): void;
  parseIngredients(): void;
  updateServings(s: string): void;
}

export interface ISearch {
  query: string;
  results: IRecipeEntry[];
  getResults(): Promise<void>;
}

export interface IIngList {
  items: IIngObj[];
  addItem(item: IIngObj): void;
  deleteItem(id: string): void;
  updateCount(id: string, c: number): void;
}

export interface ILikes {
  items: IRecipeEntry[];
  addItem(item: IRecipeEntry): IRecipeEntry;
  deleteItem(id: string): void;
  isLiked(id: string): boolean;
  getNumLikes(): number;
  persistData(): void;
  readStorage(): void;
}

export interface IState {
  search?: ISearch;
  recipe?: IRecipeEntry;
  likes?: ILikes;
  ingList?: IIngList;
}
