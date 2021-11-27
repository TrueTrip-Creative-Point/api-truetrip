import { Column } from "typeorm";

export class UrlImageTypeorm {
  @Column('varchar',{name:'url_image',length:100,nullable:false})
  public url_image:string;

  private constructor(url_image:string){
    this.url_image=url_image;
  }
  public static from(url_image:string):UrlImageTypeorm{
    return new UrlImageTypeorm(url_image);
  }
}
