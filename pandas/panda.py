
import pandas as pd
import numpy as np

def create_sample_dataframe():
    data = {
        'Name': ['John', 'Emma', 'Alex', 'Sarah', 'Mike'],
        'Age': [25, 28, 22, 32, 45],
        'City': ['New York', 'London', 'Paris', 'Tokyo', 'Berlin'],
        'Salary': [50000, 60000, 45000, 70000, 80000]
    }
    
 
    df = pd.DataFrame(data)
    return df


def demonstrate_pandas_operations():
    df = create_sample_dataframe()
    
    # Display basic information
    print("1. Basic DataFrame:")
    print(df)
    print("\n2. DataFrame Info:")
    print(df.info())
    
    # Basic statistics
    print("\n3. Basic Statistics:")
    print(df.describe())
    
    # Filtering
    print("\n4. Filtering (Age > 25):")
    print(df[df['Age'] > 25])
    
    # Sorting
    print("\n5. Sorting by Age:")
    print(df.sort_values('Age'))
    
    # Adding new column
    df['Bonus'] = df['Salary'] * 0.1
    print("\n6. Added Bonus column:")
    print(df)
    
    # Grouping
    print("\n7. Average Salary by City:")
    print(df.groupby('City')['Salary'].mean())
    
    # Basic data manipulation
    print("\n8. Select specific columns:")
    print(df[['Name', 'Salary', 'Bonus']])

if __name__ == "__main__":
    demonstrate_pandas_operations()