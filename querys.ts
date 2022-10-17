import { getRandomUsername } from "@excalidraw/random-username";
import peopleArray from "./models/people";
import groupArray from "./models/groups";


const addPerson = async () => {
    const person = new peopleArray({
      username: getRandomUsername(),
      password: getRandomUsername(),
      memberInGroups: [],
      age: Math.floor(Math.random() * 60 + 1),
    });
    await person.save();
  };

const addGroup = async () => {
    const group = new groupArray ({
        groupName: getRandomUsername(),
        subGroups:[],
        membersInGroups: []
    })

    await group.save();
}

  
  export {addPerson, addGroup}