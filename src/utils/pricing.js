export function getDiscountedPrice(price, discountPercentage = 0) {
  return price * (1 - discountPercentage / 100);
}

export function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}
