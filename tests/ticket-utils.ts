import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
  MintedFromProof,
  OwnershipTransferred,
  SmartWalletUpdated,
  StakeholderAdded,
  StakeholderRemoved,
  StakeholderUpdated,
  StakeholdersLocked,
  SupplyUpdated,
  TransferBatch,
  TransferSingle,
  URI
} from "../generated/Ticket/Ticket"

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createMintedFromProofEvent(
  timestamp: BigInt,
  userSmartWalletAddress: Address,
  context: string,
  userSmartWalletAddressFromContext: string
): MintedFromProof {
  let mintedFromProofEvent = changetype<MintedFromProof>(newMockEvent())

  mintedFromProofEvent.parameters = new Array()

  mintedFromProofEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  mintedFromProofEvent.parameters.push(
    new ethereum.EventParam(
      "userSmartWalletAddress",
      ethereum.Value.fromAddress(userSmartWalletAddress)
    )
  )
  mintedFromProofEvent.parameters.push(
    new ethereum.EventParam("context", ethereum.Value.fromString(context))
  )
  mintedFromProofEvent.parameters.push(
    new ethereum.EventParam(
      "userSmartWalletAddressFromContext",
      ethereum.Value.fromString(userSmartWalletAddressFromContext)
    )
  )

  return mintedFromProofEvent
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

export function createSmartWalletUpdatedEvent(
  previousWallet: Address,
  newWallet: Address
): SmartWalletUpdated {
  let smartWalletUpdatedEvent = changetype<SmartWalletUpdated>(newMockEvent())

  smartWalletUpdatedEvent.parameters = new Array()

  smartWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "previousWallet",
      ethereum.Value.fromAddress(previousWallet)
    )
  )
  smartWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam("newWallet", ethereum.Value.fromAddress(newWallet))
  )

  return smartWalletUpdatedEvent
}

export function createStakeholderAddedEvent(
  wallet: Address,
  feePercentage: BigInt
): StakeholderAdded {
  let stakeholderAddedEvent = changetype<StakeholderAdded>(newMockEvent())

  stakeholderAddedEvent.parameters = new Array()

  stakeholderAddedEvent.parameters.push(
    new ethereum.EventParam("wallet", ethereum.Value.fromAddress(wallet))
  )
  stakeholderAddedEvent.parameters.push(
    new ethereum.EventParam(
      "feePercentage",
      ethereum.Value.fromUnsignedBigInt(feePercentage)
    )
  )

  return stakeholderAddedEvent
}

export function createStakeholderRemovedEvent(
  wallet: Address
): StakeholderRemoved {
  let stakeholderRemovedEvent = changetype<StakeholderRemoved>(newMockEvent())

  stakeholderRemovedEvent.parameters = new Array()

  stakeholderRemovedEvent.parameters.push(
    new ethereum.EventParam("wallet", ethereum.Value.fromAddress(wallet))
  )

  return stakeholderRemovedEvent
}

export function createStakeholderUpdatedEvent(
  wallet: Address,
  feePercentage: BigInt
): StakeholderUpdated {
  let stakeholderUpdatedEvent = changetype<StakeholderUpdated>(newMockEvent())

  stakeholderUpdatedEvent.parameters = new Array()

  stakeholderUpdatedEvent.parameters.push(
    new ethereum.EventParam("wallet", ethereum.Value.fromAddress(wallet))
  )
  stakeholderUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "feePercentage",
      ethereum.Value.fromUnsignedBigInt(feePercentage)
    )
  )

  return stakeholderUpdatedEvent
}

export function createStakeholdersLockedEvent(): StakeholdersLocked {
  let stakeholdersLockedEvent = changetype<StakeholdersLocked>(newMockEvent())

  stakeholdersLockedEvent.parameters = new Array()

  return stakeholdersLockedEvent
}

export function createSupplyUpdatedEvent(newSupply: BigInt): SupplyUpdated {
  let supplyUpdatedEvent = changetype<SupplyUpdated>(newMockEvent())

  supplyUpdatedEvent.parameters = new Array()

  supplyUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newSupply",
      ethereum.Value.fromUnsignedBigInt(newSupply)
    )
  )

  return supplyUpdatedEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}
