declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    HOST: string;
    DB_USER: string;
    PASSWORD: string;
    DATABASE: string;

    PORT: string;

    CLIENT_URL: string;

    SESSION_SECRET_KEY: string;

    ACCESS_TOKEN: string;
    REFRESH_TOKEN: string;

    KAKAO_CLIENT: string;
    KAKAO_SECRET: string;
    KAKAO_CALLBACK: string;

    GOOGLE_CLIENT: string;
    GOOGLE_SECRET: string;
    GOOGLE_CALLBACK: string;
  }
}
