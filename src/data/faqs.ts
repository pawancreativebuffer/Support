export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
  isCode?: boolean;
}

export const faqs: FaqItem[] = [
  // --- ESL ---
  {
    question: "What is ESL and how does Ticket-IT integrate with it?",
    answer: "Electronic Shelf Labels (ESL) are digital price tags used in retail stores. Ticket-IT is a future-proof solution that seamlessly connects with ESL gateways to push automated pricing and product data directly to the shelves, eliminating manual paper updates.",
    category: "ESL",
    helpfulCount: 312
  },
  {
    question: "Which ESL hardware brands are supported by Ticket-IT?",
    answer: "We support major ESL hardware providers including Pricer, SES-imagotag (Vusion), and SoluM. Our API integration ensures that data payload formats are automatically translated for the specific hardware you have deployed.",
    category: "ESL",
    helpfulCount: 185
  },
  {
    question: "How long does it take for price changes to reflect on ESLs?",
    answer: "Price changes are virtually instantaneous. Once a price is updated in your POS or ERP and synced to Ticket-IT, the system pushes the new data payload to the ESL gateway, updating the digital tag within seconds.",
    category: "ESL",
    helpfulCount: 205
  },
  {
    question: "Can ESLs display promotional tags or just standard pricing?",
    answer: "Yes, Ticket-IT allows you to send rich data to ESLs, including promotional flags, 'Was/Now' pricing, and stock levels. Depending on your ESL model (e.g., e-ink with color capabilities), you can highlight promotions in red or yellow.",
    category: "ESL",
    helpfulCount: 142
  },
  {
    question: "What happens if an ESL loses connection to the network?",
    answer: "Ticket-IT's dashboard includes a hardware monitoring tab. If an ESL fails to acknowledge a price update, it is flagged in the system. Store managers receive automated alerts detailing which specific tags are offline or out of sync.",
    category: "ESL",
    helpfulCount: 98
  },
  {
    question: "How do I check the battery status of my ESL tags?",
    answer: "Battery diagnostics are transmitted back from the ESL gateway to the Ticket-IT platform. You can view the battery health of all deployed tags in the 'Hardware Health' report and order replacements before they die.",
    category: "ESL",
    helpfulCount: 76
  },

  // --- Paper Ticketing ---
  {
    question: "How do I set up centralized printing for head office?",
    answer: "Ticket-IT allows head offices to generate massive batches of tickets for the entire network. Under 'Print Workflows', select 'Centralized'. The system will generate print-ready PDFs sorted by store, aisle, or category for easy distribution.",
    category: "Paper Ticketing",
    helpfulCount: 230
  },
  {
    question: "Can stores print tickets locally using distributed printing?",
    answer: "Absolutely. With 'Distributed Printing', the head office creates the ticket batches, but the print jobs are securely routed to the local printers inside each franchise store, saving on shipping costs and time.",
    category: "Paper Ticketing",
    helpfulCount: 194
  },
  {
    question: "What is a hybrid printing workflow?",
    answer: "A hybrid workflow allows you to print standard, everyday price tags at the local store level, while large-scale promotional campaign materials (like large posters or special stock) are printed centrally and shipped.",
    category: "Paper Ticketing",
    helpfulCount: 125
  },
  {
    question: "How do I quickly print a replacement for a damaged paper ticket?",
    answer: "Store staff can use the 'Web Tickets' feature. Simply search for the product via barcode or name, select the desired template, and hit print. A replacement ticket is generated instantly without head office intervention.",
    category: "Paper Ticketing",
    helpfulCount: 310
  },
  {
    question: "Does Ticket-IT support specific label printer models?",
    answer: "Yes, we support all major thermal and laser printers, including Zebra, Brother, and Lexmark. Ticket-IT generates high-resolution PDFs or direct ZPL code depending on your hardware configuration.",
    category: "Paper Ticketing",
    helpfulCount: 156
  },

  // --- Store Configuration ---
  {
    question: "How do I add a new retail store to my network?",
    answer: "Go to Settings > Store Management and click 'Add Store'. Enter the store details, assign a store ID that matches your POS, and define regional pricing rules. The new store will immediately be available for batch printing and campaign targeting.",
    category: "Store Configuration",
    helpfulCount: 182
  },
  {
    question: "How do I manage role-based access for store managers?",
    answer: "Under Settings > Roles & Permissions, you can define specific roles for store staff. For example, a 'Store Manager' role can be restricted to only viewing and re-printing tickets for their specific location, while blocking access to global templates.",
    category: "Store Configuration",
    helpfulCount: 145
  },
  {
    question: "How do I connect my POS system (like Vend) to a specific store?",
    answer: "Navigate to Settings > Integrations. Select your POS provider and authenticate. You can map POS location IDs directly to your Ticket-IT stores, ensuring that product pricing syncs accurately per location.",
    category: "Store Configuration",
    helpfulCount: 275
  },
  {
    question: "Does Ticket-IT offer reporting and compliance tracking for stores?",
    answer: "Yes, our reporting suite offers ongoing insights into store user access, ticket creation, and printing logs. This helps head office ensure compliance and accuracy across all franchise locations.",
    category: "Store Configuration",
    helpfulCount: 112
  },
  {
    question: "How secure is the platform when configuring store access?",
    answer: "Security is our top priority. The Ticket-IT platform undergoes 100% CREST approved penetration testing. We also support SAML and SSO integrations so store staff can securely log in using existing corporate credentials.",
    category: "Store Configuration",
    helpfulCount: 210
  },

  // --- Ticket-Builder ---
  {
    question: "How do I create a new ticket template from scratch?",
    answer: "Go to the 'Templates' section and launch the Ticket-Builder. You can start with a blank canvas, define the physical dimensions, and use the drag-and-drop interface to add text boxes, images, shapes, and dynamic data fields.",
    category: "Ticket-Builder",
    helpfulCount: 215
  },
  {
    question: "Can I upload custom brand fonts and logos to Ticket-Builder?",
    answer: "Yes. Ticket-IT allows you to upload custom TTF/OTF fonts and high-resolution SVG or PNG logos to ensure that every ticket adheres strictly to your corporate brand guidelines.",
    category: "Ticket-Builder",
    helpfulCount: 176
  },
  {
    question: "Are there dynamic fields in the ticket builder (e.g. price per unit)?",
    answer: "Absolutely. You can drag dynamic placeholders (like {{product.name}}, {{price.current}}, or {{price.unit}}) onto the canvas. These fields automatically populate with the correct data when a batch is generated.",
    category: "Ticket-Builder",
    helpfulCount: 204
  },
  {
    question: "Can I add barcodes or QR codes to the ticket templates?",
    answer: "Yes. The Ticket-Builder includes a barcode generator widget. You can map it to your product's SKU or UPC field. We support standard formats like EAN-13, Code 128, and QR codes for customer scanning.",
    category: "Ticket-Builder",
    helpfulCount: 189
  },
  {
    question: "How do I restrict store managers from altering locked template designs?",
    answer: "Using our advanced Role-Based Access Control (RBAC), head office admins can lock template layouts. Store managers can select the templates and populate data, but they cannot move elements, change fonts, or alter the branding.",
    category: "Ticket-Builder",
    helpfulCount: 130
  },

  // --- Batches ---
  {
    question: "What is a print batch in Ticket-IT?",
    answer: "A batch is a grouped collection of tickets scheduled for printing or digital deployment. Batches organize tickets by template type, store location, and paper stock to streamline the physical printing process.",
    category: "Batches",
    helpfulCount: 188
  },
  {
    question: "How do I create a bulk print batch for multiple stores?",
    answer: "In the 'Batches' dashboard, select the products you want to ticket, apply the desired templates, and select the target stores. Ticket-IT will automatically generate separate print files routed to each specific store.",
    category: "Batches",
    helpfulCount: 165
  },
  {
    question: "Can store staff build their own batches using the mobile app?",
    answer: "Yes, using the Ticket-IT Mobile app, staff can walk the aisles, scan barcodes of products that need new tickets, and compile a 'Mobile Batch'. They can then send this batch directly to the back-office printer.",
    category: "Batches",
    helpfulCount: 210
  },
  {
    question: "How do I automate batch generation based on POS price changes?",
    answer: "You can configure 'Auto-Batches'. When Ticket-IT detects a price change from your POS, it automatically adds the affected product to a pending daily batch. At a scheduled time (e.g., 6:00 AM), the batch is finalized and printed.",
    category: "Batches",
    helpfulCount: 195
  },
  {
    question: "How do I re-print a historical batch?",
    answer: "Navigate to 'Batch History'. Here you can view all previously processed batches. Simply select a past batch and click 'Re-print'. You can choose to reprint the entire batch or select specific tickets within it.",
    category: "Batches",
    helpfulCount: 98
  },

  // --- Campaigns ---
  {
    question: "How do I schedule a promotional campaign in advance?",
    answer: "In the 'Campaigns' module, create a new promotion, select the start and end dates, and import the list of participating products and their promotional prices. Ticket-IT will queue the tickets for deployment exactly when the campaign begins.",
    category: "Campaigns",
    helpfulCount: 220
  },
  {
    question: "Can campaigns be targeted to specific franchise locations or regions?",
    answer: "Yes, campaigns can be globally applied to all stores, or segmented by specific regions, franchise tiers, or even individual store locations. Pricing and templates will only update for the targeted stores.",
    category: "Campaigns",
    helpfulCount: 178
  },
  {
    question: "Does Ticket-IT automatically revert pricing after a campaign ends?",
    answer: "Yes. When setting up a campaign, you define an end date. Once the campaign expires, Ticket-IT automatically generates a 'Revert Batch' to print standard price tags, or instantly resets ESLs back to their original prices.",
    category: "Campaigns",
    helpfulCount: 245
  },
  {
    question: "How do I highlight sale items (e.g. 'Was/Now' pricing) during a campaign?",
    answer: "You can configure your campaign templates to utilize dynamic fields like 'Previous Price' and 'Promo Price'. Ticket-IT will automatically calculate savings percentages and render striking 'Was/Now' visual layouts.",
    category: "Campaigns",
    helpfulCount: 192
  },
  {
    question: "Is it possible to run multiple overlapping campaigns?",
    answer: "Yes. Ticket-IT includes a conflict resolution engine. If a product exists in multiple active campaigns, the system applies a hierarchy rule (e.g., 'Clearance overrides Weekly Special') to ensure the correct price is always displayed.",
    category: "Campaigns",
    helpfulCount: 134
  },

  // --- LCD Management ---
  {
    question: "How does Ticket-IT push content to LCD and digital signage screens?",
    answer: "Ticket-IT integrates with digital signage media players over the cloud. You can assign 'Digital Templates' to specific screen IP addresses or MAC addresses, pushing high-definition HTML5 or image content in real-time.",
    category: "LCD Management",
    helpfulCount: 185
  },
  {
    question: "Can I schedule different content to play at different times of the day on LCDs?",
    answer: "Yes, using the Digital Scheduler, you can rotate content. For example, a screen in the bakery section can show breakfast promotions in the morning and discount bread pricing in the evening.",
    category: "LCD Management",
    helpfulCount: 162
  },
  {
    question: "What media formats are supported for LCD displays?",
    answer: "Ticket-IT supports rendering dynamic HTML5 templates (which update prices live), high-resolution Images (JPEG, PNG), and looping MP4 video backgrounds overlaid with live pricing data.",
    category: "LCD Management",
    helpfulCount: 140
  },
  {
    question: "How do I group multiple screens to show the same digital ticket?",
    answer: "In the Hardware dashboard, you can group multiple LCD screens into 'Zones' (e.g., 'Endcap Displays'). When you deploy a digital ticket batch to a Zone, all screens within it update simultaneously.",
    category: "LCD Management",
    helpfulCount: 115
  },
  {
    question: "What hardware media players are compatible with Ticket-IT?",
    answer: "Ticket-IT is hardware agnostic and works via web browser URLs. Any digital signage player that supports a modern HTML5 browser (such as BrightSign, Samsung Tizen, LG WebOS, or standard Android/Windows mini-PCs) is fully compatible.",
    category: "LCD Management",
    helpfulCount: 104
  },
  
  // --- General ---
  {
    question: "Is Ticket-IT a web-based solution?",
    answer: "Yes, Ticket-IT was the first web-based retail ticketing solution in the world. Our platform allows you to create and send thousands of tickets to thousands of stores in seconds from any browser.",
    category: "General",
    helpfulCount: 245
  },
  {
    question: "How secure is the Ticket-IT platform?",
    answer: "Security is our top priority. The Ticket-IT platform undergoes 100% CREST approved penetration testing to guarantee optimal security and protection for your retail data.",
    category: "General",
    helpfulCount: 210
  },
  {
    question: "Do you support Single Sign-On (SSO)?",
    answer: "Yes, we support SAML and SSO integrations so your head office and store staff can seamlessly log in using their existing corporate credentials.",
    category: "General",
    helpfulCount: 134
  },
  {
    question: "How is Ticket-IT priced?",
    answer: "Pricing is tailored based on the number of stores, users, and the specific modules (ESL, POS integration, Print) you require. Please contact our sales team to book a presentation and receive a custom quote.",
    category: "General",
    helpfulCount: 145
  },
  {
    question: "How do I get help if my store staff face an issue?",
    answer: "Our dedicated support team provides excellent service for both head office functions and individual retailers. You can submit a support ticket via this portal or use our live chat for urgent issues.",
    category: "General",
    helpfulCount: 176
  }
];
