import { User } from './user';
import { Category } from './category';
export interface Cours {
    _id:string;
    title:string;
    description:string;
    created_at:Date;
    category_id:Category;
    content:{};
    user_id:User;
    status:boolean;
    price:number,
    subtitle:string;
    language:string;
    coverphoto:{}

}
