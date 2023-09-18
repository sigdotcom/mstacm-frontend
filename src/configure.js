"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_ssm_1 = require("@aws-sdk/client-ssm");
var credential_provider_sso_1 = require("@aws-sdk/credential-provider-sso");
var fs = require("fs");
var REGION = "us-east-1";
var PROFILE = "dev";
var env = process.env.DEPLOYING_ENV_VAR || null;
// Initializing the SSM client with specific profile and region
var ssmClientConfig = {
    region: REGION
};
if (!env) {
    ssmClientConfig.credentials = (0, credential_provider_sso_1.fromSSO)({ profile: PROFILE });
    console.log("RUNNING IN LOCAL CONFIG");
}
var ssmClient = new client_ssm_1.SSMClient(ssmClientConfig);
// Fetch parameters
function fetchParameters() {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, authDomain, userPoolId, userPoolWebClientId, redirectSignIn, redirectSignOut, authDomainResponse, userPoolIdResponse, userPoolWebClientIdResponse, redirectSignInResponse, redirectSignOutResponse, envContent, formattedEnv, error_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    apiUrl = "https://nnikhk3cq3.execute-api.us-east-1.amazonaws.com/Prod";
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 7, , 8]);
                    authDomain = new client_ssm_1.GetParameterCommand({
                        Name: "authDomain",
                        WithDecryption: true
                    });
                    userPoolId = new client_ssm_1.GetParameterCommand({
                        Name: "userPoolId",
                        WithDecryption: true
                    });
                    userPoolWebClientId = new client_ssm_1.GetParameterCommand({
                        Name: "userPoolWebClientId",
                        WithDecryption: true
                    });
                    redirectSignIn = new client_ssm_1.GetParameterCommand({
                        Name: "redirectSignIn",
                        WithDecryption: true
                    });
                    redirectSignOut = new client_ssm_1.GetParameterCommand({
                        Name: "redirectSignOut",
                        WithDecryption: true
                    });
                    return [4 /*yield*/, ssmClient.send(authDomain)];
                case 2:
                    authDomainResponse = _g.sent();
                    return [4 /*yield*/, ssmClient.send(userPoolId)];
                case 3:
                    userPoolIdResponse = _g.sent();
                    return [4 /*yield*/, ssmClient.send(userPoolWebClientId)];
                case 4:
                    userPoolWebClientIdResponse = _g.sent();
                    return [4 /*yield*/, ssmClient.send(redirectSignIn)];
                case 5:
                    redirectSignInResponse = _g.sent();
                    return [4 /*yield*/, ssmClient.send(redirectSignOut)];
                case 6:
                    redirectSignOutResponse = _g.sent();
                    if (((_a = authDomainResponse.Parameter) === null || _a === void 0 ? void 0 : _a.Value) === "mstacm-prod-auth") {
                        apiUrl = "https://dcyks1vctb.execute-api.us-east-1.amazonaws.com/Prod";
                    }
                    envContent = "\n        REACT_APP_AUTH_DOMAIN=".concat((_b = authDomainResponse.Parameter) === null || _b === void 0 ? void 0 : _b.Value, "\n        REACT_APP_USER_POOL_ID=").concat((_c = userPoolIdResponse.Parameter) === null || _c === void 0 ? void 0 : _c.Value, "\n        REACT_APP_USER_POOL_CLIENT_ID=").concat((_d = userPoolWebClientIdResponse.Parameter) === null || _d === void 0 ? void 0 : _d.Value, "\n        REACT_APP_REDIRECT_SIGNIN_URL=").concat((_e = redirectSignInResponse.Parameter) === null || _e === void 0 ? void 0 : _e.Value, "\n        REACT_APP_REDIRECT_SIGNOUT_URL=").concat((_f = redirectSignOutResponse.Parameter) === null || _f === void 0 ? void 0 : _f.Value, "\n        REACT_APP_API_URL=").concat(apiUrl, "\n      ");
                    formattedEnv = envContent
                        .split("\n")
                        .map(function (line) { return line.trim(); })
                        .join("\n")
                        .trim();
                    fs.writeFileSync(".env", formattedEnv);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _g.sent();
                    console.error("Error fetching parameters:", error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
fetchParameters();
