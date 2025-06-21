
import { supabase } from "@/integrations/supabase/client";

export interface SessionData {
  sessionId: string;
  startedAt: string;
  lastActiveAt: string;
  userAgent?: string;
  referrer?: string;
  deviceType?: string;
}

export class SessionService {
  private static SESSION_KEY = 'colorcraft_session';
  private static sessionId: string | null = null;

  static getDeviceType(): string {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  static generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  static async initializeSession(): Promise<string> {
    if (this.sessionId) return this.sessionId;

    // Check if session exists in localStorage
    const stored = localStorage.getItem(this.SESSION_KEY);
    if (stored) {
      try {
        const sessionData: SessionData = JSON.parse(stored);
        this.sessionId = sessionData.sessionId;
        
        // Update last active time
        await this.updateLastActive();
        return this.sessionId;
      } catch (error) {
        console.error('Error parsing stored session:', error);
      }
    }

    // Create new session
    this.sessionId = this.generateSessionId();
    const sessionData: SessionData = {
      sessionId: this.sessionId,
      startedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined,
      deviceType: this.getDeviceType()
    };

    // Store in localStorage
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));

    // Store in Supabase
    try {
      await supabase.from('sessions').insert({
        session_id: this.sessionId,
        user_agent: sessionData.userAgent,
        referrer: sessionData.referrer,
        device_type: sessionData.deviceType
      });
    } catch (error) {
      console.error('Error storing session in database:', error);
    }

    return this.sessionId;
  }

  static async updateLastActive(): Promise<void> {
    if (!this.sessionId) return;

    const now = new Date().toISOString();
    
    // Update localStorage
    const stored = localStorage.getItem(this.SESSION_KEY);
    if (stored) {
      try {
        const sessionData: SessionData = JSON.parse(stored);
        sessionData.lastActiveAt = now;
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
      } catch (error) {
        console.error('Error updating localStorage session:', error);
      }
    }

    // Update database
    try {
      await supabase
        .from('sessions')
        .update({ last_active_at: now })
        .eq('session_id', this.sessionId);
    } catch (error) {
      console.error('Error updating session in database:', error);
    }
  }

  static getSessionId(): string | null {
    return this.sessionId;
  }
}
