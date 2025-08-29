import type { UserEvent } from '../types';

const EVENTS_KEY = 'wedding_events';

export class EventService {
  private static getStoredEvents(): UserEvent[] {
    const stored = localStorage.getItem(EVENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private static saveEvents(events: UserEvent[]): void {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private static generateUrl(type: string, title: string): string {
    const timestamp = Date.now().toString(36);
    const sanitized = title.toLowerCase()
      .replace(/[^a-z0-9가-힣]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 20);
    return `${type}-${sanitized}-${timestamp}`;
  }

  static async createEvent(userId: string, eventData: Partial<UserEvent>): Promise<UserEvent> {
    const events = this.getStoredEvents();
    
    const newEvent: UserEvent = {
      id: this.generateId(),
      userId,
      type: eventData.type || 'wedding',
      title: eventData.title || '',
      date: eventData.date || '',
      url: eventData.url || this.generateUrl(eventData.type || 'wedding', eventData.title || ''),
      views: 0,
      status: eventData.status || 'draft',
      data: eventData.data || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    events.push(newEvent);
    this.saveEvents(events);
    
    return newEvent;
  }

  static async getUserEvents(userId: string): Promise<UserEvent[]> {
    const events = this.getStoredEvents();
    return events.filter(e => e.userId === userId);
  }

  static async getEventById(eventId: string): Promise<UserEvent | null> {
    const events = this.getStoredEvents();
    return events.find(e => e.id === eventId) || null;
  }

  static async getEventByUrl(url: string): Promise<UserEvent | null> {
    const events = this.getStoredEvents();
    return events.find(e => e.url === url) || null;
  }

  static async updateEvent(eventId: string, updates: Partial<UserEvent>): Promise<UserEvent> {
    const events = this.getStoredEvents();
    const eventIndex = events.findIndex(e => e.id === eventId);

    if (eventIndex === -1) {
      throw new Error('이벤트를 찾을 수 없습니다.');
    }

    const updatedEvent = {
      ...events[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    events[eventIndex] = updatedEvent;
    this.saveEvents(events);
    
    return updatedEvent;
  }

  static async deleteEvent(eventId: string): Promise<void> {
    const events = this.getStoredEvents();
    const filtered = events.filter(e => e.id !== eventId);
    this.saveEvents(filtered);
  }

  static async incrementViews(eventId: string): Promise<void> {
    const events = this.getStoredEvents();
    const eventIndex = events.findIndex(e => e.id === eventId);

    if (eventIndex !== -1) {
      events[eventIndex].views++;
      this.saveEvents(events);
    }
  }

  static async checkUserOwnsEvent(userId: string, eventId: string): Promise<boolean> {
    const event = await this.getEventById(eventId);
    return event ? event.userId === userId : false;
  }
}