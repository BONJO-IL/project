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
const express_1 = __importDefault(require("express"));
const random_username_1 = require("@excalidraw/random-username");
const mongoose_1 = __importDefault(require("mongoose"));
const querys_1 = require("./querys");
const groups_1 = __importDefault(require("./models/groups"));
const people_1 = __importDefault(require("./models/people"));
const app = (0, express_1.default)();
const Mongo_Uri = process.env.MONGO_URI || "mongodb://localhost:27023/forlearning";
const PORT = process.env.PORT || 4000;
app.get("/allPeoples", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const array = yield people_1.default.find({});
    res.send(JSON.stringify(array));
}));
app.get("/addPerson", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, querys_1.addPerson)();
    res.send("person was added");
}));
app.get("/revmovePersonById/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const array = yield people_1.default.findByIdAndDelete(req.params.id);
    if (array === null) {
        res.send("error. person not been found");
    }
    else {
        res.send("user deleted secsussfully");
    }
}));
app.get("/editPersonById/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const editPersonById = yield people_1.default.findByIdAndUpdate(req.params.id, {
        username: (0, random_username_1.getRandomUsername)(),
    });
    if (editPersonById === null) {
        res.send("error. person not been found");
    }
    else {
        res.send("user updated secsussfully");
    }
}));
app.get("/allGroups", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const array = yield groups_1.default.find({});
    res.send(JSON.stringify(array));
}));
app.get("/addGroup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, querys_1.addGroup)();
    res.send("group was added");
}));
app.get("/addSubGroupInto/:groupID/subGroupName/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSubGroup = {
        GroupName: req.params.name,
        subGroups: [],
        membersInGroups: [],
    };
    const GroupById = yield groups_1.default.findByIdAndUpdate(req.params.groupID, {
        $push: {
            subGroups: {
                subGroupName: newSubGroup.GroupName,
                id: newSubGroup,
                subGroups: [],
                membersInGroups: [],
            },
        },
    }, { safe: true, upsert: true, new: true }, function (err) {
        console.log(err);
    });
    if (GroupById === null) {
        res.send("error. person not been found");
    }
    else {
        res.send("user updated secsussfully");
    }
}));
app.listen(PORT, () => {
    console.log(Mongo_Uri);
    mongoose_1.default
        .connect(Mongo_Uri, { retryWrites: true, w: "majority" })
        .then((db) => { })
        .catch((err) => {
        console.log(err);
    });
});
