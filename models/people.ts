import { Schema, SchemaTypes, model } from "mongoose";


interface person {
  username: String;
  password: String;
  memberInGroups: [Schema.Types.ObjectId];
  age: Number;
}

const userSchema = new Schema<person>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  memberInGroups: { type: [SchemaTypes.ObjectId], required: true },
  age: { type: Number, required: true }
});

const peopleArray = model<person>("User", userSchema);


export default peopleArray;
