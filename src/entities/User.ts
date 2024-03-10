import { User} from "../../generated/schema"
import {Transfer as TransferEvent} from "../../generated/mfers/mfers"

export function UserInfo(event: TransferEvent): User 
{
    let user = User.load(event.params.to.toHexString());
    if (!user) {
        user = new User(event.params.to.toHexString());
        user.save();
    }    

    return user as User    
}