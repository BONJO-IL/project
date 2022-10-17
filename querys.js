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
exports.addGroup = exports.addPerson = void 0;
const random_username_1 = require("@excalidraw/random-username");
const people_1 = __importDefault(require("./models/people"));
const groups_1 = __importDefault(require("./models/groups"));
const addPerson = () => __awaiter(void 0, void 0, void 0, function* () {
    const person = new people_1.default({
        username: (0, random_username_1.getRandomUsername)(),
        password: (0, random_username_1.getRandomUsername)(),
        memberInGroups: [],
        age: Math.floor(Math.random() * 60 + 1),
    });
    yield person.save();
});
exports.addPerson = addPerson;
const addGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    const group = new groups_1.default({
        groupName: (0, random_username_1.getRandomUsername)(),
        subGroups: [],
        membersInGroups: []
    });
    yield group.save();
});
exports.addGroup = addGroup;
