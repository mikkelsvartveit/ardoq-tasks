import math


def topThreeProduct(numbers):
    highestNumbers = []

    for _ in range(3):
        highestNumbers.append(max(numbers))
        numbers.remove(max(numbers))

    # Note: math.prod() requires Python 3.8 or newer
    return math.prod(highestNumbers)


print(topThreeProduct([1, 10, 2, 6, 5, 3]))  # Returns 300
