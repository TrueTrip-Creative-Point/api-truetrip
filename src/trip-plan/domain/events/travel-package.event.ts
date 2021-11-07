export class TravelPackageEvent{
  constructor(
    public readonly id:number,
    public readonly amount_people:number,
    public readonly description:string,
    public readonly promotion:string,
    public readonly url_image:string
  ){}
}
