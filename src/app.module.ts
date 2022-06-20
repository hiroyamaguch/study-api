import { Module } from '@nestjs/common';
import { RestaurantsModule } from '@restaurants/restaurants.module';
import { UsersModule } from '@users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './config/database';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [Database.build(), UsersModule, RestaurantsModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
