"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    memberInGroups: { type: [mongoose_1.SchemaTypes.ObjectId], required: true },
    age: { type: Number, required: true }
});
const peopleArray = (0, mongoose_1.model)("User", userSchema);
exports.default = peopleArray;
