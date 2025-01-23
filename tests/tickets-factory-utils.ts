import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  NewTicketDeployed,
  OwnershipTransferred
} from "../generated/TicketsFactory/TicketsFactory"

export function createNewTicketDeployedEvent(
  ticketAddress: Address,
  ownerSmartWallet: Address
): NewTicketDeployed {
  let newTicketDeployedEvent = changetype<NewTicketDeployed>(newMockEvent())

  newTicketDeployedEvent.parameters = new Array()

  newTicketDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketAddress",
      ethereum.Value.fromAddress(ticketAddress)
    )
  )
  newTicketDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "ownerSmartWallet",
      ethereum.Value.fromAddress(ownerSmartWallet)
    )
  )

  return newTicketDeployedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
