export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      explore_items: {
        Row: {
          category: string
          featured_at: string
          id: string
          palette_id: string
          sort_order: number | null
        }
        Insert: {
          category: string
          featured_at?: string
          id?: string
          palette_id: string
          sort_order?: number | null
        }
        Update: {
          category?: string
          featured_at?: string
          id?: string
          palette_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "explore_items_palette_id_fkey"
            columns: ["palette_id"]
            isOneToOne: false
            referencedRelation: "palettes"
            referencedColumns: ["id"]
          },
        ]
      }
      interactions: {
        Row: {
          event_type: string
          id: string
          metadata: Json | null
          palette_id: string | null
          session_id: string
          timestamp: string
        }
        Insert: {
          event_type: string
          id?: string
          metadata?: Json | null
          palette_id?: string | null
          session_id: string
          timestamp?: string
        }
        Update: {
          event_type?: string
          id?: string
          metadata?: Json | null
          palette_id?: string | null
          session_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_palette_id_fkey"
            columns: ["palette_id"]
            isOneToOne: false
            referencedRelation: "palettes"
            referencedColumns: ["id"]
          },
        ]
      }
      palettes: {
        Row: {
          colors: Json
          copied_count: number | null
          created_at: string
          exported_count: number | null
          id: string
          is_public: boolean
          likes: number
          name: string
          source_image_url: string | null
          source_type: string | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          colors: Json
          copied_count?: number | null
          created_at?: string
          exported_count?: number | null
          id?: string
          is_public?: boolean
          likes?: number
          name?: string
          source_image_url?: string | null
          source_type?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          colors?: Json
          copied_count?: number | null
          created_at?: string
          exported_count?: number | null
          id?: string
          is_public?: boolean
          likes?: number
          name?: string
          source_image_url?: string | null
          source_type?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          device_type: string | null
          id: string
          ip_address: unknown | null
          last_active_at: string
          referrer: string | null
          session_id: string
          started_at: string
          user_agent: string | null
        }
        Insert: {
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          last_active_at?: string
          referrer?: string | null
          session_id: string
          started_at?: string
          user_agent?: string | null
        }
        Update: {
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          last_active_at?: string
          referrer?: string | null
          session_id?: string
          started_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
