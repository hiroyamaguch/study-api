import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRecipesDTO } from './dtos';
import { Recipe } from './entities';
import { RecipesService } from './recipes.service';

export interface IFindRecipesByRestaurant {
  restaurantId: string;
}

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async createUser(@Body() data: CreateRecipesDTO): Promise<Recipe> {
    return this.recipesService.create(data);
  }

  @Get()
  async find(@Query() params: IFindRecipesByRestaurant): Promise<Recipe[]> {
    return this.recipesService.findAllByRestaurant(params.restaurantId);
  }
}
