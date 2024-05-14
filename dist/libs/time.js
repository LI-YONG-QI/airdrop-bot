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
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.randomDelay = exports.getTime = void 0;
function getTime() {
    const date = new Date(Date.now());
    const formatStakeTime = date.toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
    });
    return formatStakeTime;
}
exports.getTime = getTime;
function randomDelay(limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const MINUTES = 60; // 60 seconds
        const LIMIT = Number(limit) * MINUTES; // 最多不超過延遲 $DELAY 分鐘
        const rand = Math.floor(Math.random() * LIMIT);
        console.log(`Start time: ${getTime()} | Delay ${rand} seconds`);
        yield delay(rand * 1000);
    });
}
exports.randomDelay = randomDelay;
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    });
}
exports.delay = delay;
// -c "*/5 * * * * *" -d 0 -p $PK --amount 0.01
