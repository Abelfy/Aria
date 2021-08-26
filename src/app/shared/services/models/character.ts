import { DocumentReference } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { User } from "./user";

export interface Character {
    owner : DocumentReference<User>,
    id?: string;
    identite : Identite;
    stats?: Statistique;
    skills?: Skill;
    notes?: string;
    money?: number;
    inventory?: Item[];
    availableSkillPoints?: number;
    createdAt?: firebase.default.firestore.Timestamp;
    updatedAt?: firebase.default.firestore.Timestamp;
    updatedBy?: DocumentReference<User>;
}

export interface Identite {
    charFirstname : string;
    charLastname : string;
    age : number;
    healthPoint?: number;
    maxHealthPoint?: number;
}

export interface Statistique {
    strength : number;
    dexterity : number;
    stamina : number;
    intelligence : number;
    charisma : number;
}

export interface Skill {
    craft : number;
    closeCombat : number;
    rangeCombat : number;
    natureKnowing : number;
    secretKnowing : number;
    runJump : number;
    stealth : number;
    dodge : number;
    law : number;
    intimidating : number;
    readWrite : number;
    deception : number;
    perception : number;
    driving : number;
    psychology : number;
    reflexes : number;
    picklocking : number;
    healing : number;
    surviving : number;
    stealing : number;
}

export interface Item {
    id : string;
    name : string;
    quantity : number;
    description : string;
}

export interface SpecialSkill {
    id : string;
    name : string;
    value : number;
    description : string;
}