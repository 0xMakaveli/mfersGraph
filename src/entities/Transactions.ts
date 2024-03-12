import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import {Transaction} from "../../generated/schema"

export function CreateTransaction(event: TransferEvent): Transaction 
{
    let tx = new Transaction(event.transaction.hash.toHex());
    tx.transactionFrom = event.transaction.from;
    tx.transactionTo = event.params.to;
    tx.gasPrice = event.transaction.gasPrice;
    tx.timestamp = event.block.timestamp;
    tx.save();

    
    return tx as Transaction
}
