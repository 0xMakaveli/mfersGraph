import {
    ethereum,
    JSONValue,
    TypedMap,
    Entity,
    Bytes,
    Address,
    BigInt
  } from "@graphprotocol/graph-ts";

export class Transfer extends ethereum.Event {
    get params(): Transfer__Params {
      return new Transfer__Params(this);
    }
  }
  
  export class Transfer__Params {
    _event: Transfer;
  
    constructor(event: Transfer) {
      this._event = event;
    }
  
    get from(): Address {
      return this._event.parameters[0].value.toAddress();
    }
  
    get to(): Address {
      return this._event.parameters[1].value.toAddress();
    }
  
    get tokenId(): BigInt {
      return this._event.parameters[2].value.toBigInt();
    }
  }
  