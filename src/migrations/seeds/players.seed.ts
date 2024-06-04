import { DataSource } from "typeorm";
import { allPlayers } from "../interfaces/players";
import { Player } from "src/modules/players/entities/player.entity";

export async function populatePlayersTable( dataSource: DataSource ) {

    allPlayers.forEach((player) => {
        dataSource.manager.save( Player, player )
    })

}
