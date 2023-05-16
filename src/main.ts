import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const swaggerDocumentConfig = new DocumentBuilder()
    .setTitle('GreenRun API')
    .setDescription('GreenRun Backend Challenge')
    .setVersion('1.0')
    .addServer('/api/v1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentConfig, { ignoreGlobalPrefix: true });

  SwaggerModule.setup('/api/v1/docs', app, swaggerDocument);

  await app.listen(process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000);
}
bootstrap();
