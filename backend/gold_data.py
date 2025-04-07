import sqlite3
from datetime import datetime, timedelta

def get_gold_data(range_option, db_path):
    # Step 1: Connect to SQLite Database
    conn = sqlite3.connect(db_path)  # Your database
    cursor = conn.cursor()

    # Map range_option to number of days
    ranges = {
        '1M': 30,
        '3M': 90,
        '6M': 180,
        '1Y': 365,
        '3Y': 365 * 3,
        '5Y': 365 * 5,
    }
    days = ranges.get(range_option)

    # Calculate start and end dates
    today = datetime.today()
    start_date = (today - timedelta(days=days)).strftime('%Y-%m-%d')
    end_date = (today + timedelta(days=days)).strftime('%Y-%m-%d')

    # print(start_date)
    # print(end_date)

    # Step 2: Query Historical Data
    historical_query = """
        SELECT date, price FROM future_gold
        WHERE date BETWEEN ? AND ?
        ORDER BY date
    """
    cursor.execute(historical_query, (start_date, today.strftime('%Y-%m-%d')))
    historical_data = cursor.fetchall()

    # Step 3: Query Predicted Data
    predicted_query = """
        SELECT date, price FROM future_gold
        WHERE date BETWEEN ? AND ?
        ORDER BY date
    """
    cursor.execute(predicted_query, (today.strftime('%Y-%m-%d'), end_date))
    predicted_data = cursor.fetchall()

    # Step 4: Close Database Connection
    conn.close()

    # Step 5: Format and Return JSON Data
    return {
        'historical': [{'date': d, 'price': p} for d, p in historical_data],
        'predicted': [{'date': d, 'price': p} for d, p in predicted_data],
    }

# if __name__ == "__main__":
#     db_path = "innovate.db"
#     # range_option = request.args.get('range').upper()
#     range_option = "1M"
#     result = get_gold_data(range_option, db_path)
#     print(result)
