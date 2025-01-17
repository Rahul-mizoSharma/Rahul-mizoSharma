#charge for various items

code = int(input("Enter the product code (1 for Battery Based, 2 for Key-based, 3 for Electrical Charging): "))

amount = float(input("Enter the order amount: "))

discount = 0
if code == 1 and amount > 1000:
    discount = 0.10  # 10% discount
elif code == 2 and amount > 100:  
    discount = 0.05  # 5% discount
elif code == 3 and amount > 500:  
    discount = 0.10  # 10% discount

net_amount = amount * (1 - discount)
print(f"The net amount to be paid is: Rs. {net_amount:.2f}")
