export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      channels: {
        Row: {
          created_at: string
          guild_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          guild_id: string
          id?: string
          name?: string
        }
        Update: {
          created_at?: string
          guild_id?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      guilds: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          author_id: string
          channel_id: string
          content: string
          created_at: string
          id: number
        }
        Insert: {
          author_id?: string
          channel_id: string
          content?: string
          created_at?: string
          id?: number
        }
        Update: {
          author_id?: string
          channel_id?: string
          content?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
