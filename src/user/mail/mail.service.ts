import { Injectable } from '@nestjs/common';

export class MailService {
  send() {
    console.info('Send email');
  }
}

export const mailSerivce = new MailService();
