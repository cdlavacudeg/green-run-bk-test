import { SetMetadata } from '@nestjs/common';

export enum RequestLocation {
  body = 'body',
  query = 'query',
  params = 'params',
}

export const LocationIdUser = (locationsIdUser: RequestLocation) => SetMetadata('locationIdUser', locationsIdUser);
