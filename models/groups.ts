import { Schema, SchemaTypes, model } from "mongoose";

interface group {
  groupName: String;
  subGroups: [Schema.Types.ObjectId];
  membersInGroups: [Schema.Types.ObjectId];
  messages: [Schema.Types.ObjectId];
}

const groupSchema = new Schema<group>({
  groupName: {
    type: String,
    required: true,
  },
  subGroups: [{
    type: [SchemaTypes.ObjectId],
    required: true,
  }
],
  membersInGroups: {
    type: [SchemaTypes.ObjectId],
    required: true,
  },
  messages: [{
    title: {type: String, required: true},
    msg: {type: String, required: true}
  }],
});

const groupArray = model<group>("groups", groupSchema);

export default groupArray;
