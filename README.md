# TypeScript-Currency-Conversions

## Description
This program simulates wallets in different currencies, allowing spending, currency conversion, and purchases. It demonstrates type-safe handling of balances and price tags in TypeScript, supporting USD, EUR, and INR. Users can spend, convert wallets to another currency, and attempt purchases while tracking remaining balances.

## Coding Techniques
- TypeScript generics for currency-safe wallets (`Wallet<CurrencyCode>`)
- Type-safe price tags (`PriceTag<Currency>`) and spending operations
- Encapsulation: private balance tracking with getter
- Static methods for rounding numeric values
- Runtime checks to prevent conversion errors (e.g., zero conversion rate)
- Conditional logic for purchase success/failure
- Modular and reusable class design with currency conversion support

## Example Output
```
I purchased a hat! 🤠
I purchased falafel! 🥙
Remaining USD balance: 0
EUR wallet balance: 6.51
```
