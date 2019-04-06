import axios from "axios";
import { key } from "../config";
import * as types from "../types";

export default class Recipe implements types.IRecipeEntry {
  public recipeId: string;
  public title: string;
  public publisher: string;
  public imgUrl: string;
  public srcUrl: string;
  public ingredients: string[];
  public ingredientsObj: types.IIngObj[];
  public time: number;
  public servings: number;

  constructor(id: string) {
    this.recipeId = id;
  }

  public async getRecipe() {
    try {
      const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.recipeId}`);
      const recipe = res.data.recipe;
      this.title = recipe.title;
      this.publisher = recipe.publisher;
      this.imgUrl = recipe.image_url;
      this.srcUrl = recipe.source_url;
      this.ingredients = recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }

  public calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  public calcServings() {
    this.servings = 4; // TODO:
  }

  public parseIngredients() {
    const unitsLong = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds"];
    const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound"];
    const units = [...unitsShort, "kg", "g"];
    const newIngredients = this.ingredients.map((el) => {
      let ingredient = el.toLowerCase();
      // uniform units
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });
      // remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // parse into count, unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex((el2) => unitsShort.includes(el2));

      let objIng: types.IIngObj;
      if (unitIndex > -1) {
        // 4 1/2 cups, arrCount is [4, 1/2]
        // 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);
        const count =
          // tslint:disable-next-line: no-eval
          arrCount.length === 1 ? eval(arrIng[0].replace("-", "+")) : eval(arrIng.slice(0, unitIndex).join("+"));

        objIng = {
          count,
          ingredient: arrIng.slice(unitIndex + 1).join(" "), // equivalent to ingredient: ingredient
          unit: arrIng[unitIndex],
        };
      } else if (parseInt(arrIng[0], 10)) {
        // has number, no unit
        objIng = {
          count: parseInt(arrIng[0], 10),
          ingredient: arrIng.slice(1).join(" "), // equivalent to ingredient: ingredient
          unit: "",
        };
      } else if (unitIndex === -1) {
        // no unit, no number
        objIng = {
          count: 1,
          ingredient, // equivalent to ingredient: ingredient
          unit: "",
        };
      }

      return objIng;
    });
    this.ingredientsObj = newIngredients;
  }

  public updateServings(typeDecInc: string) {
    const newServings = typeDecInc === "dec" ? this.servings - 1 : this.servings + 1;

    this.ingredientsObj.forEach((ing) => {
      ing.count *= newServings / this.servings;
    });
    this.servings = newServings;
  }
}
