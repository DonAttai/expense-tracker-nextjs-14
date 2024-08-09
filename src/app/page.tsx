import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto min-h-[calc(100vh-7rem)]">
      {/* Hero section */}
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Take Control of Your Finances</h1>
        <p className="mt-2">Easily track your expenses and save money.</p>
      </header>

      {/* Value proposition */}
      <section className="bg-gray-100 p-4">
        <h2>Why Choose Our Expense Tracker?</h2>
        <p>Our app helps you:</p>
        <ul>
          <li>Track your spending habits</li>
          <li>Set budgets and goals</li>
          <li>Save money</li>
        </ul>
      </section>

      {/* Features */}
      <section className="p-4">
        <h2>Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Feature card 1 */}
          <div className="bg-white p-4 rounded-lg border shadow-md">
            <h3>Easy to Use</h3>
            <p>Our app is designed with simplicity in mind.</p>
          </div>
          {/* Feature card 2 */}
          <div className="bg-white p-4 rounded-lg border shadow-md">
            <h3>Secure</h3>
            <p>Your financial data is safe with us.</p>
          </div>
          {/* Feature card 3 */}
          <div className="bg-white p-4 rounded-lg border shadow-md">
            <h3>Customizable</h3>
            <p>Track expenses your way.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
