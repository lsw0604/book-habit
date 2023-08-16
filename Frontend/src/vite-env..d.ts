interface ImportMetaEnv {
  readonly VITE_SERVER: string;
  readonly VITE_KAKAO_REST_API: string;
  readonly VITE_KAKAO_REDIRECT_URI: string;
  readonly VITE_KAKAO_LOGOUT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
