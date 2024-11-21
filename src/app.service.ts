import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    console.log("CURRENT_ENV", process.env.CURRENT_ENV);
    return `This application is running on: ${process.env.NODE_PORT}`;
  }
}
