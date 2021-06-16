import { OrgV1, Anchored, Unanchored } from "../generated/OrgV1Factory/OrgV1";
import { Org, Anchor, Project } from "../generated/schema";
import { Address } from '@graphprotocol/graph-ts'

export function handleAnchored(event: Anchored): void {
  let anchor = new Anchor(event.transaction.hash.toHex());

  anchor.objectId = event.params.id;
  anchor.multihash = event.params.multihash;
  anchor.tag = event.params.tag;
  anchor.org = event.address.toHex();
  anchor.timestamp = event.block.timestamp;

  anchor.save();

  if (event.params.tag.isZero()) { // Project commit anchor.
    let proj = new Project(event.params.id.toHex());
    proj.org = event.address.toHex();
    proj.anchor = anchor.id;
    proj.save();
  }
}

export function handleUnanchored(event: Unanchored): void {}
