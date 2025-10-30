import { Mail, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-green-900 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Contact Information</h3>
            <div className="space-y-2 text-green-100">
              <p>Ministry of Agriculture</p>
              <p>New Delhi, India - 110001</p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@agrofund.gov.in
              </p>
              <p>Phone: +91-11-2378-XXXX</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Newsletter</h3>
            <p className="text-green-100 mb-4">Subscribe to get updates on funding opportunities</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-500 text-green-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-100">
          <p>&copy; 2025 AgroFund Portal. All rights reserved. Government of India Initiative.</p>
        </div>
      </div>
    </footer>
  );
}
