export type System = {
    symbol: string,
    sectorSymbol: string,
    type: string,
    x: number,
    y: number,
    waypoints: {
        symbol: string,
        type: string,
        x: number,
        y: number,
        orbitals: {symbol: string}[]
    }[]
    factions: string[]
}