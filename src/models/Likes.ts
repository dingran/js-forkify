import * as types from "../types";

export default class Likes implements types.ILikes {
  public items: types.IRecipeEntry[];
  constructor() {
    this.items = [];
  }

  public addItem(item: types.IRecipeEntry) {
    this.items.push(item);
    this.persistData();
    return item;
  }

  public deleteItem(id: string) {
    const index = this.items.findIndex((el) => el.recipeId === id);
    this.items.splice(index, 1);
    this.persistData();
  }

  public isLiked(id: string) {
    return this.items.findIndex((el) => el.recipeId === id) !== -1;
  }

  public getNumLikes() {
    return this.items.length;
  }

  public persistData() {
    localStorage.setItem("likes", JSON.stringify(this.items));
  }

  public readStorage() {
    const storage = JSON.parse(localStorage.getItem("likes"));
    if (storage) {
      this.items = storage;
    }
  }
}
