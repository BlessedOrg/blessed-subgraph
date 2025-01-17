import { TransferSingle } from "./generated/Ticket/Ticket";
import { Transfer } from "../generated/schema";

export function handleTransferSingle(event: TransferSingle): void {
  let id = event.transaction.hash.toHexString() + '-' + event.logIndex.toString()
  let transfer = new Transfer(id)

  // Add this line to link the transfer to the ticket contract
  transfer.ticket = event.address.toHexString()

  transfer.operator = event.params.operator
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.tokenId = event.params.id
  transfer.value = event.params.value
  transfer.timestamp = event.block.timestamp
  transfer.blockNumber = event.block.number
  transfer.save()
}