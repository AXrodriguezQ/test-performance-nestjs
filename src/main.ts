import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './migrations/data/source.data';
import { populatePlayersTable } from './migrations/seeds/players.seed';
import { populateTournamentsTable } from './migrations/seeds/tournament.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const PORT = process.env.PORT

  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  app.setGlobalPrefix('/api/v1')

  if ( process.env.POPULATION_DB == 'true' ) {
    dataSource.initialize()
      .then(async () => {
        await populatePlayersTable(dataSource)
        await populateTournamentsTable(dataSource)
        console.log('the database has been filled correctly!!!');
      })
      .catch((err) => console.log(`the db could not be populated... error:${err}`))
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Van Rossum Tournaments')
    .setDescription('Company dedicated to the management of tournaments video game')
    .setVersion('1.0')
    .addTag('Van Rossum Tournaments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);

  console.log(`App is listening in http://localhost:${PORT}/docs`);
  console.log(`API documentation is available at http://localhost:${PORT}/docs`);

}
bootstrap();
