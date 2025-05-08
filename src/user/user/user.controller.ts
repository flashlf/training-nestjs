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
  Inject,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from 'generated/prisma';
import { ValidationFilter } from 'src/validation/validation.filter';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailSerivce: MailService,
    @Inject('EmailService') private emailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService,
  ) {}
  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailSerivce.send();
    this.emailService.send();

    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();
    return this.connection.getName();
  }

  @Get('/hello')
  @UseFilters(ValidationFilter)
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/create')
  async create(
    @Query('firstname') firstName: string,
    @Query('lastname') lastName?: string,
  ): Promise<User> {
    return this.userRepository.save(firstName, lastName);
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
