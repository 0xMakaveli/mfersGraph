import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import {BigInt} from '@graphprotocol/graph-ts'
import {Transaction} from "../../generated/schema"

export function CreateTransaction(event: TransferEvent): Transaction 
{
    let tx = new Transaction(event.transaction.hash.toHexString());
    tx.transactionFrom = event.params.from;
    tx.transactionTo = event.params.to;
    tx.gasPrice = event.transaction.gasPrice;
    tx.timestamp = event.block.timestamp;
    tx.save();
    return tx as Transaction
}


export function getOrCreateTransaction(event: TransferEvent): Transaction 
{
    let tx = Transaction.load(event.transaction.hash.toHexString())
    if(tx === null) {
        tx = CreateTransaction(event)
    }
    return tx as Transaction
}

export function updateTransaction(tx: Transaction,timestamp: BigInt): void 
{   
    tx.timestamp = timestamp
    tx.save()
    
}
