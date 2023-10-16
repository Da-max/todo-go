import { build } from "esbuild";
import { sync } from "glob";

const entryPoints = ["./src/index.ts"];

build({
    entryPoints: entryPoints,
    bundle: true,
    format: "esm",
    outdir: "./dist",
    sourcemap: true,
});

build({
    entryPoints: entryPoints,
    bundle: true,
    format: "cjs",
    outdir: "./dist",
    sourcemap: true,
    outExtension: { ".js": ".cjs" },
});
