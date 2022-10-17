"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    groupName: {
        type: String,
        required: true,
    },
    subGroups: [{
            type: [mongoose_1.SchemaTypes.ObjectId],
            required: true,
        }
    ],
    membersInGroups: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        required: true,
    },
    messages: [{
            title: { type: String, required: true },
            msg: { type: String, required: true }
        }],
});
const groupArray = (0, mongoose_1.model)("groups", groupSchema);
exports.default = groupArray;
