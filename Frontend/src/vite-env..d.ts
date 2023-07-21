interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
