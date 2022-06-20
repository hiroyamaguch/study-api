import { NestFactory } from '@nestjs/core';
import { AppErrorInterceptor } from '@shared/errors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalInterceptors(new AppErrorInterceptor());

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
