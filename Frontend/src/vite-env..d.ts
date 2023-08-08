interface ImportMetaEnv {
  readonly VITE_SERVER: string;
  readonly VITE_KAKAO_REST_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
