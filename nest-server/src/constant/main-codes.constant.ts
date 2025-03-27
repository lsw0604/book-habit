export const CORS_CONFIG = {
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
} as const;

export const VALIDATION_PIPE_CONFIG = {
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
} as const;
