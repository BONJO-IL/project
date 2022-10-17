import express from "express";
import { getRandomUsername } from "@excalidraw/random-username";
import mongoose from "mongoose";
import { addPerson, addGroup } from "./querys";
import groupArray from "./models/groups";
import peopleArray from "./models/people";

const app = express();
const Mongo_Uri =
  process.env.MONGO_URI || "mongodb://localhost:27023/forlearning";
const PORT = process.env.PORT || 4000;

app.get("/allPeoples", async (req, res) => {
  const array = await peopleArray.find({});
  res.send(JSON.stringify(array));
});

app.get("/addPerson", async (req, res) => {
  addPerson();
  res.send("person was added");
});

app.get("/revmovePersonById/:id", async (req, res) => {
  const action = await peopleArray.findByIdAndDelete(req.params.id);
  if (action === null) {
    res.send("error. person not been found");
  } else {
    res.send("user deleted secsussfully");
  }
});

app.get("/editPersonById/:id", async (req, res) => {
  const editPersonById = await peopleArray.findByIdAndUpdate(req.params.id, {
    username: getRandomUsername(),
  });
  if (editPersonById === null) {
    res.send("error. person not been found");
  } else {
    res.send("user updated secsussfully");
  }
});

app.get("/allGroups", async (req, res) => {
  const array = await groupArray.find({});
  res.send(JSON.stringify(array));
});

app.get("/addGroup", async (req, res) => {
  addGroup();
  res.send("group was added");
});

app.get("/revmoveGroupById/:id", async (req, res) => {
  const action = await groupArray.findByIdAndDelete(req.params.id);
  if (action === null) {
    res.send("error. person not been found");
  } else {
    res.send("user deleted secsussfully");
  }
});

app.get("/addSubGroupInto/:groupID/subGroupName/:name", async (req, res) => {
  const newSubGroup = {
    GroupName: req.params.name,
    subGroups: [],
    membersInGroups: [],
  };

  const GroupById = await groupArray.findByIdAndUpdate(
    req.params.groupID,
    {
      $push: {
        subGroups: {
          subGroupName: newSubGroup.GroupName,
          id: newSubGroup,
          subGroups: [],
          membersInGroups: [],
        },
      },
    },
    { safe: true, upsert: true, new: true },
    function (err) {
      console.log(err);
    }
  );

  if (GroupById === null) {
    res.send("error. person not been found");
  } else {
    res.send("user updated secsussfully");
  }
});

app.listen(PORT, () => {
  console.log(Mongo_Uri);
  mongoose
    .connect(Mongo_Uri, { retryWrites: true, w: "majority" })
    .then((db) => {})
    .catch((err) => {
      console.log(err);
    });
});
