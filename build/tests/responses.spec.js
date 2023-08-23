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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe('Server Responses', () => {
    it('should respond with processed image and return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/process-image?filename=encenadaport.jpg&width=200&height=150');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('image/jpeg');
        expect(response.body instanceof Buffer).toBeTrue();
    }));
    it('should respond with 400 if filename parameter is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/process-image');
        expect(response.status).toBe(400);
        expect(response.text).toContain('Missing filename parameter');
    }));
    it('should respond with 500 on processing error', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/process-image?filename=nonexistent.jpg&width=200&height=150');
        expect(response.status).toBe(500);
        expect(response.text).toContain('An error occurred');
    }));
});
