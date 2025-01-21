def find_largest_of_three(a, b, c):
    largest = max(a, b, c)
    print(f"The largest number is: {largest}")
find_largest_of_three(10, 20, 15)



def find_largest_with_return(a, b, c) -> int:
    return max(a, b, c)

largest = find_largest_with_return(10, 20, 15)
print(f"The largest number is: {largest}")





def find_largest_no_args_no_return():
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))
    c = int(input("Enter third number: "))
    largest = max(a, b, c)
    print(f"The largest number is: {largest}")

find_largest_no_args_no_return()



def find_largest_no_args_with_return() -> int:
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))
    c = int(input("Enter third number: "))
    return max(a, b, c)

largest = find_largest_no_args_with_return()
print(f"The largest number is: {largest}")

