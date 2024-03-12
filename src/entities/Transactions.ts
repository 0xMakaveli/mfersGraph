import { Address,BigInt,Bytes } from "@graphprotocol/graph-ts";
import {Transaction} from "../../generated/schema"

export function CreateTransaction(Bytes: Bytes,timestamp: BigInt): Transaction 
{
    const tx = new Transaction(Bytes.toHexString());
    tx.timestamp = timestamp;
    tx.save();
    return tx as Transaction
}


export function getOrCreateTransaction(Bytes: Bytes,timestamp: BigInt): Transaction 
{
    let tx = Transaction.load(Bytes.toHexString())
    if(tx === null) {
        tx = CreateTransaction(Bytes,timestamp)
    }
    return tx as Transaction
}

export function updateTransaction(tx: Transaction,timestamp: BigInt): void 
{   
    tx.timestamp = timestamp
    tx.save()
    
}
