import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  async create(data: Restaurant): Promise<Restaurant> {
    const restaurant = this.restaurantsRepository.create(data);

    await this.restaurantsRepository.save(restaurant);

    return restaurant;
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantsRepository.find();
  }
}
