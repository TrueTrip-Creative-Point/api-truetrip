export class DestinationEvent {
    constructor(
        public readonly id:number,
        public readonly name:string,
        public readonly description:string,
        public readonly packageId:number,
      ){}
}