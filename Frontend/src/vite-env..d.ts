interface ImportMetaEnv {
  readonly VITE_SERVER: string;
  readonly VITE_KAKAO_REST_API: string;
  readonly VITE_NAVER_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
