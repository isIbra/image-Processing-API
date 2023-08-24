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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImageAndRespond = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const outputFile = './images/processed';
const imageCache = {};
function processImageAndRespond(imagePath, width, height, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Processing:', { imagePath, width, height }); //debug
            if (!isValidNumber(width) || !isValidNumber(height)) {
                res.status(400).send('Invalid width or height parameters');
                return;
            }
            const processedImageBuffer = yield processImage(imagePath, width, height);
            res.set('Content-Type', 'image/jpeg');
            res.send(processedImageBuffer);
            const outputFileName = `processed_${path_1.default.basename(imagePath)}`;
            const outputImagePath = path_1.default.join(outputFile, outputFileName);
            yield (0, sharp_1.default)(processedImageBuffer).toFile(outputImagePath);
            console.log('Image saved to:', outputImagePath); //debug
        }
        catch (error) {
            console.error('An error occurred:', error);
            res.status(500).send('An error occurred');
        }
    });
}
exports.processImageAndRespond = processImageAndRespond;
function processImage(inputPath, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheKey = `${inputPath}_${width}_${height}`;
        if (imageCache[cacheKey]) {
            return imageCache[cacheKey];
        }
        const processedImageBuffer = yield (0, sharp_1.default)(inputPath).resize(width, height).toBuffer();
        imageCache[cacheKey] = processedImageBuffer;
        return processedImageBuffer;
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidNumber(value) {
    return !isNaN(value) && parseInt(value) > 0;
}
