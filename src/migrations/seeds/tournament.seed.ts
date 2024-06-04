import { DataSource } from "typeorm";
import { allTournaments } from "../interfaces/tournaments";
import { Tournament } from "src/modules/tournaments/entities/tournament.entity";

export async function populateTournamentsTable( dataSource: DataSource ) {

    allTournaments.forEach((tournament) => {
        dataSource.manager.save( Tournament, tournament )
    })

}
