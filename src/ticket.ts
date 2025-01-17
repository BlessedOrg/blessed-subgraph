import {
  ApprovalForAll as ApprovalForAllEvent,
  MintedFromProof as MintedFromProofEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SmartWalletUpdated as SmartWalletUpdatedEvent,
  StakeholderAdded as StakeholderAddedEvent,
  StakeholderRemoved as StakeholderRemovedEvent,
  StakeholderUpdated as StakeholderUpdatedEvent,
  StakeholdersLocked as StakeholdersLockedEvent,
  SupplyUpdated as SupplyUpdatedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
} from "../generated/Ticket/Ticket"
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
  URI,
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintedFromProof(event: MintedFromProofEvent): void {
  let entity = new MintedFromProof(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.timestamp = event.params.timestamp
  entity.userSmartWalletAddress = event.params.userSmartWalletAddress
  entity.context = event.params.context
  entity.userSmartWalletAddressFromContext =
    event.params.userSmartWalletAddressFromContext

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSmartWalletUpdated(event: SmartWalletUpdatedEvent): void {
  let entity = new SmartWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousWallet = event.params.previousWallet
  entity.newWallet = event.params.newWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakeholderAdded(event: StakeholderAddedEvent): void {
  let entity = new StakeholderAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.wallet = event.params.wallet
  entity.feePercentage = event.params.feePercentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakeholderRemoved(event: StakeholderRemovedEvent): void {
  let entity = new StakeholderRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.wallet = event.params.wallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakeholderUpdated(event: StakeholderUpdatedEvent): void {
  let entity = new StakeholderUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.wallet = event.params.wallet
  entity.feePercentage = event.params.feePercentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakeholdersLocked(event: StakeholdersLockedEvent): void {
  let entity = new StakeholdersLocked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSupplyUpdated(event: SupplyUpdatedEvent): void {
  let entity = new SupplyUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.newSupply = event.params.newSupply

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.internal_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.internal_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
