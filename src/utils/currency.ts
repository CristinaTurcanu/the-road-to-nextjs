import { MyBig } from "@/lib/big";

export const toCent = (amount: number) => {
    return MyBig(amount).mul(100).round(2).toNumber();
}

export const fromCent = (amount: number) => {
    return MyBig(amount).div(100).round(2).toNumber();
}

export const toCurrencyFromCents = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(fromCent(amount));
}