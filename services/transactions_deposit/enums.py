from enum import Enum

class DepositTransactionStatus(Enum):
    SUCCESS = "Deposit successful"
    INSUFFICIENT_FUNDS = "Insufficient funds"
    INTERNAL_FAILIURE = "Internal failiure"
    INVALID_ACCOUNT = "Invalid account"
    INVALID_AMOUNT = "Invalid amount"
    INVALID_CURRENCY = "Invalid currency"
    INVALID_TRANSACTION = "Invalid transaction"
    INVALID_USER = "Invalid user"
