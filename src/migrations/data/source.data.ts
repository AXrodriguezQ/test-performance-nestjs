import config from "src/config/config";
import { Player } from "src/modules/players/entities/player.entity";
import { Tournament } from "src/modules/tournaments/entities/tournament.entity";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: 'postgres',
  host : config().database.host,
  port : config().database.port,
  username : config().database.username,
  password : config().database.password,
  database : 'postgres',
  entities: [ Player, Tournament ],
  synchronize: true,
})
