import { DataSourceTemplate } from "@graphprotocol/graph-ts";
import { NewTicketDeployed } from "./generated/TicketsFactory/TicketsFactory";
import { Ticket } from "../generated/schema";

export function handleNewTicketDeployed(event: NewTicketDeployed): void {
  let ticket = new Ticket(event.params.ticketAddress.toHexString())
  ticket.address = event.params.ticketAddress
  ticket.createdAt = event.block.timestamp
  ticket.save()

  DataSourceTemplate.create('Ticket', [event.params.ticketAddress.toHexString()])
}
