export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      projects: {
        Row: {
          createdAt: string
          description: string | null
          icon: string | null
          id: string
          isArchived: boolean
          theme: string | null
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          icon?: string | null
          id?: string
          isArchived?: boolean
          theme?: string | null
          title: string
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          icon?: string | null
          id?: string
          isArchived?: boolean
          theme?: string | null
          title?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          createdAt: string
          endedAt: string | null
          id: string
          intendedDuration: number
          interruptionCount: number
          lastPausedAt: string | null
          projectId: string | null
          startedAt: string | null
          status: Database["public"]["Enums"]["sessionStatus"]
          totalPausedDuration: number
          type: Database["public"]["Enums"]["sessionType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          endedAt?: string | null
          id?: string
          intendedDuration: number
          interruptionCount?: number
          lastPausedAt?: string | null
          projectId?: string | null
          startedAt?: string | null
          status?: Database["public"]["Enums"]["sessionStatus"]
          totalPausedDuration?: number
          type?: Database["public"]["Enums"]["sessionType"]
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          endedAt?: string | null
          id?: string
          intendedDuration?: number
          interruptionCount?: number
          lastPausedAt?: string | null
          projectId?: string | null
          startedAt?: string | null
          status?: Database["public"]["Enums"]["sessionStatus"]
          totalPausedDuration?: number
          type?: Database["public"]["Enums"]["sessionType"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          autoStartBreak: boolean
          autoStartPomo: boolean
          createdAt: string
          dailyGoal: number | null
          longBreakDuration: number
          longBreakInterval: number
          notificationsEnabled: boolean
          pomoDuration: number
          sessionEndedReminder: number
          shortBreakDuration: number
          timeLeftReminder: number
          updatedAt: string
          userId: string
        }
        Insert: {
          autoStartBreak?: boolean
          autoStartPomo?: boolean
          createdAt?: string
          dailyGoal?: number | null
          longBreakDuration?: number
          longBreakInterval?: number
          notificationsEnabled?: boolean
          pomoDuration?: number
          sessionEndedReminder?: number
          shortBreakDuration?: number
          timeLeftReminder?: number
          updatedAt?: string
          userId: string
        }
        Update: {
          autoStartBreak?: boolean
          autoStartPomo?: boolean
          createdAt?: string
          dailyGoal?: number | null
          longBreakDuration?: number
          longBreakInterval?: number
          notificationsEnabled?: boolean
          pomoDuration?: number
          sessionEndedReminder?: number
          shortBreakDuration?: number
          timeLeftReminder?: number
          updatedAt?: string
          userId?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          completed: boolean
          createdAt: string
          id: string
          projectId: string | null
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          completed?: boolean
          createdAt?: string
          id?: string
          projectId?: string | null
          title: string
          updatedAt?: string
          userId: string
        }
        Update: {
          completed?: boolean
          createdAt?: string
          id?: string
          projectId?: string | null
          title?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      widgets: {
        Row: {
          createdAt: string
          note: string | null
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          note?: string | null
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          note?: string | null
          updatedAt?: string
          userId?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      dashboard: { Args: { project_id: string }; Returns: Json }
    }
    Enums: {
      sessionStatus: "IDLE" | "PAUSED" | "COMPLETED" | "RUNNING"
      sessionType: "FOCUS" | "SHORTBREAK" | "LONGBREAK"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      sessionStatus: ["IDLE", "PAUSED", "COMPLETED", "RUNNING"],
      sessionType: ["FOCUS", "SHORTBREAK", "LONGBREAK"],
    },
  },
} as const

