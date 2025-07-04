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
      Customers: {
        Row: {
          account: string
          firstname: string | null
          id: number
          lastname: string | null
          password: number | null
          phone: number | null
        }
        Insert: {
          account: string
          firstname?: string | null
          id?: number
          lastname?: string | null
          password?: number | null
          phone?: number | null
        }
        Update: {
          account?: string
          firstname?: string | null
          id?: number
          lastname?: string | null
          password?: number | null
          phone?: number | null
        }
        Relationships: []
      }
      product_details: {
        Row: {
          description: string | null
          id: number
          ingredients: string | null
          is_active: boolean
          model_3d_url: string | null
          model_position: Json | null
          model_rotation: Json | null
          model_scale: Json | null
          price: number
        }
        Insert: {
          description?: string | null
          id?: number
          ingredients?: string | null
          is_active?: boolean
          model_3d_url?: string | null
          model_position?: Json | null
          model_rotation?: Json | null
          model_scale?: Json | null
          price?: number
        }
        Update: {
          description?: string | null
          id?: number
          ingredients?: string | null
          is_active?: boolean
          model_3d_url?: string | null
          model_position?: Json | null
          model_rotation?: Json | null
          model_scale?: Json | null
          price?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          description: string | null
          has_variants: boolean | null
          id: number
          image_url: string | null
          name: string
          product_detail_id: number | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          has_variants?: boolean | null
          id?: number
          image_url?: string | null
          name: string
          product_detail_id?: number | null
        }
        Update: {
          category?: string | null
          description?: string | null
          has_variants?: boolean | null
          id?: number
          image_url?: string | null
          name?: string
          product_detail_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_product_detail_id_fkey"
            columns: ["product_detail_id"]
            isOneToOne: false
            referencedRelation: "product_details"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          id: number
          name: string
          product_detail_id: number | null
          product_id: number
        }
        Insert: {
          id?: number
          name: string
          product_detail_id?: number | null
          product_id: number
        }
        Update: {
          id?: number
          name?: string
          product_detail_id?: number | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "variants_product_detail_id_fkey"
            columns: ["product_detail_id"]
            isOneToOne: false
            referencedRelation: "product_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow: {
        Row: {
          id: number
          task_detail: string | null
          task_title: string | null
          time: string
        }
        Insert: {
          id?: number
          task_detail?: string | null
          task_title?: string | null
          time: string
        }
        Update: {
          id?: number
          task_detail?: string | null
          task_title?: string | null
          time?: string
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
