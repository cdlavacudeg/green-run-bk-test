import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    api: {
      port: parseInt(process.env.API_PORT) || 3000,
    },
  };
});
