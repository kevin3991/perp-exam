# Exchange Module

This project implements an exchange module where users can exchange TWD (Taiwan Dollar) and USD (United States Dollar) using a simple trading interface. The module maintains reserves for both currencies and updates them after each trade.

## Features

- **Reserves Display**: Shows the current reserves of TWD and USD in the exchange module.
- **Trade Interface**: Allows users to select the currency pair (TWD to USD or USD to TWD) and enter the amount they wish to exchange.
- **Transaction History**: Displays a history of exchanges made, including timestamps and amounts.

## Usage

### Environment Setup

1. Clone the repository:

   ```sh
   git clone git@github.com:sather33/perp-exam-roy.git
   ```

2. Navigate to the project directory:

   ```sh
   cd perp-exam-roy
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

### Trade Functionality

1. **Reserves**: The current reserves of TWD and USD are displayed at the top of the module.
2. **Trade**:
   - Select the currency pair for exchange (e.g., TWD to USD).
   - Enter the amount you wish to exchange.
   - Click `Submit` to execute the trade.
3. **History**: The exchange history section displays the details of each transaction, including the date, time, and amounts exchanged.

### Example Calculation

When a user wants to use x TWD to exchange for USD, the module uses the following formula to calculate the USD amount y:

```
(Rt + x) * (Ru + y) = Rt * Ru
```

For instance, with an initial reserve of 10,000 TWD and 1,000 USD, if a user uses 6,000 TWD to exchange for USD, they will receive 375 USD:

```
(10,000 + 6,000) * (1,000 + y) = 10,000 * 1,000
y = -375
```

After the trade, the new reserves will be:

```
Rt = 10,000 + 6,000 = 16,000
Ru = 1,000 - 375 = 625
```

The next trade will use these updated reserves.

## Unit Tests

Unit tests are included to ensure the correctness of the exchange calculations and functionality. To run the tests, use the following command:

```sh
npm run test
```

## Contact

If you have any questions or need further assistance, please contact [court.dream3@gmail.com](mailto:court.dream3@gmail.com).

I'm Roy. Nice to meet you. 🐝
