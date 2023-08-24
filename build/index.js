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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const imageHandler_1 = require("./utilities/imageHandler");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
const inputFile = './images/original';
app.get('/process-image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.query.filename;
        const width = parseInt(req.query.width, 10);
        const height = parseInt(req.query.height, 10);
        console.log('Received:', { filename, width, height }); //debug
        if (!filename) {
            res.status(400).send('Missing filename parameter');
            return;
        }
        const imagePath = path_1.default.join(inputFile, filename);
        console.log('Image path:', imagePath); //debug
        yield (0, imageHandler_1.processImageAndRespond)(imagePath, width, height, res);
    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('An error occurred');
    }
}));
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
