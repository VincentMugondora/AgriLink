import React from 'react'
import { Mail, PhoneCall, MapPin, ArrowRight } from 'lucide-react'
import heroImg from '../assets/home/inputs.jpg'
import leftImg from '../assets/home/advisory.jpg'

const InfoCard = ({ icon: Icon, title, subtitle, children }) => (
  <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
        <Icon size={22} />
      </div>
      <div>
        <div className="text-sm text-gray-500">{subtitle}</div>
        <div className="text-lg font-semibold text-gray-900">{title}</div>
      </div>
    </div>
    <div className="mt-4 text-gray-700">
      {children}
    </div>
    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:gap-3 transition-all cursor-pointer">
      <span>More info</span>
      <ArrowRight size={16} />
    </div>
  </div>
)

const Contact = () => {
  return (
    <div>
      {/* Hero */}
      <section className="pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <img src={heroImg} alt="Contact hero" className="w-full h-[260px] md:h-[360px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className="text-white/90 text-sm uppercase tracking-wide">Farm Connect • Contact Us</div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Contact Us</h1>
              <div className="mt-2 text-white/90 text-sm">Home / Pages / <span className="text-white font-semibold">Contact Us</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-10 md:py-14 bg-[#fbfbf6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InfoCard icon={Mail} title="Mail us 24/7" subtitle="Email">
              <div className="space-y-1">
                <div>support@farmconnect.com</div>
                <div>press@farmconnect.com</div>
              </div>
            </InfoCard>
            <InfoCard icon={PhoneCall} title="Call us 24/7" subtitle="Phone">
              <div className="space-y-1">
                <div>Office: +1 (345) 543 - 5678</div>
                <div>Mobile: +1 (345) 543 - 1235</div>
              </div>
            </InfoCard>
            <InfoCard icon={MapPin} title="Our Locations" subtitle="Address">
              <div className="space-y-1">
                <div>4812 Block Fya, St. Almoha</div>
                <div>991156, USA (main city)</div>
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Split: image + form */}
      <section className="py-6 md:py-10 bg-[#fbfbf6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-3xl overflow-hidden shadow-sm">
              <img src={leftImg} alt="Greenhouse" className="w-full h-[360px] md:h-full object-cover" />
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">Get In Contact</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">Have any Questions? Get in Touch!</h2>

              <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Your Name</label>
                  <input className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                  <input className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Enter phone" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Enter email" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Subject</label>
                  <input className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Subject" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Message</label>
                  <textarea rows={5} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Write your message..." />
                </div>
                <div className="md:col-span-2">
                  <button type="button" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Logos bar */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center opacity-80">
            {['Rice', 'Farm', 'Fresh', 'Food', 'Eco', 'Tractor'].map((brand) => (
              <div key={brand} className="h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 font-semibold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-[#fbfbf6] pb-14">
        <div className="w-full h-[420px]">
          <iframe
            title="Farm Connect Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12293.155078369419!2d31.0487164!3d-17.8216283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a56b57e0cf6f%3A0x4f783a61b7f9ff1!2sHarare!5e0!3m2!1sen!2sZW!4v1699999999999!5m2!1sen!2sZW"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  )
}

export default Contact
