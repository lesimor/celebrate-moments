// Base Event Type
export type EventType = 'wedding' | 'funeral';

// Template Types
export type WeddingTemplateStyle = 'classic' | 'modern' | 'minimal' | 'illustration';
export type FuneralTemplateStyle = 'traditional' | 'modern' | 'simple';
export type SeasonTheme = 'spring' | 'summer' | 'autumn' | 'winter';

// Common interfaces
export interface ContactInfo {
  name: string;
  relation: string;
  phone: string;
}

export interface BankAccount {
  bank: string;
  account: string;
  holder: string;
}

export interface Venue {
  name: string;
  hall?: string;
  address: string;
  phone?: string;
  mapUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Template Configuration
export interface TemplateConfig {
  id: string;
  name: string;
  style: WeddingTemplateStyle | FuneralTemplateStyle;
  season?: SeasonTheme;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  isPremium: boolean;
}

// Wedding Event
export interface WeddingEvent {
  type: 'wedding';
  id: string;
  url: string;
  template: TemplateConfig;
  couple: {
    groom: {
      name: string;
      fullName: string;
      father: string;
      mother: string;
      order: string;
    };
    bride: {
      name: string;
      fullName: string;
      father: string;
      mother: string;
      order: string;
    };
  };
  wedding: {
    date: string;
    time: string;
    venue: Venue;
  };
  message: {
    title: string;
    content: string;
  };
  gallery: {
    mainImage: string;
    images: string[];
  };
  rsvp?: {
    enabled: boolean;
    deadline?: string;
    responses?: Array<{
      id: string;
      name: string;
      attending: boolean;
      companions: number;
      message?: string;
      createdAt: string;
    }>;
  };
  guestbook?: Array<{
    id: string;
    name: string;
    message: string;
    createdAt: string;
  }>;
  bank?: {
    groom: BankAccount[];
    bride: BankAccount[];
  };
  contact: {
    groom: ContactInfo[];
    bride: ContactInfo[];
  };
  statistics?: {
    views: number;
    shares: number;
    rsvpCount: number;
  };
}

// Funeral Event
export interface FuneralEvent {
  type: 'funeral';
  id: string;
  url: string;
  template: TemplateConfig;
  deceased: {
    name: string;
    birthDate: string;
    deathDate: string;
    age: number;
    religion?: 'buddhist' | 'christian' | 'catholic' | 'none';
  };
  chiefMourner: {
    name: string;
    relation: string;
    phone: string;
  };
  mourners: Array<{
    name: string;
    relation: string;
    phone: string;
  }>;
  funeral: {
    mortuary: Venue;
    funeralDate: string;
    funeralTime: string;
    burialDate?: string;
    burialTime?: string;
    burialLocation?: string;
  };
  message: {
    title: string;
    content: string;
  };
  bank?: BankAccount[];
  condolences?: Array<{
    id: string;
    name: string;
    message: string;
    createdAt: string;
  }>;
  statistics?: {
    views: number;
    shares: number;
    condolenceCount: number;
  };
}

// Union type for all events
export type Event = WeddingEvent | FuneralEvent;

// User Account
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  subscription: {
    plan: 'free' | 'premium';
    expiresAt?: string;
  };
  events: string[]; // Event IDs
  createdAt: string;
  lastLoginAt: string;
}

// Service Configuration
export interface ServiceConfig {
  name: string;
  description: string;
  features: string[];
  pricing: {
    free: {
      features: string[];
      limitations: string[];
    };
    premium: {
      price: number;
      features: string[];
      duration: string;
    };
  };
}