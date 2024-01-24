import {Transfer, Transfer__Params} from "../generated/events.ts";


export function handleTransfer(event : Transfer): void {
  let entity; 
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId
  entity.save()
}
