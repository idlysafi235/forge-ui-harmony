
import { supabase } from "@/integrations/supabase/client";
import { SessionService } from "./sessionService";

export type EventType = 'generate' | 'copy' | 'export' | 'visit_home' | 'visit_explore' | 'upload_image' | 'like' | 'share';

export interface AnalyticsEvent {
  eventType: EventType;
  paletteId?: string;
  metadata?: Record<string, any>;
}

export class AnalyticsService {
  static async trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const sessionId = await SessionService.initializeSession();
      
      await supabase.from('interactions').insert({
        session_id: sessionId,
        event_type: event.eventType,
        palette_id: event.paletteId || null,
        metadata: event.metadata || null
      });

      // Update session activity
      await SessionService.updateLastActive();
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  static async trackPaletteGeneration(paletteId?: string, metadata?: Record<string, any>): Promise<void> {
    await this.trackEvent({
      eventType: 'generate',
      paletteId,
      metadata
    });
  }

  static async trackCopy(paletteId?: string, colorValue?: string): Promise<void> {
    await this.trackEvent({
      eventType: 'copy',
      paletteId,
      metadata: { colorValue }
    });
  }

  static async trackExport(paletteId?: string, format?: string): Promise<void> {
    await this.trackEvent({
      eventType: 'export',
      paletteId,
      metadata: { format }
    });
  }

  static async trackPageVisit(page: 'home' | 'explore'): Promise<void> {
    await this.trackEvent({
      eventType: page === 'home' ? 'visit_home' : 'visit_explore'
    });
  }

  static async trackLike(paletteId: string): Promise<void> {
    await this.trackEvent({
      eventType: 'like',
      paletteId
    });
  }

  static async trackShare(paletteId: string, method?: string): Promise<void> {
    await this.trackEvent({
      eventType: 'share',
      paletteId,
      metadata: { method }
    });
  }
}
