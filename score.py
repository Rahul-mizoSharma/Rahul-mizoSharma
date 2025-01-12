students = {"Alice": 85, "Bob": 60, "Cathy": 78, "David": 92}
filtered_students = {}

for name, values in students.items():
    if values > 80:
        filtered_students[name] = values

print(f"Students who scored more than 80:, {filtered_students}")