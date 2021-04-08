"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var path_1 = __importDefault(require("path"));
var cells_1 = require("./routes/cells");
var cors_1 = __importDefault(require("cors"));
var serve = function (port, filename, dirName, useProxy) {
    var app = express_1.default();
    app.use(cors_1.default());
    app.use(cells_1.createCellsRouter(filename, dirName));
    // if proxy is in use, activate local development mode
    if (useProxy) {
        app.use(http_proxy_middleware_1.createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
    }
    else {
        // else, run in user's machine
        var packagePath = require.resolve('@jsnote-bw/local-client/build/index.html');
        // extract dir path
        var packageDir = path_1.default.dirname(packagePath);
        app.use(express_1.default.static(packageDir));
    }
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
