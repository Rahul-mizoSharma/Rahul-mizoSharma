# if the year is leap year year or not

year = int(input("enter the year to check:"))

if year % 4 == 0:
    if year % 100 == 0:
        if year % 400 == 0:
            print(f"{year} is a leap year:")
        else:
            print(f"{year} is not a leap year:")
    else:
        print(f"{year} is a leap year:")
else:
    print(f"{year} is not a leap year:")