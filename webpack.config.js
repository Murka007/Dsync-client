const path = require("path");
const Terser = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const { defaultMinimizerOptions } = require("html-loader");
const { version } = require("./package.json");
const { DefinePlugin } = require("webpack");

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
                    const code = asset._value.match(/^\(\(\)(\s*=>\s*\{.+)\(\);?$/ms)[1];
                    asset._value = this.banner.replace(/\{CODE\}/, "((GM_info)" + code);
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
    }),
    new DefinePlugin({
        PRODUCTION: isProd
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
// ==/UserScript==
/* jshint esversion:6 */

/*
    Author: Murka
    Github: https://github.com/Murka007/Dsync-client
    Discord: https://discord.gg/sG9cyfGPj5
    Greasyfork: https://greasyfork.org/en/scripts/449995-dsync-client-sploop-io

    I need your support, please follow these steps:
    1. Join my DISCORD server
    2. Write a feedback about this script on GREASYFORK "script works, thank you so much"
    3. Star my repository on GITHUB
*/\n\nFunction("(" + {CODE}.toString() + \`)(\${JSON.stringify(GM_info)});\`)();`)
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
                        beautify: true,
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
                            // removeComments: true
                        }
                    }
                }
            }
        ]
    }
}