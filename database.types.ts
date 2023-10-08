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
      channel_users: {
        Row: {
          channel_id: string
          user_id: string
        }
        Insert: {
          channel_id: string
          user_id: string
        }
        Update: {
          channel_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_users_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
      guild_users: {
        Row: {
          guild_id: string
          user_id: string
        }
        Insert: {
          guild_id: string
          user_id: string
        }
        Update: {
          guild_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guild_users_guild_id_fkey"
            columns: ["guild_id"]
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
