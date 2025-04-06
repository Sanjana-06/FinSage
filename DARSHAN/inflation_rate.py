import pandas as pd
from prophet import Prophet
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

# Load data
df = pd.read_csv("CPI.csv")
df['Date'] = pd.to_datetime(df['Year'].astype(str) + '-' + df['Month'], format='%Y-%B')
df = df[['Date', 'Combined']].rename(columns={'Date': 'ds', 'Combined': 'y'})

# Fit the Prophet model
model = Prophet()
model.fit(df)

# Forecasting future CPI for 5 years (monthly)
future = model.make_future_dataframe(periods=60, freq='MS')
forecast = model.predict(future)

# Evaluation on available known data
actual = df['y']
predicted = model.predict(df[['ds']])['yhat']

mae = mean_absolute_error(actual, predicted)
mse = mean_squared_error(actual, predicted)
rmse = np.sqrt(mse)

print("Prophet Forecasting:")
print(f"MAE: {mae:.2f}")
print(f"MSE: {mse:.2f}")
print(f"RMSE: {rmse:.2f}")

# -----------------------------
# Save Plot as PNG
# -----------------------------
fig = model.plot(forecast)
plt.title("CPI Forecast using Prophet")
plt.xlabel("Date")
plt.ylabel("CPI")
plt.axvline(x=df['ds'].iloc[-1], color='r', linestyle='--', label="Forecast Start")
plt.legend()
plt.grid(True)

# Save the plot to a PNG file
plt.savefig('cpi_forecast.png')
plt.close()  # Close the plot after saving

# -----------------------------
# Calculate Annual Inflation Rate
# -----------------------------
# Get CPI at current date and CPI after N years
current_cpi = forecast[forecast['ds'] == df['ds'].iloc[-1]]['yhat'].values[0]

# -----------------------------
# Investment Return Calculator
# -----------------------------
# Get user inputs for investment details
investment_amount = float(input("Enter the investment amount (₹): "))
rd_return = float(input("Enter the RD interest rate (%): "))
fd_return = float(input("Enter the FD interest rate (%): "))

years_options = [1, 3, 5]
for years in years_options:
    # Calculate future CPI after N years
    future_cpi = forecast[forecast['ds'] == df['ds'].iloc[-1] + pd.DateOffset(years=years)]['yhat'].values[0]
    
    # Compound Annual Growth Rate (Inflation Rate)
    inflation_rate = ((future_cpi / current_cpi) ** (1 / years) - 1) * 100
    print(f"\n--- Investment Returns for {years} Years ---")
    print(f"Estimated Annual Inflation Rate (CAGR over {years} years): {inflation_rate:.2f}%")

    # Nominal returns
    rd_nominal = investment_amount * ((1 + rd_return / 100) ** years)
    fd_nominal = investment_amount * ((1 + fd_return / 100) ** years)

    # Real return = (1 + nominal) / (1 + inflation) - 1
    rd_real = ((1 + rd_return / 100) / (1 + inflation_rate / 100)) ** years - 1
    fd_real = ((1 + fd_return / 100) / (1 + inflation_rate / 100)) ** years - 1

    rd_real_amt = investment_amount * (1 + rd_real)
    fd_real_amt = investment_amount * (1 + fd_real)

    # Final Output for each year group
    print(f"RD Nominal Return after {years} years: ₹{rd_nominal:,.2f}")
    print(f"FD Nominal Return after {years} years: ₹{fd_nominal:,.2f}")
    print(f"Assumed Inflation Rate: {inflation_rate:.2f}%")
    print(f"RD Real Return (adjusted for inflation): ₹{rd_real_amt:,.2f}")
    print(f"FD Real Return (adjusted for inflation): ₹{fd_real_amt:,.2f}")
