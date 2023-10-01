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
      messages: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string
          id: number
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      todo: {
        Row: {
          content: string | null
          created_at: string
          id: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
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
