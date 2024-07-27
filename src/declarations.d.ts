// src/types/declarations.d.ts

declare module "*.wasm" {
  const content: any;
  export default content;
}

declare module "*.js" {
  const content: any;
  export default content;
}
