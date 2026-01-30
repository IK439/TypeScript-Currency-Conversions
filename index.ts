// Type based on conversionRates keys
type CurrencyCode = keyof typeof conversionRates;

// Conversion rates relative to USD
const conversionRates = {
  euro: 1.1,
  inr: 0.012,
  usd: 1,
};

// Generic Wallet class for a specific currency
class Wallet<Currency extends CurrencyCode> {
  readonly currency: Currency; // Currency type of this wallet
  private stored: number; // Current balance in this currency

  constructor(currency: Currency, remaining: number) {
    this.currency = currency;
    this.stored = Wallet.round(remaining);
  }

  // Spend an amount from the wallet
  // Returns true if successful, false if insufficient funds
  spend(amount: number) {
    amount = Wallet.round(amount);
    if (this.stored < amount) {
      return false;
    }
    this.stored = Wallet.round(this.stored - amount);
    return true;
  }

  // Convert this wallet to another currency
  transferTo<NewCurrency extends CurrencyCode>(newCurrency: NewCurrency) {
    const currentRate = conversionRates[this.currency] as number;
    const newRate = conversionRates[newCurrency] as number;

    // Runtime guard against zero-division
    if (currentRate === 0) {
      throw new Error(`Cannot convert from ${this.currency} with rate 0`);
    }

    // Convert stored balance to new currency
    const newStored = (this.stored / currentRate) * newRate;

    // Empty the current wallet
    this.stored = 0;

    // Return a new wallet in the new currency, rounded
    return new Wallet(newCurrency, Wallet.round(newStored));
  }

  // Getter to check the current balance
  get balance() {
    return this.stored;
  }

  // Round a number to 2 decimal places
  private static round(amount: number) {
    return Math.round(amount * 100) / 100;
  }
}

// Price tag for an item in a specific currency
interface PriceTag<Currency extends CurrencyCode> {
  currency: Currency;
  item: string;
  price: number;
}

// Attempt to purchase an item using wallet
// Returns the item name if successful, null if not enough funds
function purchaseInCurrency<Currency extends CurrencyCode>(
  wallet: Wallet<Currency>,
  tag: PriceTag<Currency>
): string | null {
  return wallet.spend(tag.price) ? tag.item : null;
}

// Create a USD wallet with $50
const americanWallet = new Wallet("usd", 50);

// Attempt to buy a cowboy hat
const hat = purchaseInCurrency(americanWallet, {
  currency: "usd",
  item: "cowboy hat",
  price: 34.99,
});

if (hat) {
  console.log("I purchased a hat! 🤠");
} else {
  console.log("I couldn't afford the hat...");
}

// Transfer remaining USD to EUR wallet
const euroWallet = americanWallet.transferTo("euro");

// Attempt to buy falafel with the new EUR wallet
const falafel = purchaseInCurrency(euroWallet, {
  currency: "euro",
  item: "falafel",
  price: 10,
});

if (falafel) {
  console.log("I purchased falafel! 🥙");
} else {
  console.log("I couldn't afford the falafel...");
}

// Check balances
console.log(`Remaining USD balance: ${americanWallet.balance}`);
console.log(`EUR wallet balance: ${euroWallet.balance}`);