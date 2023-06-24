declare namespace NodeJS {
  interface Process {
    env: Env;
  }
  interface Env {
    [key: string]: string;
  }
}
