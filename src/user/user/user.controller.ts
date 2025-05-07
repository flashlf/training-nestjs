import {
  Controller,
  Get,
  Post,
  Req,
  Query,
  Param,
  Header,
  HttpCode,
  Redirect,
  HttpRedirectResponse,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailSerivce: MailService,
  ) {}
  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailSerivce.send();
    return this.connection.getName();
  }

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return `${request.cookies['name']}`;
  }

  @Get('/sample-json')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  jsonReturn(): Record<string, string> {
    return {
      data: 'Hello Bitch JSON',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-json',
      statusCode: 301,
    };
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/:id')
  get(@Param('id') id: string): string {
    return `GET ${id}`;
  }
}
