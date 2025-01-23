import { BigInt, Bytes, DataSourceTemplate, store } from "@graphprotocol/graph-ts";
import { TransferSingle } from "../generated/Ticket/Ticket";
import { NewTicketDeployed } from "../generated/TicketsFactory/TicketsFactory";
import { Ticket, TicketHolder, TokenBalance, Transfer } from "../generated/schema";
import { TicketPurchased } from "../generated/TicketsFactory/Ticket";

export function handleTransferSingle(event: TransferSingle): void {
  let id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let transfer = new Transfer(id);

  transfer.ticket = event.address.toHexString();
  transfer.operator = event.params.operator;
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.tokenId = event.params.id;
  transfer.value = event.params.value;
  transfer.timestamp = event.block.timestamp;
  transfer.blockNumber = event.block.number;

  transfer.price = BigInt.fromI32(0);
  transfer.stakeholdersShare = BigInt.fromI32(0);

  updateTicketHolder(event.address, event.params.from, event.params.id, event.params.value.neg());
  updateTicketHolder(event.address, event.params.to, event.params.id, event.params.value);

  transfer.save();
}

function updateTicketHolder(ticketAddress: Bytes, holderAddress: Bytes, tokenId: BigInt, amountChange: BigInt): void {
  if (holderAddress.equals(Bytes.fromHexString("0x0000000000000000000000000000000000000000"))) {
    return; // Skip zero address
  }

  let ticketHolderId = ticketAddress.toHexString() + "-" + holderAddress.toHexString();
  let ticketHolder = TicketHolder.load(ticketHolderId);

  if (ticketHolder == null) {
    ticketHolder = new TicketHolder(ticketHolderId);
    ticketHolder.ticket = ticketAddress.toHexString();
    ticketHolder.holder = holderAddress;
    ticketHolder.totalAmount = BigInt.fromI32(0);
    ticketHolder.tokenBalances = [];
  }

  let tokenBalanceId = ticketHolderId + "-" + tokenId.toString();
  let tokenBalance = TokenBalance.load(tokenBalanceId);

  if (tokenBalance == null) {
    tokenBalance = new TokenBalance(tokenBalanceId);
    tokenBalance.ticketHolder = ticketHolderId;
    tokenBalance.tokenId = tokenId;
    tokenBalance.amount = BigInt.fromI32(0);

    let tokenBalances = ticketHolder.tokenBalances;
    tokenBalances.push(tokenBalance.id);
    ticketHolder.tokenBalances = tokenBalances;
  }

  tokenBalance.amount = tokenBalance.amount.plus(amountChange);
  ticketHolder.totalAmount = ticketHolder.totalAmount.plus(amountChange);

  if (tokenBalance.amount.equals(BigInt.fromI32(0))) {
    store.remove("TokenBalance", tokenBalanceId);
    let tokenBalances = ticketHolder.tokenBalances;
    let index = tokenBalances.indexOf(tokenBalanceId);
    if (index > -1) {
      tokenBalances.splice(index, 1);
    }
    ticketHolder.tokenBalances = tokenBalances;
  } else {
    tokenBalance.save();
  }

  if (ticketHolder.totalAmount.equals(BigInt.fromI32(0))) {
    store.remove("TicketHolder", ticketHolderId);
  } else {
    ticketHolder.save();
  }
}

export function handleTicketPurchased(event: TicketPurchased): void {
  let transferId = event.transaction.hash.toHexString() + "-" + (event.logIndex.minus(BigInt.fromI32(1))).toString();
  let transfer = Transfer.load(transferId);

  if (transfer) {
    transfer.price = event.params.price;
    transfer.stakeholdersShare = event.params.stakeholdersShare;
    transfer.save();
  }
}

export function handleNewTicketDeployed(event: NewTicketDeployed): void {
  let ticketId = event.params.ticketAddress.toHexString();
  let ticket = new Ticket(ticketId);
  ticket.address = event.params.ticketAddress;
  ticket.ownerSmartWallet = event.params.ownerSmartWallet;
  ticket.createdAt = event.block.timestamp;
  ticket.save();

  DataSourceTemplate.create("Ticket", [event.params.ticketAddress.toHexString()]);
}
