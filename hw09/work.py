import time


def log_name(f):
    def inner(*arg):
        print f.func_name + ": " + str(arg)
        return f(*arg)
    return inner

def log_time(f):
    def inner(*arg):
        t1 = time.time()
        out = f(*arg)
        print "execution time: " + str(time.time() - t1)
        return out
    return inner

@log_name
def fib(n):
    if(n <= 1):
        return 1
    else:
        return fib(n-1) + fib(n-2)


decorator = log_time(fib)
print decorator(5)

