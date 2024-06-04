
type PlayerType = {
    id: number
    name: string
    dorsal: number
    age: number
    position?: string
    nationality?: string
    gamesPlayed?: number
    totalGoals?: number
    tournamentId: number
}

export const allPlayers: PlayerType[] = [

    {
        id: 1,
        name: 'Messi',
        dorsal: 10,
        age: 31,
        position: 'Delantero',
        nationality: 'Argentina',
        gamesPlayed: 100,
        totalGoals: 100,
        tournamentId: 1
    },
    {
        id: 2,
        name: 'Ronaldo',
        dorsal: 7,
        age: 32,
        position: 'Delantero',
        nationality: 'Portugal',
        gamesPlayed: 100,
        totalGoals: 100,
        tournamentId: 1
    },
    {
        id: 3,
        name: 'Jose',
        dorsal: 1,
        age: 31,
        position: 'Arquero',
        nationality: 'Colombia',
        gamesPlayed: 0,
        totalGoals: 0,
        tournamentId: 1
    },
    {
        id: 4,
        name: 'Mario',
        dorsal: 8,
        age: 32,
        position: 'Arquero',
        nationality: 'Brazil',
        gamesPlayed: 1,
        totalGoals: 0,
        tournamentId: 1
    },
    {
        id: 5,
        name: 'Anuel',
        dorsal: 32,
        age: 31,
        position: 'NN',
        nationality: 'Colombia',
        tournamentId: 1
    },
    {
        id: 6,
        name: 'Josesito',
        dorsal: 2,
        age: 32,
        nationality: 'Colombia',
        tournamentId: 1
    },
    {
        id: 7,
        name: 'Jose',
        dorsal: 34,
        age: 31,
        nationality: 'Colombia',
        gamesPlayed: 2,
        totalGoals: 10,
        tournamentId: 1
    },
    {
        id: 8,
        name: 'Mario',
        dorsal: 1,
        age: 32,
        position: 'Arquero',
        nationality: 'Venezuela',
        gamesPlayed: 1,
        totalGoals: 0,
        tournamentId: 1
    },
    {
        id: 9,
        name: 'Andres',
        dorsal: 80,
        age: 31,
        nationality: 'Colombia',
        tournamentId: 1
    },
    {
        id: 10,
        name: 'Maxi',
        dorsal: 32,
        age: 32,
        position: 'Arquero',
        nationality: 'Venezuela',
        tournamentId: 1
    },
    
];
