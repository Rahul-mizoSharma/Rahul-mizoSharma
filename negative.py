# to check positive,negative and 0

x = int(input("enter the number to check:"))
if x > 0:
    print(f"{x} is a positive number")
elif x == 0:
    print(f"{x} is a zero number")
else:
    print(f"{x} is a negative number")