# investment_recommendation.py
import pulp

def investment_allocation(user_income, risk_capacity, investment_duration):
    """
    Generate an investment allocation recommendation using linear programming.
    """
    # Define expected annual returns for each asset class based on risk capacity.
    risk_config = {
        'low':    (0.06, 0.04, 0.05, 0.055),
        'medium': (0.08, 0.05, 0.04, 0.06),
        'high':   (0.10, 0.06, 0.03, 0.065)
    }
    
    if risk_capacity.lower() not in risk_config:
        return {"error": "Invalid risk capacity. Choose from 'low', 'medium', or 'high'."}

    r_mutual, r_gold, r_fd, r_rd = risk_config[risk_capacity.lower()]

    # Create the linear programming problem
    prob = pulp.LpProblem("Investment_Allocation", pulp.LpMaximize)

    # Define decision variables for allocation percentages
    x_mutual = pulp.LpVariable('MutualFunds', lowBound=0, upBound=1)
    x_gold   = pulp.LpVariable('Gold', lowBound=0, upBound=1)
    x_fd     = pulp.LpVariable('FixedDeposits', lowBound=0, upBound=1)
    x_rd     = pulp.LpVariable('RecurringDeposits', lowBound=0, upBound=1)

    # Objective Function: maximize expected return
    prob += r_mutual * x_mutual + r_gold * x_gold + r_fd * x_fd + r_rd * x_rd, "TotalExpectedReturn"

    # Constraint: Total allocation must sum to 100%
    prob += x_mutual + x_gold + x_fd + x_rd == 1, "TotalAllocation"

    # Risk constraints
    risk_constraints = {
        'low':    [(x_mutual <= 0.2), (x_rd >= 0.3), (x_gold >= 0.3), (x_fd >= 0.2)],
        'medium': [(x_mutual <= 0.5), (x_rd >= 0.2), (x_gold >= 0.2), (x_fd >= 0.1)],
        'high':   [(x_mutual <= 0.7), (x_rd >= 0.1), (x_gold >= 0.1), (x_fd >= 0.1)]
    }

    for constraint in risk_constraints[risk_capacity.lower()]:
        prob += constraint

    # Duration constraints
    if investment_duration >= 7:
        prob += x_gold >= 0.2
        prob += x_fd >= 0.15

    # Solve the LP problem
    prob.solve()

    # Return allocation results as JSON
    return {
        "Mutual Funds": round(pulp.value(x_mutual), 2),
        "Gold": round(pulp.value(x_gold), 2),
        "Fixed Deposits": round(pulp.value(x_fd), 2),
        "Recurring Deposits": round(pulp.value(x_rd), 2)
    }
