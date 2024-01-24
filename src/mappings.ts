import {Transfer, OwnershipTransferred} from "../generated/Contract/Contract";


export function handleTransfer(event : Transfer): void {
  let entity
  entity.id= event.transaction.from.toHex()
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleOwnershipTransfer(event : OwnershipTransferred): void {
  let entity
  entity.newOwner = event.params.newOwner
  entity.previousOwner = event.params.previousOwner
  entity.save()
}