export interface Character {
    id : string;
    identite : Identite;
    stats : Statistique;
    skills : Skill;
    selected: boolean;
}

export interface Identite {
    charFirstname : string;
    charLastname : string;
    age : number;
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