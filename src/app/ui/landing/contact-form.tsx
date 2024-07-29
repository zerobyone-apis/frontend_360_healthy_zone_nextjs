import React from 'react'
import { Button } from "../button";
export  function ContactForm() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
    <p className="text-2xl font-bold mb-6 text-center text-jungle-green-700">Contact Us</p>
    <form>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          required
        ></textarea>
      </div>
      <div className="text-center">
      <Button className="inline-flex items-center text-sm font-medium text-center text-white  rounded-lg bg-jungle-green-500 hover:bg-jungle-green-300">
                        Send
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Button>
      </div>
    </form>
  </div>
  )
}
