import { TransferSingle } from "./generated/Ticket/Ticket";
import { Ticket, Transfer } from "../generated/schema";
import { DataSourceTemplate } from "@graphprotocol/graph-ts";
import { NewTicketDeployed } from "./generated/TicketsFactory/TicketsFactory";


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

export function handleNewTicketDeployed(event: NewTicketDeployed): void {
  let ticket = new Ticket(event.params.ticketAddress.toHexString())
  ticket.address = event.params.ticketAddress
  ticket.ownerSmartWallet = event.params.ownerSmartWallet
  ticket.createdAt = event.block.timestamp
  ticket.save()

  DataSourceTemplate.create('Ticket', [event.params.ticketAddress.toHexString()])
}
