import sqlite3
import csv

# Step 1: Connect to SQLite Database (or create one)
conn = sqlite3.connect("innovate.db")  # Replace with your database name
cursor = conn.cursor()

# Step 2: Create a Table in SQLite
table_name = "rd"  # Replace with your table name
# create_table_query = f"""
# CREATE TABLE IF NOT EXISTS {table_name} (
#     Bank VARCHAR(200),
#     Year_1 NUMERIC,
#     Year_3 NUMERIC,
#     Year_5 NUMERIC
# );
# """  # Replace column definitions with your actual table structure
# cursor.execute(create_table_query)

# Step 3: Open the CSV File
# csv_file_path = "rd_interest_rates.csv"  # Replace with the path to your CSV file
# with open(csv_file_path, "r") as csvfile:
#     csv_reader = csv.reader(csvfile)
#     headers = next(csv_reader)  # Assuming the first row is headers
    
#     # Step 4: Insert Data into the Table
#     for row in csv_reader:
#         insert_query = f"INSERT INTO {table_name}(Bank, Year_1, Year_3, Year_5) VALUES (?, ?, ?, ?);"  # Adjust placeholders based on your columns
#         cursor.execute(insert_query, row)

# Step 5: Commit and Close
conn.commit()
conn.close()

print("CSV data imported successfully!")