"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculatePayment = () => {
    const loanAmount = price - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const payment =
      loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Mortgage Calculator</h2>
      <div className="space-y-6">
        {/* Home Price Input */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Home Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Enter home price"
          />
        </div>

        {/* Down Payment Input */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Down Payment ($)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Enter down payment"
          />
        </div>

        {/* Interest Rate Input */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Enter annual interest rate"
          />
        </div>

        {/* Loan Term Input */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Loan Term (Years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Enter loan term in years"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={calculatePayment}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            Calculate
          </button>
          <button className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-200">
            <Link href={"/"}>Back</Link>
          </button>
        </div>

        {/* Monthly Payment Result */}
        {monthlyPayment && (
          <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Estimated Monthly Payment</h3>
            <p className="text-2xl font-bold text-green-600">${monthlyPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
