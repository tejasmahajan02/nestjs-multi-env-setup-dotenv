import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Add more valid environments
// const VALID_ENV = ['development.local', 'development', 'production'];
// const ENV = VALID_ENV.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development.local';

enum Environment {
  Local = 'development.local',
  Development = 'development',
  Production = 'production',
}

// Convert the NODE_ENV to match one of the valid environments in the enum
const ENV = Object.values(Environment).includes(process.env.NODE_ENV as Environment)
  ? (process.env.NODE_ENV as Environment)
  : Environment.Local;

const ENV_FILE_PATH = `${process.cwd()}/.env.${ENV}`;
const COMMON_ENV_FILE_PATH = `${process.cwd()}/.env.common`;

// Note : dotenv gives higher precedence to variables defined in the FIRST file loaded.
dotenv.config({ path: [ENV_FILE_PATH, COMMON_ENV_FILE_PATH] }); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.NODE_PORT ?? 3000;
  await app.listen(port);
  console.log(`This application is running on: ${await app.getUrl()}`);
}
bootstrap();
