import pandas as pd

def get_top_5_banks(file_path, amount, return_years):
    # Load the CSV file
    df_fd_rates = pd.read_csv(file_path)

    # Select the correct column based on return years
    rate_columns = {
        1: "1-year FD Rate (% p.a.)",
        3: "3-year FD Rate (% p.a.)",
        5: "5-year FD Rate (% p.a.)"
    }

    if return_years not in rate_columns:
        return {"error": "Invalid return period. Choose 1, 3, or 5 years."}

    rate_col = rate_columns[return_years]

    # Extract necessary columns
    df_selected = df_fd_rates[["Bank", rate_col]].copy()

    # Ensure numeric conversion
    df_selected[rate_col] = pd.to_numeric(df_selected[rate_col], errors='coerce')

    # Drop NaN values
    df_selected = df_selected.dropna()

    # Convert rate to decimal for calculation
    df_selected["Interest Rate (%)"] = df_selected[rate_col] / 100

    # Compute maturity amount using compound interest formula A = P(1 + r)^t
    df_selected["Maturity Amount"] = round(amount * (1 + df_selected["Interest Rate (%)"])**return_years, 2)

    # Sort by highest maturity amount and select top 5 banks
    top_5_banks = df_selected.nlargest(5, "Maturity Amount")[["Bank", rate_col, "Maturity Amount"]]

    # Rename columns for better readability
    top_5_banks = top_5_banks.rename(columns={rate_col: "Interest Rate (%)"})

    # Reset index to remove serial numbers
    top_5_banks = top_5_banks.reset_index(drop=True)

    # Convert DataFrame to JSON and return
    return top_5_banks.to_dict(orient="records")
