import {
  NewTicketDeployed as NewTicketDeployedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/TicketsFactory/TicketsFactory"
import { NewTicketDeployed, OwnershipTransferred } from "../generated/schema"

export function handleNewTicketDeployed(event: NewTicketDeployedEvent): void {
  let entity = new NewTicketDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ticketAddress = event.pxrams.ticketAddress
  entity.ownerSmartWallet = event.params.ownerSmartWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
