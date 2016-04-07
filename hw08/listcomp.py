def union(a,b):
    return a + [x for x in b if x not in a]

print union([1,2,3],[2,4,5])

def intersection(a,b):
    return [x for x in a if x in b]

print intersection([1,2,3],[2,3,4])

def setDiff(u,a):
    return [x for x in u if x not in a]

print setDiff([2,3,4],[1,2,3])

def symDiff(a,b):
    return setDiff(a,b) + setDiff(b,a)

print symDiff([1,2,3],[2,3,4])

def cartesianProduct(a,b):
    return [(x,y) for y in b for x in a]


print cartesianProduct([1,2,3],["yes","no","green"])
