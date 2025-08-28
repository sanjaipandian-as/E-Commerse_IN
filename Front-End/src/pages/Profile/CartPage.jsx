export default function CartPage() {
  const items = []; // replace later

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Cart</h1>
        <p className="text-gray-500">Review items before checkout</p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="text-gray-600 mb-3">Your cart is empty.</p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium"
          >
            Continue shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">Items will go here...</div>
      )}
    </section>
  );
}
