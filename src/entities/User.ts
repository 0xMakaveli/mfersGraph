import { User} from "../../generated/schema"
import {Transfer as TransferEvent} from "../../generated/mfers/mfers"


export function CreateUser(event: TransferEvent): User 
{
    let user = new User(event.params.to.toHexString());
    user.save();

    return user as User    
}

export function gerOrCreateUser(event: TransferEvent): User 
{
    let user = User.load(event.params.to.toHexString());
    if (user === null) 
    {
        user = CreateUser(event);
        user.save();
    }    

    return user as User    
}