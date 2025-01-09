import { Machine } from "./Machine";

export type Reparation ={
    id : number ;
    callNumber: string;
    description: string;
    releaseDate: string;
    descriptionTravail:string;
    machine: Machine;
}