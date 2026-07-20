import React from 'react';
import { BookOpen, Layers, Shield, Zap, MessageCircle, Settings, Monitor, Printer, LayoutTemplate, Box, Calendar } from 'lucide-react';

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
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  alternativeSlugs?: string[];
  articles: Article[];
}

export const CATEGORIES: Category[] = [
  {
    id: "esl",
    title: "ESL",
    slug: "esl-setup",
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
        }
      },
      {
        slug: "troubleshooting-offline-tags",
        title: "Troubleshooting Offline Tags",
        description: "Steps to diagnose and fix ESL tags that fail to update or drop offline.",
        troubleshooting: [
          { error: "Tag Offline", solution: "Check if the tag is within 15 meters of an active access point." },
          { error: "Failed to Update", solution: "Verify the product SKU matches between POS and the ESL mapping." }
        ]
      }
    ]
  },
  {
    id: "paper-ticketing",
    title: "Paper Ticketing",
    slug: "paper-ticketing",
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
        ]
      },
      {
        slug: "printer-alignment",
        title: "Resolving Printer Alignment Issues",
        description: "How to calibrate Zebra and Brother printers when tickets print off-center.",
        troubleshooting: [
          { error: "Text bleeding off edge", solution: "In Chrome print settings, ensure 'Scale' is set to 'Default' or 100%, not 'Fit to Page'." },
          { error: "Blank tags printing", solution: "Calibrate the printer sensor. Hold the feed button until it flashes twice to re-measure paper length." }
        ]
      }
    ]
  },
  {
    id: "store-configuration",
    title: "Store Configuration",
    slug: "store-configuration",
    alternativeSlugs: ["stores", "store-setup", "pos-integration"],
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
        }
      }
    ]
  },
  {
    id: "ticket-builder",
    title: "Ticket-Builder",
    slug: "ticket-builder",
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
        codeBlock: "<!-- Example output block -->\n<div class='ticket'>\n  <h1>{{product.name}}</h1>\n  <p class='price'>${{price.current}}</p>\n</div>"
      }
    ]
  },
  {
    id: "batches",
    title: "Batches",
    slug: "batches",
    alternativeSlugs: ["batch-printing", "bulk-tickets"],
    articles: [
      {
        slug: "daily-auto-batch",
        title: "Generating a Daily Auto-Batch",
        description: "Automate your daily price changes by linking POS updates to an automated print batch.",
        steps: [
          "Navigate to Batches > Auto-Batch Rules.",
          "Set trigger to 'Any POS Price Change'.",
          "Set execution time (e.g., 6:00 AM daily).",
          "Ticket-IT will compile all changed products overnight and generate a print-ready PDF by morning."
        ]
      }
    ]
  },
  {
    id: "campaigns",
    title: "Campaigns",
    slug: "campaigns",
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
        ]
      }
    ]
  },
  {
    id: "lcd-management",
    title: "LCD Management",
    slug: "lcd-management",
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
        ]
      }
    ]
  }
];
