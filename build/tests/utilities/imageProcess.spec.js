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
/* eslint-disable no-undef */
const imageProcess_1 = require("../../utilities/imageProcess");
describe('imageProcess', () => {
    it('should process an image', () => __awaiter(void 0, void 0, void 0, function* () {
        const imagePath = '../../../images/original/palmtunnel.jpg';
        const width = 200;
        const height = 150;
        const processedImageBuffer = yield (0, imageProcess_1.processImage)(imagePath, width, height);
        expect(processedImageBuffer).toBeDefined();
        expect(processedImageBuffer instanceof Buffer).toBeTrue();
    }));
});
