import pulp

def investment_allocation(user_income, risk_capacity, investment_duration):
    """
    Generate an investment allocation recommendation using linear programming with Recurring Deposits.
    
    Parameters:
    - user_income: Annual income of the user (not directly used in LP, but can help tailor future recommendations)
    - risk_capacity: A string value ("low", "medium", or "high") representing the user's risk tolerance.
    - investment_duration: Investment horizon in years.
    
    Returns:
    - A dictionary with recommended allocation percentages for Mutual Funds, Gold, Fixed Deposits, and Recurring Deposits.
    """
    
    # Define expected annual returns for each asset class based on risk capacity.
    if risk_capacity.lower() == 'low':
        r_mutual = 0.06
        r_gold   = 0.04
        r_fd     = 0.05
        r_rd     = 0.055
    elif risk_capacity.lower() == 'medium':
        r_mutual = 0.08
        r_gold   = 0.05
        r_fd     = 0.04
        r_rd     = 0.06
    else:  # high risk
        r_mutual = 0.10
        r_gold   = 0.06
        r_fd     = 0.03
        r_rd     = 0.065

    # Create the linear programming problem (maximize expected return)
    prob = pulp.LpProblem("Investment_Allocation", pulp.LpMaximize)

    # Define decision variables for the allocation percentages (each between 0 and 1)
    x_mutual = pulp.LpVariable('MutualFunds', lowBound=0, upBound=1)
    x_gold   = pulp.LpVariable('Gold', lowBound=0, upBound=1)
    x_fd     = pulp.LpVariable('FixedDeposits', lowBound=0, upBound=1)
    x_rd     = pulp.LpVariable('RecurringDeposits', lowBound=0, upBound=1)

    # Objective Function: maximize the portfolio's expected return
    prob += r_mutual * x_mutual + r_gold * x_gold + r_fd * x_fd + r_rd * x_rd, "TotalExpectedReturn"

    # Constraint: Total allocation must sum to 100%
    prob += x_mutual + x_gold + x_fd + x_rd == 1, "TotalAllocation"

    # Risk constraint and diversification limits based on risk capacity
    if risk_capacity.lower() == 'low':
        prob += x_mutual <= 0.2, "LowRisk_MutualLimit"
        prob += x_rd >= 0.3, "LowRisk_RecurringMin"
        prob += x_gold >= 0.3, "LowRisk_GoldMin"
        prob += x_fd >= 0.2, "LowRisk_FDMin"
    elif risk_capacity.lower() == 'medium':
        prob += x_mutual <= 0.5, "MediumRisk_MutualLimit"
        prob += x_rd >= 0.2, "MediumRisk_RecurringMin"
        prob += x_gold >= 0.2, "MediumRisk_GoldMin"
        prob += x_fd >= 0.1, "MediumRisk_FDMin"
    else:  # high risk
        prob += x_mutual <= 0.7, "HighRisk_MutualLimit"
        prob += x_rd >= 0.1, "HighRisk_RecurringMin"
        prob += x_gold >= 0.1, "HighRisk_GoldMin"
        prob += x_fd >= 0.1, "HighRisk_FDMin"

    # Duration considerations: Diversify more for longer durations
    if investment_duration >= 1 and investment_duration <5:
        prob += x_gold >= 0.15, "LongTerm_GoldMin"
        prob += x_fd >= 0.15, "LongTerm_FDMin"
    elif investment_duration >=5 and investment_duration <10:
        prob += x_gold >= 0.2, "LongTerm_GoldMin"
        prob += x_fd >= 0.2, "LongTerm_FDMin"
    elif investment_duration >=10 and risk_capacity.lower()=="low":
        prob += x_gold >= 0.30, "LongTerm_GoldMin"
        prob += x_fd >= 0.25, "LongTerm_FDMin"
        

    # Solve the LP problem
    prob.solve()

    # Extract the allocation results
    allocation = {
        "Mutual Funds": round(pulp.value(x_mutual), 2),
        "Gold": round(pulp.value(x_gold), 2),
        "Fixed Deposits": round(pulp.value(x_fd), 2),
        "Recurring Deposits": round(pulp.value(x_rd), 2)
    }
    
    return allocation