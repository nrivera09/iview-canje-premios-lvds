/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ACITY_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
