import string

def passCheck(pword):
    a = [ 1 for x in pword if x in string.uppercase ]
    b = [1 for x in pword if x in string.lowercase ]
    c = [ 1 for x in pword if x in string.digits ]
    return (1 in a) and (1 in b) and (1 in c)

def passStrength(pword):
    if len(pword) == 0:
        return 0
    strength = 3
    nonAlpha = ". ? ! & # , ; : - _ *"
    if passCheck(pword):
        strength = 5
    if 1 in [ 1 for x in pword if x in nonAlpha ]:
        strength += 2
    if len(pword) > 8:
        strength += 1
    if len(pword) > 12:
        strength += 2
    return strength
        
