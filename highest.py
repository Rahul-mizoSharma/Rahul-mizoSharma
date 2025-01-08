
# highest of three numbers


a = int(input("enter the first number:"))
b = int(input("enter the second number:"))
c = int(input("enter the third number:"))

if a>b & a>c:
    print("a is the largest number")
elif b>a & b>c:
    print("b is the largest number")
else:
    print("c is the largest number")