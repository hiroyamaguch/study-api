import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@restaurants/entities';
import { AppError } from '@shared/errors';
import { Repository } from 'typeorm';
import { CreateRecipesDTO } from './dtos';
import { Recipe } from './entities';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  async create(data: CreateRecipesDTO): Promise<Recipe> {
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id: data.restaurantId },
    });

    if (!restaurant) throw new AppError('restaurant not found', 404);

    const recipe = this.recipesRepository.create({
      ...data.recipe,
      restaurant,
    });

    await this.recipesRepository.save(recipe);

    return recipe;
  }

  async findAllByRestaurant(restaurantId: string): Promise<Recipe[]> {
    return this.recipesRepository.find({
      where: { restaurant: { id: restaurantId } },
    });
  }
}
