import { ArrowRight, Sprout, Target, TrendingUp, Users, Shield, Award } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <div className="mb-6 inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 text-green-900 rounded-full font-semibold shadow-lg">
            <Sprout className="w-6 h-6" />
            <span>Government of India Initiative</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Agriculture<br />
            <span className="text-yellow-400">Secure Your Future</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
            Submit your innovative agriculture and sustainability projects for government funding and support.
            Building a prosperous rural economy together.
          </p>

          <button
            onClick={() => onNavigate('submit')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-green-900 font-bold text-lg rounded-full hover:from-yellow-400 hover:to-yellow-300 transition-all shadow-2xl hover:shadow-yellow-500/50 hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">1000+</div>
              <div className="text-green-200 mt-1">Projects Funded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">₹500Cr+</div>
              <div className="text-green-200 mt-1">Investment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">50K+</div>
              <div className="text-green-200 mt-1">Jobs Created</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AgroFund Portal?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering farmers and entrepreneurs with resources to build sustainable agricultural ventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Application</h3>
              <p className="text-gray-700 leading-relaxed">
                Simple and streamlined process to submit your project proposal with comprehensive guidance at every step
              </p>
            </div>

            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-green-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Processing</h3>
              <p className="text-gray-700 leading-relaxed">
                Quick evaluation and approval process with transparent tracking and regular status updates
              </p>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-700 leading-relaxed">
                Government-backed funding with complete security and compliance with national standards
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Eligible Sectors</h2>
            <p className="text-xl text-gray-600">We support diverse agricultural and sustainability initiatives</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'Agro Processing',
              'Food Tech',
              'Organic Farming',
              'Dairy & Animal Husbandry',
              'Horticulture',
              'Agricultural Equipment',
              'Crop Production',
              'Sustainable Agriculture',
              'Aquaculture',
              'Forestry',
            ].map((sector) => (
              <div
                key={sector}
                className="bg-white rounded-lg p-4 text-center font-semibold text-gray-800 hover:bg-green-600 hover:text-white transition-colors shadow-md hover:shadow-xl cursor-pointer"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get funded in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Submit Project', desc: 'Fill out the comprehensive project form with all details' },
              { step: '02', title: 'Review Process', desc: 'Our expert team evaluates your proposal thoroughly' },
              { step: '03', title: 'Approval', desc: 'Get approval notification and funding terms' },
              { step: '04', title: 'Launch', desc: 'Receive funds and start building your venture' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 text-white text-2xl font-bold rounded-full mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-green-600 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Vision into Reality?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of successful agricultural entrepreneurs who have received funding through our portal
          </p>
          <button
            onClick={() => onNavigate('submit')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 text-green-900 font-bold text-lg rounded-full hover:bg-yellow-400 transition-all shadow-2xl hover:scale-105"
          >
            Submit Your Project Now
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}
