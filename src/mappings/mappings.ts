import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import { TokenHandler,UserHandler,TransactionHandler } from "../entities/Handlers"
import { CreateTokenMetadata} from "../entities/TokenMetadata"
import { Bytes} from '@graphprotocol/graph-ts'


export function handleTransfer(event: TransferEvent): void {
	TokenHandler(event)
	UserHandler(event);
	TransactionHandler(event);

}

export function handleMetadata(content: Bytes): void {
	CreateTokenMetadata(content);
}
