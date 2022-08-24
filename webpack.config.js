const path = require("path");
const Terser = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const { defaultMinimizerOptions } = require("html-loader");
const { version } = require("./package.json");

const MODE = process.env.MODE.replace(/\-tamper/, "");
const isProd = MODE === "production";

for (const key in defaultMinimizerOptions) {
    defaultMinimizerOptions[key] = isProd;
}

class BannerPlugin {
    constructor(banner) {
        this.banner = banner;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, callback) => {
            for (const chunk of compilation.chunks) {
                for (const filename of chunk.files) {
                    const asset = compilation.assets[filename];
                    const code = asset._value.match(/^(\(\(\)\s*=>\s*\{.+)\(\);?$/ms)[1];
                    asset._value = this.banner.replace(/\{CODE\}/, code);
                }
            }
            callback();
        })
    }
}

const plugins = [
    new WatchExternalFilesPlugin({
        files: [
            "./src/**/**/*",
            "./src/**/*",
            "./src/*",
            "./public/**/**/*",
            "./public/**/*",
            "./public/*",
        ]
    })
];

if (isProd) {
    plugins.push(
        new BannerPlugin(`// ==UserScript==
// @name Dsync Client [Sploop.io]
// @author Murka
// @description The most advanced hack for sploop.io
// @icon https://sploop.io/img/ui/favicon.png
// @version ${version}
// @match *://sploop.io/*
// @run-at document-start
// @grant none
// @license MIT
// @namespace https://greasyfork.org/users/919633
// @downloadURL https://raw.githubusercontent.com/Murka007/Dsync-client/main/build/Dsync_Client.user.js
// ==/UserScript==
/* jshint esversion:6 */

/*
    Author: Murka
    Github: https://github.com/Murka007/Dsync-client
    Discord: https://discord.gg/sG9cyfGPj5
    Greasyfork: https://greasyfork.org/en/users/919633

    PLEASE, I NEED YOUR SUPPORT ON GITHUB (GIVE ME A STAR ON MY REPOSITORY),
    ALSO SUPPORT THIS SCRIPT ON GREASYFORK (register and write a comment: "this script works, thank you so much"),
    FOR MORE UPDATES JOIN MY DISCORD SERVER!!!
*/\n\nFunction("(" + {CODE}.toString() + ")();")();`)
    )
}

if (!process.env.MODE.endsWith("-tamper")) {
    plugins.push(
        new HTMLWebpackPlugin({
            title: "Dsync client",
            inject: "body",
            minify: {
                collapseWhitespace: isProd,
                minifyCSS: isProd,
                minifyJS: isProd
            }
        }),
        new HtmlInlineScriptPlugin()
    )
}

module.exports = {
    mode: MODE,
    target: ["web", "es2020"],
    entry: "./src/index.ts",
    output: {
        filename: "Dsync_Client.user.js",
        path: path.resolve(__dirname, isProd ? "build" : "dist"),
        clean: true
    },
    optimization: {
        minimizer: [
            new Terser({
                terserOptions: {
                    compress: false,
                    mangle: false,
                    parse: false,
                    output: false,
                    format: {
                        beautify: true
                    }
                }
            })
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: [".ts", ".js", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node-modules/
            },
            {
                test: /\.scss$/i,
                use: [
                    "raw-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: {
                            ...defaultMinimizerOptions,
                            removeComments: true
                        }
                    }
                }
            }
        ]
    }
}