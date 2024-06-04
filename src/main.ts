import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './migrations/data/source.data';
import { populatePlayersTable } from './migrations/seeds/players.seed';
import { populateTournamentsTable } from './migrations/seeds/tournament.seed';

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

  await app.listen(PORT);

  console.log(`App is listening on port ${PORT}`);

}
bootstrap();
