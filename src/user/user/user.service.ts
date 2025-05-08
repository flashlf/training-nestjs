import { Injectable } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(private validationService: ValidationService) {}
  sayHello(name: string): string {
    const schema = z.string().min(3).max(32);
    const result = this.validationService.validate(schema, name);
    return `Hello ${result}`;
  }
}
