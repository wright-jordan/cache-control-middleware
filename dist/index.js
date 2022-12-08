import { webcrypto } from "crypto";
function use(next) {
    return async function cacheControlMiddleware(req, res, ctx) {
        await next(req, res, ctx);
        if (res.headersSent) {
            return;
        }
        res.setHeader("Cache-Control", ctx.cacheStrategy);
        if (ctx.cacheStrategy === "no-store") {
            return;
        }
        const oldETag = req.headers["if-none-match"] || "";
        const newETag = Buffer.from(await webcrypto.subtle.digest("SHA-256", new TextEncoder().encode(ctx.reply))).toString("base64url");
        res.setHeader("ETag", newETag);
        if (oldETag === newETag) {
            ctx.status = 304;
            ctx.reply = "";
        }
    };
}
export function CacheControl() {
    return {
        use,
    };
}
