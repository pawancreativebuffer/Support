import React from 'react';
import { BookOpen, Layers, Shield, Zap, MessageCircle, Settings, Monitor, Printer, LayoutTemplate, Box, Calendar, Activity, Ticket, Users, Code, Smartphone } from 'lucide-react';

export interface ExplanationPoint {
  title: string;
  detail: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ReceivingAccountData {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  beneficiary: string;
}

export interface JsonData {
  status: string;
  projectId: string;
  environment: string;
  allowedDomains: string[];
  limits: {
    dailyRequests: number;
    rateLimitPerMinute: number;
  };
}

export interface SampleData {
  type: 'form' | 'table' | 'receiving-account' | 'json';
  title: string;
  data: TableData | ReceivingAccountData | JsonData | null;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  prerequisites?: string;
  steps?: string[];
  codeBlock?: string;
  troubleshooting?: { error: string; solution: string }[];
  screenshot?: string;
  screenshotCaption?: string;
  explanationPoints?: ExplanationPoint[];
  sample?: SampleData;
  faqs?: { question: string; answer: string }[];
}

export interface CategoryTheme {
  iconBg: string;
  iconColor: string;
  textColor: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  theme: CategoryTheme;
  alternativeSlugs?: string[];
  articles: Article[];
}

export const CATEGORIES: Category[] = [
  {
    id: "esl",
    title: "Retail Automation & ESL",
    slug: "esl-setup",
    description: "Manage and deploy thousands of electronic shelf labels (ESL) across your entire retail network in seconds.",
    iconName: "activity",
    theme: {
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      textColor: "text-orange-500 hover:text-orange-600"
    },
    alternativeSlugs: ["esl", "electronic-shelf-labels"],
    articles: [
      {
        slug: "connecting-esl-hardware",
        title: "Connecting Vusion & Pricer ESLs",
        description: "Learn how to connect your Electronic Shelf Label gateways to the Ticket-IT platform for automated real-time price synchronization.",
        prerequisites: "You must have Admin access to your Ticket-IT workspace and the IP address of your ESL gateway.",
        steps: [
          "Navigate to Settings > Hardware Integration in the Ticket-IT dashboard.",
          "Select 'Add Gateway' and choose your provider (Pricer, Vusion, or SoluM).",
          "Enter the API credentials and local IP address for the gateway.",
          "Click 'Test Connection'. Upon success, click 'Enable Auto-Sync'."
        ],
        explanationPoints: [
          { title: "Real-time Sync", detail: "Once connected, POS price changes push to ESLs within 2-5 seconds." },
          { title: "Battery Monitoring", detail: "The gateway sends back diagnostic data including battery life and signal strength." }
        ],
        sample: {
          type: "json",
          title: "Gateway Connection Payload",
          data: {
            status: "connected",
            projectId: "esl-pricer-001",
            environment: "production",
            allowedDomains: ["store1.retail.local"],
            limits: { dailyRequests: 50000, rateLimitPerMinute: 600 }
          }
        },
        faqs: [
          {
            question: "How long does it take for price changes to reflect on ESLs?",
            answer: "Once connected, price changes are virtually instantaneous. Our gateway pushes the new data payload to the ESL within 2-5 seconds."
          },
          {
            question: "Which hardware brands are supported?",
            answer: "Currently, we natively support Pricer, SES-imagotag (Vusion), and SoluM."
          }
        ]
      },
      {
        slug: "troubleshooting-offline-tags",
        title: "Troubleshooting Offline Tags",
        description: "Steps to diagnose and fix ESL tags that fail to update or drop offline.",
        troubleshooting: [
          { error: "Tag Offline", solution: "Check if the tag is within 15 meters of an active access point." },
          { error: "Failed to Update", solution: "Verify the product SKU matches between POS and the ESL mapping." }
        ],
        faqs: [
          {
            question: "Why do my tags keep dropping offline?",
            answer: "This is usually caused by interference from strong Wi-Fi networks operating on the same 2.4GHz channel as the ESL access point."
          },
          {
            question: "How do I reset a frozen ESL tag?",
            answer: "Use the hardware provider's PDA scanner to scan the tag barcode and send a direct reset command."
          }
        ]
      }
    ]
  },
  {
    id: "ticket-builder",
    title: "Ticket-Builder",
    slug: "ticket-builder-guide",
    description: "Design custom tickets matching your brand guidelines with our intuitive web-based ticket builder.",
    iconName: "ticket",
    theme: {
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
      textColor: "text-emerald-500 hover:text-emerald-600"
    },
    alternativeSlugs: ["templates", "design", "builder"],
    articles: [
      {
        slug: "create-custom-template",
        title: "Creating Your First Custom Template",
        description: "A guide to using the drag-and-drop Ticket-Builder canvas.",
        steps: [
          "Open the Template Library and click 'New Template'.",
          "Define canvas dimensions (e.g., 90x55mm).",
          "Drag text boxes, shapes, and upload brand logos onto the canvas.",
          "Save and Lock the template to prevent unauthorized edits."
        ],
        codeBlock: "<!-- Example output block -->\n<div class='ticket'>\n  <h1>{{product.name}}</h1>\n  <p class='price'>${{price.current}}</p>\n</div>",
        faqs: [
          {
            question: "Can I use custom fonts in my templates?",
            answer: "Yes, you can upload TrueType (.ttf) or OpenType (.otf) fonts in your brand settings, and they will be available in the Ticket-Builder."
          },
          {
            question: "How do I create a template that works for both paper and ESLs?",
            answer: "You should create a separate Master Template for paper sizes and a Digital Template optimized for the specific pixel dimensions of your ESL hardware."
          }
        ]
      }
    ]
  },
  {
    id: "store-batch-management",
    title: "Store & Batch Management",
    slug: "store-configuration",
    description: "Organize retail locations, handle ticket batches, and configure pricing models on a per-store basis.",
    iconName: "users",
    theme: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      textColor: "text-blue-500 hover:text-blue-600"
    },
    alternativeSlugs: ["stores", "store-setup", "pos-integration", "batch", "batches"],
    articles: [
      {
        slug: "add-new-store",
        title: "Adding a New Franchise Location",
        description: "How to onboard a new store into your Ticket-IT network.",
        steps: [
          "Go to Settings > Store Management and click 'Add Store'.",
          "Enter the physical address, Store ID (must match POS), and Region.",
          "Assign a Store Manager account and configure their RBAC permissions."
        ],
        sample: {
          type: "table",
          title: "Store Access Tiers",
          data: {
            headers: ["Role", "Can Print", "Can Edit Templates", "Can Run Campaigns"],
            rows: [
              ["Store Manager", "Yes", "No", "No"],
              ["Regional Manager", "Yes", "No", "Yes (Local only)"],
              ["Head Office Admin", "Yes", "Yes", "Yes (Global)"]
            ]
          }
        },
        faqs: [
          {
            question: "What happens if the Store ID doesn't match the POS?",
            answer: "Price updates will fail to route to that store because the system uses the Store ID as the unique identifier for pricing rules."
          }
        ]
      },
      {
        slug: "daily-auto-batch",
        title: "Generating a Daily Auto-Batch",
        description: "Automate your daily price changes by linking POS updates to an automated print batch.",
        steps: [
          "Navigate to Batches > Auto-Batch Rules.",
          "Set trigger to 'Any POS Price Change'.",
          "Set execution time (e.g., 6:00 AM daily).",
          "Ticket-IT will compile all changed products overnight and generate a print-ready PDF by morning."
        ],
        faqs: [
          {
            question: "Can stores modify the auto-batch before printing?",
            answer: "Yes, Store Managers can log in and exclude items or add additional tags to the batch before sending it to the printer."
          }
        ]
      }
    ]
  },
  {
    id: "pos-integrations",
    title: "POS Integrations",
    slug: "pos-integrations",
    description: "Seamlessly sync product data and automated pricing from leading Point of Sale systems.",
    iconName: "code",
    theme: {
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      textColor: "text-rose-500 hover:text-rose-600"
    },
    alternativeSlugs: ["api", "sync", "point of sale", "database", "sql", "db", "ssms"],
    articles: [
      {
        slug: "setting-up-pos-sync",
        title: "Setting up automated POS sync",
        description: "Guide to establishing a secure connection with your POS API.",
        steps: [
          "Generate an API Key from your POS backend.",
          "Enter the Key into Ticket-IT Integrations tab.",
          "Map the fields (SKU, Price, Name, Barcode) to Ticket-IT."
        ],
        faqs: [
          {
            question: "Do you integrate with legacy on-premise POS systems?",
            answer: "Yes, we support SFTP flat-file drop integrations for older systems that do not have a REST API."
          }
        ]
      }
    ]
  },
  {
    id: "campaigns-promotions",
    title: "Campaigns & Promotions",
    slug: "campaigns-management",
    description: "Set up, schedule, and automate promotional pricing campaigns to update store tickets instantly.",
    iconName: "messageCircle",
    theme: {
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      textColor: "text-purple-500 hover:text-purple-600"
    },
    alternativeSlugs: ["promotions", "sales"],
    articles: [
      {
        slug: "schedule-promo-campaign",
        title: "Scheduling a Weekly Promo Campaign",
        description: "How to set up advance promotional pricing that automatically activates and reverts.",
        steps: [
          "Go to Campaigns > Create New.",
          "Set Start Date and End Date.",
          "Import a CSV of SKUs and their Promotional Prices.",
          "Assign a specific 'Was/Now' template to the campaign and save."
        ],
        faqs: [
          {
            question: "What happens if a product is in two active campaigns at once?",
            answer: "Ticket-IT uses priority weighting. The campaign with the higher priority number will overwrite the other."
          },
          {
            question: "Do the prices revert automatically?",
            answer: "Yes, at midnight on the End Date, the system will automatically revert the prices on the ESLs and generate a new batch for paper tags."
          }
        ]
      }
    ]
  },
  {
    id: "hardware-lcds",
    title: "Hardware & LCDs",
    slug: "lcd-management",
    description: "Connect and troubleshoot digital signage, LED displays, and specialized retail ticket printers.",
    iconName: "shield",
    theme: {
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      textColor: "text-cyan-600 hover:text-cyan-700"
    },
    alternativeSlugs: ["digital-signage", "screens", "lcd"],
    articles: [
      {
        slug: "deploy-digital-signage",
        title: "Deploying Content to Digital Signage",
        description: "Push high-definition HTML5 templates to your in-store LCD screens.",
        prerequisites: "Your LCD screens must be connected to the internet and have a modern HTML5 browser.",
        steps: [
          "Build a landscape (16:9) digital template in Ticket-Builder.",
          "Go to Hardware > Screens, select the target IP addresses.",
          "Click 'Push Content' and select your new template."
        ],
        explanationPoints: [
          { title: "HTML5 Rendering", detail: "Because the template is HTML5, prices update dynamically without needing to re-upload heavy video files." }
        ],
        faqs: [
          {
            question: "Can I schedule content to change during the day?",
            answer: "Yes, use the Dayparting feature to display breakfast promotions in the morning and dinner specials at night."
          }
        ]
      }
    ]
  },
  {
    id: "paper-ticketing",
    title: "Paper Ticketing & Print",
    slug: "paper-ticketing",
    description: "Manage centralized, distributed, or hybrid printing processes for physical paper tickets.",
    iconName: "bookOpen",
    theme: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-600 hover:text-yellow-700"
    },
    alternativeSlugs: ["printing", "paper-tickets", "label-printing"],
    articles: [
      {
        slug: "printing-workflows",
        title: "Local vs Centralized Printing Workflows",
        description: "Understand the difference between printing tags locally in-store versus central head office printing.",
        steps: [
          "For Local: Go to 'Web Tickets', select your store, and hit 'Print Local'.",
          "For Centralized: Go to 'Batch Management', select 'All Stores', and download the segmented PDF."
        ],
        explanationPoints: [
          { title: "Local Printing", detail: "Best for daily price changes or replacing damaged tags on the fly." },
          { title: "Centralized", detail: "Best for massive seasonal campaigns where high-quality stock is shipped to stores." }
        ],
        faqs: [
          {
            question: "Can Head Office force a print job to a store printer?",
            answer: "Yes, if the store uses our Cloud Print agent on their terminal, Head Office can route PDF batches directly to their tray."
          }
        ]
      },
      {
        slug: "printer-alignment",
        title: "Resolving Printer Alignment Issues",
        description: "How to calibrate Zebra and Brother printers when tickets print off-center.",
        troubleshooting: [
          { error: "Text bleeding off edge", solution: "In Chrome print settings, ensure 'Scale' is set to 'Default' or 100%, not 'Fit to Page'." },
          { error: "Blank tags printing", solution: "Calibrate the printer sensor. Hold the feed button until it flashes twice to re-measure paper length." }
        ],
        faqs: [
          {
            question: "Why is the barcode unreadable by our scanners?",
            answer: "This is usually caused by low DPI printing or the printer head needing cleaning with an alcohol wipe."
          }
        ]
      }
    ]
  },
  {
    id: "reporting-compliance",
    title: "Reporting & Compliance",
    slug: "reporting-compliance",
    description: "Generate ongoing reports of store user access, ticket creation, and compliance metrics.",
    iconName: "layers",
    theme: {
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      textColor: "text-teal-600 hover:text-teal-700"
    },
    alternativeSlugs: ["reports"],
    articles: [
      {
        slug: "generating-compliance-reports",
        title: "Generating Compliance Reports",
        description: "How to prove ticketing compliance across your franchise network.",
        steps: [
          "Navigate to Reports > Compliance.",
          "Select the date range and region.",
          "Export as PDF or CSV."
        ],
        faqs: [
          {
            question: "What defines 'compliance' in the report?",
            answer: "A store is marked compliant if they successfully downloaded and acknowledged the required weekly pricing batch."
          }
        ]
      }
    ]
  },
  {
    id: "ticket-it-mobile",
    title: "Ticket-IT Mobile",
    slug: "mobile-app",
    description: "Build batches on the go. Scan products and manage tickets directly from the shop floor.",
    iconName: "smartphone",
    theme: {
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
      textColor: "text-pink-500 hover:text-pink-600"
    },
    alternativeSlugs: ["app", "scanning"],
    articles: [
      {
        slug: "using-the-mobile-app",
        title: "Getting Started with Ticket-IT Mobile",
        description: "How to log in and scan your first product.",
        steps: [
          "Download the app from iOS/Android store.",
          "Log in using your SSO credentials.",
          "Tap 'Scan Barcode' to instantly view the product's live price and add it to the print queue."
        ],
        faqs: [
          {
            question: "Does the app support offline mode?",
            answer: "Yes, you can scan barcodes in offline mode. The app will sync the queue to the central batch once Wi-Fi is restored."
          },
          {
            question: "Can I use dedicated laser scanners?",
            answer: "Yes, the app supports physical Bluetooth scanners (like Zebra or Honeywell) in addition to the device camera."
          }
        ]
      }
    ]
  }
];

export const getCategoryIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case 'activity':
      return <Activity className={className} />;
    case 'ticket':
      return <Ticket className={className} />;
    case 'users':
      return <Users className={className} />;
    case 'code':
      return <Code className={className} />;
    case 'messageCircle':
      return <MessageCircle className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'bookOpen':
      return <BookOpen className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'smartphone':
      return <Smartphone className={className} />;
    case 'zap':
      return <Zap className={className} />;
    case 'printer':
      return <Printer className={className} />;
    case 'settings':
      return <Settings className={className} />;
    case 'layoutTemplate':
      return <LayoutTemplate className={className} />;
    case 'box':
      return <Box className={className} />;
    case 'calendar':
      return <Calendar className={className} />;
    case 'monitor':
      return <Monitor className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};
