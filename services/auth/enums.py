from enum import Enum

class RegisterUserInfo(Enum):
    SUCCESS = "Registration successful"
    USERNAME_UNAVAILABLE = "Username taken"
    INTERNAL_FAILIURE = "Internal failiure"