import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const PORT = process.env.PORT

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api/v1')
  await app.listen(PORT);

  console.log(`App is listening on port ${PORT}`);

}
bootstrap();
