import { Body, Controller, Get, Post } from '@nestjs/common';
import { Restaurant } from './entities';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async createUser(@Body() data: Restaurant): Promise<Restaurant> {
    return this.restaurantsService.create(data);
  }

  @Get()
  async find(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }
}
