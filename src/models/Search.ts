import axios from "axios";
import { key } from "../config";
import * as types from "../types";

export default class Search implements types.ISearch {
  public query: string;
  public results: types.IRecipeEntry[];
  constructor(query: string) {
    this.query = query;
  }

  public async getResults() {
    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      // console.log(res.data.recipes);
      const recipes = res.data.recipes as types.IResultEntry[];
      this.results = recipes.map((el) => {
        const r = {
          imgUrl: el.image_url,
          publisher: el.publisher,
          recipeId: el.recipe_id,
          srcUrl: el.source_url,
          title: el.title,
        };
        return r as types.IRecipeEntry;
      });
    } catch (error) {
      alert(error);
    }
  }
}
