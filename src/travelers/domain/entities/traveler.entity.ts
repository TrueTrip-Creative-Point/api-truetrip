import { TravelerRegisteredEvent } from '../events/traveler-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { TravelerId } from '../value-objects/traveler-id.value';
import { Dni } from '../value-objects/dni.value';
import { PhoneNumber } from '../value-objects/phoneNumber.value';
import { Email } from '../value-objects/email.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class Traveler extends AggregateRoot {
  private id:  TravelerId;
  private name: Name;
  private dni: Dni;
  private phoneNumber: PhoneNumber;
  private email: Email;
  
  public constructor(id: TravelerId, name: Name, dni: Dni, phoneNumber:PhoneNumber,email:Email) {
    super();
    this.id = id;
    this.name = name;
    this.dni = dni;
    this.phoneNumber = phoneNumber;
    this.email =email;

  }

  public register() {
    const event = new TravelerRegisteredEvent(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue(), this.phoneNumber.getValue(),this.email.getValue());
    this.apply(event);
  }

  public getId(): TravelerId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

 public getPhoneNumber(): PhoneNumber {
    return this.phoneNumber;
  }

public getEmail(): Email {
    return this.email;
  }

  public changeId(id:TravelerId) {
    this.id = id;
  }

  public changeName(name: Name): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }


public changePhoneNumber(phoneNumber: PhoneNumber): void {
    this.phoneNumber = phoneNumber;
  }


public changeEmail(email: Email): void {
    this.email = email;
  }
}
