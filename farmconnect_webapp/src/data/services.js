import imgMarket from '../assets/home/market_place.jpg'
import imgDelivery from '../assets/home/delivery.jpg'
import imgInputs from '../assets/home/inputs.jpg'
import imgAdvisory from '../assets/home/advisory.jpg'
import imgDiagnostics from '../assets/home/diagnostics.jpg'
import imgHarvest from '../assets/home/harvesting.jpg'

const SERVICES = [
  {
    id: 1,
    slug: 'marketplace-trading',
    tag: 'Marketplace',
    title: 'Marketplace Trading',
    desc: 'Browse and buy farm produce with search and filters by crop, grade, location and price.',
    image: imgMarket,
  },
  {
    id: 2,
    slug: 'live-price-board',
    tag: 'Prices',
    title: 'Live Price Board',
    desc: 'Real-time prices from ZMX, Mbare and AMA with trends to guide buying and selling.',
    image: imgDiagnostics,
  },
  {
    id: 3,
    slug: 'logistics-delivery',
    tag: 'Logistics',
    title: 'Logistics & Delivery',
    desc: 'Arrange pickup and delivery, track orders and reduce post‑harvest losses.',
    image: imgDelivery,
  },
  {
    id: 4,
    slug: 'escrow-payments',
    tag: 'Payments',
    title: 'Escrow Payments',
    desc: 'Secure escrow payments with EcoCash, OneMoney, ZIPIT or bank transfer.',
    image: imgAdvisory,
  },
  {
    id: 5,
    slug: 'farmer-kyc-onboarding',
    tag: 'KYC',
    title: 'Farmer Onboarding & KYC',
    desc: 'Verify farmers and documents to build trust and reduce fraud.',
    image: imgAdvisory,
  },
  {
    id: 6,
    slug: 'rfqs-and-orders',
    tag: 'Orders',
    title: 'RFQs & Orders',
    desc: 'Request quotes, accept/reject orders and manage fulfilment in one place.',
    image: imgInputs,
  },
  {
    id: 7,
    slug: 'analytics-dashboards',
    tag: 'Analytics',
    title: 'Analytics Dashboards',
    desc: 'Track volumes, price trends and user activity for admins and partners.',
    image: imgDiagnostics,
  },
  {
    id: 8,
    slug: 'price-alerts',
    tag: 'Alerts',
    title: 'Price Alerts',
    desc: 'Get notified when market prices cross your targets, per crop and location.',
    image: imgInputs,
  },
  {
    id: 9,
    slug: 'whatsapp-platform',
    tag: 'WhatsApp',
    title: 'WhatsApp Platform',
    desc: 'Low-data access to prices, listings and orders via WhatsApp bot.',
    image: imgHarvest,
  },
]

export default SERVICES
