import { createHash } from "crypto";
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
        const newETag = createHash("sha256").update(ctx.reply).digest("hex");
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
