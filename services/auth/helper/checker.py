import sys
import os

sys.path.append('../../')

def check_constants_file_made() -> bool:
    files = os.listdir('./')

    if 'constants.py' in files:
        return True
    else:
        return False