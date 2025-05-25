import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { init, send } from '@emailjs/browser';

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly SERVICE_ID = 'service_2iz9nkp';
  private readonly TEMPLATE_ID = 'template_x5fixto';
  private readonly ADMIN_TEMPLATE_ID = 'template_ucv6jr3';
  private readonly PUBLIC_KEY = 'j5aotIgjqwsIKo7Et';

  constructor() {
    init(this.PUBLIC_KEY);
  }

  sendEmail(data: EmailData): Observable<any> {
    const templateParams = {
      name: data.name,
      reply_to: data.email,
      phone_number: data.phone,
      subject: data.subject,
      message: data.message,
      to_email: 'info@divjipoly.com',
      email: data.email,
    };

    const admin_templateParams = {
      name: data.name,
      reply_to: 'jigar.shiroya7929@gmail.com',
      phone_number: data.phone,
      subject: data.subject,
      message: data.message,
      to_email: 'info@divjipoly.com',
      email: data.email,
    };

    return forkJoin([
      from(send(this.SERVICE_ID, this.ADMIN_TEMPLATE_ID, admin_templateParams)), // to yourself
      from(send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams)), // to user
    ]);
  }
}
