export class MaxDistanceError extends Error {
    constructor(){
        super('Max numbers of check ins reached')
    }
}