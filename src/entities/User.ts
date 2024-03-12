import { User} from "../../generated/schema"
import {Address ,BigInt } from '@graphprotocol/graph-ts'


export function CreateUser(address: Address, timestamp: BigInt): User 
{
    let user = new User(address.toHexString());
    user.timestamp = timestamp;
    user.save();

    return user as User    
}

export function gerOrCreateUser(address: Address, timestamp: BigInt): User 
{
    let user = User.load(address.toHexString());
    if (user === null) 
    {
        user = CreateUser(address, timestamp);
        user.save();
    }    

    return user as User    
}

export function updateUser(user: User, timestamp: BigInt): void {
    user.timestamp = timestamp;
    user.save()
  }