import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Default email configuration - to be replaced later
  private emailConfig = {
    to: 'default@divjipoly.com',
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@gmail.com', // to be replaced
        pass: 'your-app-password' // to be replaced
      }
    }
  };

  constructor(private http: HttpClient) {}

  sendEmail(data: EmailData): Observable<any> {
    // For now, we'll use EmailJS as a temporary solution
    // Replace with your actual email service implementation
    const emailJsConfig = {
      service_id: 'default_service',
      template_id: 'template_default',
      user_id: 'your-emailjs-user-id', // to be replaced
      template_params: {
        to_email: this.emailConfig.to,
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message
      }
    };

    return this.http.post('https://api.emailjs.com/api/v1.0/email/send', emailJsConfig);
  }
}
