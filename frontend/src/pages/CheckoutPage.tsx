import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import type { CartItem, User } from "../types";
import { checkout } from "../services/orderService";

export default function CheckoutPage({
  items,
  user,
  onComplete,
}: {
  items: CartItem[];
  user: User | null;
  onComplete: () => void;
}) {
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // This total is displayed to the user; the backend calculates the trusted final total from database prices.
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    // Checkout is protected, so the user MUST!! be signed in before a request is sent.
    if (!user) {
      setError("Please sign in before placing an order.");
      return;
    }

    setLoading(true);
    try {
      await checkout(items);
      setComplete(true);
      onComplete();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to place your order.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!items.length && !complete)
    return (
      <main className="section container empty-page">
        <h1>Your bag is empty.</h1>
        <Link className="button" to="/products">
          Back to shop
        </Link>
      </main>
    );
  if (complete)
    return (
      <main className="section container empty-page">
        <p className="eyebrow">Order received</p>
        <h1>Thank you.</h1>
        <p>
          Your order has been saved successfully. Payment is not processed in
          this student project.
        </p>
        <Link className="button" to="/">
          Return home
        </Link>
      </main>
    );

  return (
    <main className="section container">
      <p className="eyebrow">Checkout</p>
      <h1 className="page-title">A few final details.</h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit}>
          <fieldset>
            <legend>Contact information</legend>
            <label>
              Email address
              <input
                type="email"
                required
                defaultValue={user?.email || ""}
                placeholder="you@example.com"
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Delivery address</legend>
            <label>
              Full name
              <input
                required
                defaultValue={user?.name || ""}
                autoComplete="name"
              />
            </label>
            <label>
              Address
              <input required autoComplete="street-address" />
            </label>
            <div className="form-row">
              <label>
                City
                <input required autoComplete="address-level2" />
              </label>
              <label>
                Postal code
                <input required autoComplete="postal-code" />
              </label>
            </div>
          </fieldset>
          {error && (
            <p className="form-message" role="alert">
              {error}
            </p>
          )}
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Placing order…" : `Place order · $${total.toFixed(2)}`}
          </button>
        </form>
        <aside className="order-summary">
          <h2>Order summary</h2>
          {items.map((item) => (
            <div key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
