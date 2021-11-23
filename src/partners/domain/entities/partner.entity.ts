import { PartnerRegisteredEvent } from '../events/partner-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { PartnerId } from '../value-objects/partner-id.value';
import { Dni } from '../value-objects/dni.value';
import { CompanyName } from '../value-objects/companyName.value';
import { PhoneNumber } from '../value-objects/phoneNumber.value';
import { Email } from '../value-objects/email.value';
import { Name } from '../../../common/domain/value-objects/name.value';


export class Partner extends AggregateRoot {
  private id: PartnerId;
  private name: Name;
  private dni: Dni;
  private companyName: CompanyName;
  private phoneNumber: PhoneNumber;
  private email: Email;
  
  public constructor(id: PartnerId, name: Name, dni: Dni, companyName: CompanyName, phoneNumber:PhoneNumber,email:Email) {
    super();
    this.id = id;
    this.name = name;
    this.dni = dni;
    this.companyName = companyName;
    this.phoneNumber = phoneNumber;
    this.email =email;

  }

  public register() {
    const event = new PartnerRegisteredEvent(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue(), this.companyName.getValue(),this.phoneNumber.getValue(),this.email.getValue());
    this.apply(event);
  }

  public update(id: PartnerId, name: Name, dni: Dni, companyName: CompanyName, phoneNumber:PhoneNumber,email:Email) {
    this.id = id;
    this.name = name;
    this.dni = dni;
    this.companyName = companyName;
    this.phoneNumber = phoneNumber;
    this.email =email;
  }
  public getId(): PartnerId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }


 public getCompanyName(): CompanyName {
    return this.companyName;
  }

 public getPhoneNumber(): PhoneNumber {
    return this.phoneNumber;
  }

public getEmail(): Email {
    return this.email;
  }

  public changeId(id: PartnerId) {
    this.id = id;
  }

  public changeName(name: Name): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }


public changeCompanyName(companyName: CompanyName): void {
    this.companyName = companyName;
  }

public changePhoneNumber(phoneNumber: PhoneNumber): void {
    this.phoneNumber = phoneNumber;
  }


public changeEmail(email: Email): void {
    this.email = email;
  }
}
