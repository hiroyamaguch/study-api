import { Recipe } from '../entities';

export class CreateRecipesDTO {
  restaurantId: string;
  recipe: Recipe;
}
