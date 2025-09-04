const SERVICE_DETAILS = {
  'marketplace-trading': {
    intro: 'Buy and sell farm produce with powerful search and filters by crop, grade, location and price. Verified sellers and simple ordering reduce friction for both buyers and traders.',
    numbers: [
      { title: 'Search & Filter Fast', desc: 'Find produce by crop, grade, location and price in seconds.' },
      { title: 'Verified Suppliers', desc: 'Trade with KYC-verified farmers and trusted traders.' },
      { title: 'RFQs & Instant Buy', desc: 'Request quotes or buy instantly, all from one place.' },
    ],
    sectionTitle: 'Key Capabilities',
    bulletsLeft: [
      'Filters: crop, grade, price range, location radius',
      'Seller profiles with ratings and KYC badge',
      'Multiple images per listing with harvest date',
      'Availability and minimum order quantities',
    ],
    bulletsRight: [
      'In-app messaging and order handoff',
      'Location-aware suggestions',
      'Secure checkout via escrow',
      'Order history and repeat purchases',
    ],
    faqs: [
      { q: 'How do I place an order?', a: 'Open a listing and choose Instant Buy or create an RFQ to negotiate. Complete checkout to place the order.' },
      { q: 'Can I compare multiple offers?', a: 'Yes. Send an RFQ to multiple verified sellers and compare their responses in one place.' },
      { q: 'Do I need an account?', a: 'You can browse publicly. To place orders or RFQs, create an account and complete basic profile details.' },
    ],
  },
  'live-price-board': {
    intro: 'Track real-time prices from ZMX, Mbare and AMA. View trends and make data-driven buying and selling decisions.',
    numbers: [
      { title: 'Real-Time Feeds', desc: 'Aggregated from ZMX, Mbare and AMA sources.' },
      { title: 'Trends & Insights', desc: 'Week-over-week and month-over-month price movements.' },
      { title: 'Regional Coverage', desc: 'View prices by markets and major cities.' },
    ],
    sectionTitle: 'What You Get',
    bulletsLeft: [
      'Normalized units and currency (USD/ZWL)',
      'Historical charts for key crops',
      'Favorites for quick access',
      'CSV export of price data',
    ],
    bulletsRight: [
      'Price change highlights',
      'Location-based recommendations',
      'Price alerts integration',
      'API-ready data for partners',
    ],
    faqs: [
      { q: 'How often is data updated?', a: 'Feeds are polled frequently and pushed to the board as soon as updates are available.' },
      { q: 'Which sources are supported?', a: 'ZMX, Mbare and AMA are supported at launch with room to add others.' },
      { q: 'Can I set alerts?', a: 'Yes. Create price alerts for your crops by target price and location.' },
    ],
  },
  'logistics-delivery': {
    intro: 'Arrange pickup and delivery, track orders and reduce post-harvest losses with connected logistics.',
    numbers: [
      { title: 'Pickup Scheduling', desc: 'Coordinate collection directly from farms.' },
      { title: 'Real-Time Tracking', desc: 'Track order status and ETAs from app or web.' },
      { title: 'Reduced Losses', desc: 'Optimized routing and handling to maintain quality.' },
    ],
    sectionTitle: 'Services',
    bulletsLeft: [
      'Driver and vehicle assignment',
      'Proof of delivery and signatures',
      'Temperature and handling notes',
      'Delivery fee transparency',
    ],
    bulletsRight: [
      'Multi-drop routing options',
      'Buyer and seller notifications',
      'Incident and delay reporting',
      'Integrated with escrow release',
    ],
    faqs: [
      { q: 'Which areas are covered?', a: 'Major corridors and cities at launch, expanding based on demand.' },
      { q: 'Who pays for delivery?', a: 'Delivery costs can be paid by buyer, seller, or split—configured per order.' },
      { q: 'Can I track my order?', a: 'Yes. You receive status updates and ETAs via the app and notifications.' },
    ],
  },
  'escrow-payments': {
    intro: 'Secure payments that protect buyers and sellers. Funds are held in escrow and released on successful delivery.',
    numbers: [
      { title: 'Secure by Default', desc: 'Funds held safely until delivery is confirmed.' },
      { title: 'Flexible Methods', desc: 'EcoCash, OneMoney, ZIPIT and bank transfer supported.' },
      { title: 'Dispute Handling', desc: 'Clear policies and workflows to resolve issues.' },
    ],
    sectionTitle: 'Benefits',
    bulletsLeft: [
      'Payment status tracking',
      'Automatic receipts and records',
      'Partial release options',
      'Refunds for cancellations',
    ],
    bulletsRight: [
      'KYC and AML checks',
      'Transaction fees 1–3%',
      'Multi-currency support',
      'Audit trails for admins',
    ],
    faqs: [
      { q: 'When are funds released?', a: 'Once delivery is confirmed by the buyer or automatically after a set window if undisputed.' },
      { q: 'What payment methods are available?', a: 'EcoCash, OneMoney, ZIPIT and bank transfers are supported at launch.' },
      { q: 'What if there is a dispute?', a: 'Escrow allows investigation. Funds remain on hold until a resolution is reached.' },
    ],
  },
  'farmer-kyc-onboarding': {
    intro: 'Verify identities and documents to build trust. Approved farmers earn a KYC badge that boosts credibility.',
    numbers: [
      { title: 'Document Checks', desc: 'National ID, passport or driver’s license.' },
      { title: 'Fraud Reduction', desc: 'Platform-wide integrity through verification.' },
      { title: 'Faster Deals', desc: 'Buyers prefer verified sellers, closing deals faster.' },
    ],
    sectionTitle: 'Verification Scope',
    bulletsLeft: [
      'Document capture and storage',
      'Review and approval workflow',
      'Rejection reasons and resubmission',
      'KYC badge on profiles',
    ],
    bulletsRight: [
      'Admin dashboard visibility',
      'Audit logs of changes',
      'Data privacy and encryption',
      'Expiry and re-verification cycles',
    ],
    faqs: [
      { q: 'Which documents are required?', a: 'Any of national ID, passport or driver’s license. A utility bill may be requested.' },
      { q: 'How long does verification take?', a: 'Typically within 24–72 hours depending on volume and document clarity.' },
      { q: 'Is my data safe?', a: 'Yes. Documents are stored securely with restricted access and encryption.' },
    ],
  },
  'rfqs-and-orders': {
    intro: 'Manage requests for quotes and orders in one place. Streamline negotiations and fulfilment.',
    numbers: [
      { title: 'RFQs to Many', desc: 'Send requests to multiple sellers and compare offers.' },
      { title: 'Accept/Reject Flow', desc: 'Standardized negotiation and confirmation steps.' },
      { title: 'Fulfilment Tracking', desc: 'Track preparation, pickup, delivery and completion.' },
    ],
    sectionTitle: 'Workflow Highlights',
    bulletsLeft: [
      'Order status timeline',
      'Buyer and seller messaging',
      'Cancellation with reasons',
      'Automated notifications',
    ],
    bulletsRight: [
      'Attachments: invoices, receipts',
      'Bulk actions for admins',
      'CSV export of orders',
      'Role-based permissions',
    ],
    faqs: [
      { q: 'What is the difference between an RFQ and an order?', a: 'RFQs are requests for offers. An order is a confirmed purchase with agreed terms.' },
      { q: 'How do I respond to an RFQ?', a: 'Submit your price, quantity and delivery terms from the RFQ view. Buyers can accept or counter.' },
      { q: 'Can I cancel an order?', a: 'Yes, subject to order status and platform cancellation policies.' },
    ],
  },
  'analytics-dashboards': {
    intro: 'Understand performance with dashboards for volumes, price trends and user activity.',
    numbers: [
      { title: 'Volume & Value', desc: 'Track kg traded and total order value over time.' },
      { title: 'Price Trends', desc: 'Spot pricing patterns by crop and market.' },
      { title: 'User Activity', desc: 'Monitor new users, active buyers and sellers.' },
    ],
    sectionTitle: 'Insights',
    bulletsLeft: [
      'Time-series charts',
      'Top crops and markets',
      'Filter by date and role',
      'Export and sharing',
    ],
    bulletsRight: [
      'Anomaly detection flags',
      'Cohort and retention views',
      'Goal tracking for KPIs',
      'Admin-only drilldowns',
    ],
    faqs: [
      { q: 'What metrics are available?', a: 'Volumes, values, price trends, user activity and more. Roadmap adds deeper segmentation.' },
      { q: 'Can I export dashboards?', a: 'Yes. Export CSVs and share snapshots with your team.' },
      { q: 'Who can access analytics?', a: 'Admins and authorized partner roles based on permissions.' },
    ],
  },
  'price-alerts': {
    intro: 'Get notified when prices cross your targets. Choose crop, market, condition and price to trigger alerts.',
    numbers: [
      { title: 'Targeted Alerts', desc: 'Above, below or equal to a target price.' },
      { title: 'Multi-Channel', desc: 'In-app, email, WhatsApp and push notifications.' },
      { title: 'Per Crop & Market', desc: 'Scoped by commodity and location.' },
    ],
    sectionTitle: 'Control & Delivery',
    bulletsLeft: [
      'Manage active alerts',
      'Pause and resume anytime',
      'Unit and currency selection',
      'Daily/weekly digest options',
    ],
    bulletsRight: [
      'Smart deduplication',
      'Alert history log',
      'One-tap create from price board',
      'Bulk create via CSV (roadmap)',
    ],
    faqs: [
      { q: 'How do I create an alert?', a: 'From the price board or alerts page, choose the crop, market, condition and price, then save.' },
      { q: 'Can I pause alerts?', a: 'Yes. Toggle alerts on/off anytime without deleting them.' },
      { q: 'How will I receive alerts?', a: 'In-app and email by default. WhatsApp and push are supported where enabled.' },
    ],
  },
  'whatsapp-platform': {
    intro: 'Access listings, prices and orders using simple WhatsApp commands—ideal for low-data environments.',
    numbers: [
      { title: 'Low Data Access', desc: 'Interact over WhatsApp without installing an app.' },
      { title: 'Quick Commands', desc: 'Check prices, list produce and manage orders via chat.' },
      { title: 'Order Updates', desc: 'Receive notifications and respond to RFQs on the go.' },
    ],
    sectionTitle: 'What You Can Do',
    bulletsLeft: [
      '“Prices maize Harare” returns live prices',
      '“Sell 200kg tomatoes $0.50/kg Harare” creates a listing',
      '“My orders” lists pending and fulfilled orders',
      'Withdraw to EcoCash or bank (where enabled)',
    ],
    bulletsRight: [
      'Multi-language support (roadmap)',
      'Voice input for low literacy (roadmap)',
      'KYC prompts and status checks',
      'Alerts delivered to WhatsApp',
    ],
    faqs: [
      { q: 'How do I get started?', a: 'Save the official number and send “Hi”. The bot will guide you through available commands.' },
      { q: 'What commands are available?', a: 'Prices, list produce, accept/reject orders, check wallet and withdraw—depending on your role.' },
      { q: 'Are there extra fees?', a: 'Standard carrier messaging rates may apply. Platform fees are the same as the web and app.' },
    ],
  },
}

export default SERVICE_DETAILS
