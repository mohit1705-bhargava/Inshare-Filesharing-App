import React from "react";

function page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Upgrade Your Plan
        </h1>
        <p className="text-gray-600 mt-2">
          Choose the plan that fits your needs.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        {/* Pro Plan */}
        <div className="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12 transition-all duration-300 hover:shadow-md">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">Pro</h2>
            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                $30
              </strong>
              <span className="text-sm font-medium text-gray-700"> /month</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            {[
              "20 users included",
              "5GB of storage",
              "Email support",
              "Help center access",
              "Phone support",
              "Community access",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700"
          >
            Get Started
          </a>
        </div>

        {/* Starter Plan */}
        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12 transition-all duration-300 hover:shadow-md">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">Starter</h2>
            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                $20
              </strong>
              <span className="text-sm font-medium text-gray-700"> /month</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            {[
              "10 users included",
              "2GB of storage",
              "Email support",
              "Help center access",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default page;
