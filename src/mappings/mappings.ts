import {Transfer as TransferEvent, Contract} from "../../generated/Contract/Contract";
import {Token} from "../../generated/schema"
import {TokenMetadata} from "../../generated/templates"

const ipfsHash = "QmbAvUyPA1E3Xe2bNhsHpnaqZYNpdwdfRjw3YGKaA9dMzk";

export function handleTransfer(event : TransferEvent, cont: Contract): void {
  const entity = new Token(event.transaction.hash.toHex());
  entity.tokenID = event.params.tokenId;
  entity.tokenURI = cont.tokenURI.toString();
  entity.updatedAtTimestamp = event.block.timestamp;

}

export function handleMetadata(call : TokenMetadata): void {
  const entity = new TokenMetadata();



}
