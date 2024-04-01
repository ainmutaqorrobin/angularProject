import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  recipeurl: string =
    'https://ng-project-18616-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(this.recipeurl, recipes)
      .subscribe((resp) => console.log(resp));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.recipeurl).subscribe((resp) => {
      this.recipeService.overrideRecipes(resp);
    });
  }
}