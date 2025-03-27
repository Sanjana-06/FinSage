import React from 'react';

const MutualFundPage = () => {
    
  return (
    <div style={{backgroundColor: 'white', padding: '20px', height: '100vh', paddingLeft: '45px', paddingRight: '45px' }}>
      <h1 style={{ textAlign: 'left', fontFamily: "Arial, sans-serif", fontSize: '62px', marginBottom: '0px', marginTop: '0px'}}>
        Mutual Fund
      </h1>
      
      <h3 style={{ color: 'red', fontSize: '16px', fontWeight: 'normal', marginTop: '0px', marginBottom: '20px' }}>
        Mutual fund investments are subject to market risks. Please read the scheme information and other related documents carefully before investing.
      </h3>
      
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <p style={{ paddingLeft:'10px',marginTop: '40px', marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '20px', textAlign: 'justify', lineHeight: '1.6',textIndent: '2em'  }}>
            Mutual funds pool money from multiple investors to buy a diversified portfolio of stocks, bonds, or other securities. Managed by professional fund managers, they aim for capital appreciation or income generation. They offer benefits like diversification, liquidity, and professional management, making them popular for both individual and institutional investors.</p> 
          <p style={{ paddingLeft:'10px',marginTop: '20px', marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '20px', textAlign: 'justify', lineHeight: '1.6',textIndent: '2em' }}>By spreading investments across various assets, mutual funds help mitigate risk and enhance potential returns. Investors can choose from equity, bond, or balanced funds based on their risk tolerance and goals. It's crucial to research and select funds that align with your financial strategy and objectives.</p>    
        </div>
        
        <div style={{ width: '350px', height: '350px', border: '1px solid #000', padding: '10px', position: 'relative',marginBottom:'15px' }}>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginLeft: '-50px' }}>
        <button style={{ backgroundColor: '#3AE059', color: 'black', border: 'none', padding: '12px 25px', margin: '10px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold', fontSize: '17px' }}>
          Recommendation
        </button>
        <button style={{ backgroundColor: '#3AE059', color: 'black', border: 'none', padding: '12px 25px', margin: '10px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold', fontSize: '17px' }}>
          About Fund
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ textAlign: 'center', fontSize: '32px' }}>How to Invest in Mutual Funds</h3>
        <ol style={{ textAlign: 'justify', fontSize: '20px', listStyleType: 'decimal', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><b>Define Your Investment Goals:</b> Determine what you want to achieve with your investments. Are you saving for retirement, a child's education, or a major purchase? Your goals will influence your investment strategy.</li>
          <li><b>Assess Your Risk Tolerance:</b> Understand how much risk you are willing to take. Mutual funds come in various types, from conservative bond funds to aggressive equity funds.</li>
          <li><b>Determine Your Budget:</b> Decide how much money you can invest and how often. You can start with a lump sum or make regular contributions.</li>
          <li><b>Research Mutual Funds:</b> Look for funds that align with your goals and risk tolerance. Consider factors like fund performance, fees, and the fund manager's track record.</li>
          <li><b>Open a Brokerage Account:</b> To invest in mutual funds, you'll need to open an account with a brokerage firm. Many firms offer online account opening.</li>
          <li><b>Choose Your Funds:</b> Select the mutual funds you want to invest in. You can choose from equity funds, bond funds, balanced funds, and more.</li>
          <li><b>Make Your Investment:</b> Purchase shares of the mutual funds through your brokerage account. You can invest a lump sum or set up automatic investments.</li>
          <li><b>Monitor Your Investments:</b> Regularly check the performance of your mutual funds. Make adjustments as needed to stay on track with your goals.</li>
          <li><b>Rebalance Your Portfolio:</b> Periodically review and rebalance your portfolio to ensure it remains aligned with your investment strategy.</li>
          <li><b>Stay Informed:</b> Keep up with market trends and news that may affect your investments. Staying informed will help you make better investment decisions.</li>
        </ol>
      </div>
    </div>
  );
};

export default MutualFundPage;