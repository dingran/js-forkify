import * as uniqid from "uniqid";
import * as types from "../types";
import { updateServingsIngredients } from "../views/recipeView";

export default class List implements types.IIngList {
  public items: types.IIngObj[];
  constructor() {
    this.items = [];
  }

  public addItem(item: types.IIngObj) {
    item.ingId = uniqid();
    this.items.push(item);
  }

  public deleteItem(id: string) {
    const index = this.items.findIndex((el) => el.ingId === id);
    this.items.splice(index, 1);
  }

  public updateCount(id: string, newCount: number) {
    this.items.find((el) => el.ingId === id).count = newCount;
  }
}
