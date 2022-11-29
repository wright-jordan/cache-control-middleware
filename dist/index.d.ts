import type * as tsHTTP from "ts-http";
declare module "ts-http" {
    interface Context {
        cacheStrategy: Strategy;
    }
}
type Strategy = "public, no-cache" | "private, no-cache" | "no-store";
declare function use(next: tsHTTP.Handler): tsHTTP.Handler;
export declare function CacheControl(): {
    use: typeof use;
};
export {};
