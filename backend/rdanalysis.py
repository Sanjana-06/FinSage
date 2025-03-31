import pandas as pd

def calculate_rd_maturity(monthly_deposit, rate, years):
    """
    Calculate the maturity amount for an RD using the formula:
    A = P * [(1 + r/n)^(nt) - 1] / r * (1 + r)
    Where:
        A = Maturity Amount
        P = Monthly Deposit
        r = Annual Interest Rate (in decimal)
        n = Compounded monthly (n=12)
        t = Time in years
    """
    n = 12  # Monthly compounding
    r = rate / 100 / n  # Monthly interest rate in decimal
    t = years * n  # Total number of months

    if r == 0:
        maturity_amount = monthly_deposit * t  # No interest case
    else:
        maturity_amount = monthly_deposit * ((1 + r) ** t - 1) / r * (1 + r)

    return round(maturity_amount, 2)

def get_top_banks(amount, term, rd_data_file):
    df = pd.read_csv(rd_data_file)

    term_map = {
        1: "1-Year RD Rate (General)",
        3: "3-Year RD Rate (General)",
        5: "5-Year RD Rate (General)"
    }

    if term not in term_map:
        return {"error": "Invalid term. Choose from 1, 3, or 5 years."}

    rate_column = term_map[term]

    df[rate_column] = pd.to_numeric(df[rate_column], errors='coerce')
    df = df.dropna(subset=[rate_column])

    df["Maturity Amount"] = df.apply(lambda row: calculate_rd_maturity(amount, row[rate_column], term), axis=1)

    top_banks = df.sort_values(by="Maturity Amount", ascending=False)[["Bank Name", rate_column, "Maturity Amount"]]

    top_banks = top_banks.rename(columns={rate_column: "Interest Rate (%)"})

    return top_banks.to_dict(orient="records")