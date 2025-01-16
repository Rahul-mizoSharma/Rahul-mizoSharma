#charges per distance


distance = float(input("Enter the distance traveled in kilometers: "))

fare = 0
if 1 <= distance <= 50:  
    fare = distance * 8
elif 51 <= distance <= 100:  
    fare = distance * 10
elif distance > 100:  
    fare = distance * 12
else:
    print("Distance must be at least 1 km.")
if fare > 0:
    print(f"The total fare for {distance} km is: Rs. {fare:.2f}")
