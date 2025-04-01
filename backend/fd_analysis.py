import sqlite3

def get_top_banks(db_path, amount, return_years):
    # Connect to SQLite database
    conn = sqlite3.connect(db_path)  # Path to the SQLite database (e.g., innovate.db)
    cursor = conn.cursor()  # Create a cursor to execute SQL commands

    # Define the column for the selected return years
    rate_columns = {
        1: "Year_1",
        3: "Year_3",
        5: "Year_5"
    }

    rate_col = rate_columns[return_years]

    # Query data from the SQLite database
    query = f"SELECT Bank, {rate_col} FROM fd"
    cursor.execute(query)

    # Fetch all rows from the result
    results = cursor.fetchall()

    # Process the rows to compute maturity amounts
    response_data = []
    for row in results:
        bank = row[0]
        interest_rate = row[1]

        # Convert interest rate from percentage to decimal
        interest_rate_decimal = interest_rate / 100

        # Calculate maturity amount using compound interest formula: A = P(1 + r)^t
        maturity_amount = round(amount * (1 + interest_rate_decimal)**return_years, 2)

        # Append the processed data
        response_data.append({
            "Bank": bank,
            "Interest Rate (%)": interest_rate,
            "Maturity Amount": maturity_amount
        })

    # Sort data by Maturity Amount in descending order
    response_data = sorted(response_data, key=lambda x: x["Maturity Amount"], reverse=True)

    # Close the database connection
    conn.close()

    # Return the data as JSON
    return response_data 
