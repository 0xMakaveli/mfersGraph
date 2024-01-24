import {Transfer as TransferEvent, OwnershipTransferred as OwnershipTransferredEvent} from "../generated/Contract/Contract";
import { Transfer, OwnershipTransferred} from "../generated/schema"

export function handleTransfer(event : TransferEvent): void {
  let entity =  new Transfer(event.transaction.hash)
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleOwnershipTransfer(event : OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(event.transaction.hash.toHex())
  entity.newOwner = event.params.newOwner
  entity.previousOwner = event.params.previousOwner
  entity.save()
}