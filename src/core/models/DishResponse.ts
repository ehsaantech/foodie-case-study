export interface ChefResponse {
    id : number
    firstName : string
    lastName : string
}



export interface AllDishesResponse {
    id : number;
    name : string;
    description : string;
    price : number;
    image : string;
    chef : ChefResponse
}


export interface DishesResponse {
    id : number;
    name : string;
    description : string;
    price : number;
    image : string;
}
