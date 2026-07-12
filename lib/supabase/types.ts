// Hand-written to match supabase/migrations/0001_init.sql.
// Once the project is linked (`supabase link`), regenerate the source of truth with:
//   npx supabase gen types typescript --linked > lib/supabase/types.ts
// and re-apply any manual jsonb typing tweaks below.

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface CaseStep {
  order: number;
  text: string;
}

export interface BarListExhibitData {
  rows: { label: string; pct: number }[];
}

export interface TableExhibitData {
  columns: string[];
  rows: string[][];
}

export type ExhibitData = BarListExhibitData | TableExhibitData;

export interface SkillRatings {
  clarifying_questions?: string;
  structure?: string;
  math?: string;
  exhibit_interpretation?: string;
  business_judgment?: string;
  communication?: string;
  recommendation?: string;
  [key: string]: string | undefined;
}

export type CaseType = "Profitability" | "Market entry" | "Pricing" | "Operations" | "Growth" | "M&A";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type SourceBook = "Kellogg" | "Cornell" | "UVA Darden" | "Ross" | "Wharton" | "Booth" | "Tuck";
export type SessionFormat = "45_full" | "30_short" | "60_case_feedback";
export type SessionStatus = "pending_invite" | "confirmed" | "case_selected" | "completed" | "declined";
// Index into a case's live step list (prompt + Q&A pages), or null when nothing
// is on the candidate's screen. See supabase/migrations/0007_live_mock_redesign.sql.
export type Presented = number | null;
export type InviteStatus = "pending" | "accepted" | "declined" | "reschedule_requested";
export type ProposedRole = "interviewer" | "interviewee";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          initials: string;
          year_tag: string | null;
          email: string;
          avatar_color: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string; full_name: string; email: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      cases: {
        Row: {
          id: string;
          name: string;
          case_type: CaseType;
          difficulty: Difficulty;
          source_book: SourceBook;
          industry: string | null;
          tags: string[];
          synopsis: string;
          full_prompt: string;
          case_steps: CaseStep[];
          answer_notes: string | null;
          doc_interviewer_guide: string | null;
          doc_candidate_prompt: string | null;
          doc_background: string | null;
          doc_framework_guidance: string | null;
          doc_math_walkthrough: string | null;
          doc_sample_recommendation: string | null;
          is_seed: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["cases"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["cases"]["Row"]>;
      };
      case_exhibits: {
        Row: {
          id: string;
          case_id: string;
          position: number;
          title: string;
          kind: "bar_list" | "table";
          data: ExhibitData;
        };
        Insert: Partial<Database["public"]["Tables"]["case_exhibits"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["case_exhibits"]["Row"]>;
      };
      mock_sessions: {
        Row: {
          id: string;
          interviewer_id: string;
          interviewee_id: string;
          scheduled_at: string;
          format: SessionFormat;
          meeting_link: string | null;
          notes: string | null;
          status: SessionStatus;
          assigned_case_id: string | null;
          synopsis_shared_to_interviewee: string | null;
          synopsis_shared_live: boolean;
          presented: Presented;
          presented_updated_at: string | null;
          timer_started_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["mock_sessions"]["Row"]> & {
          interviewer_id: string;
          interviewee_id: string;
          scheduled_at: string;
          format: SessionFormat;
        };
        Update: Partial<Database["public"]["Tables"]["mock_sessions"]["Row"]>;
      };
      session_invites: {
        Row: {
          id: string;
          mock_session_id: string;
          requested_by: string;
          requested_of: string;
          proposed_role: ProposedRole;
          status: InviteStatus;
          created_at: string;
          responded_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["session_invites"]["Row"]> & {
          mock_session_id: string;
          requested_by: string;
          requested_of: string;
          proposed_role: ProposedRole;
        };
        Update: Partial<Database["public"]["Tables"]["session_invites"]["Row"]>;
      };
      prepped_cases: {
        Row: { user_id: string; case_id: string; prepped: boolean; updated_at: string };
        Insert: Partial<Database["public"]["Tables"]["prepped_cases"]["Row"]> & { user_id: string; case_id: string };
        Update: Partial<Database["public"]["Tables"]["prepped_cases"]["Row"]>;
      };
      saved_cases: {
        Row: { user_id: string; case_id: string; saved: boolean; updated_at: string };
        Insert: Partial<Database["public"]["Tables"]["saved_cases"]["Row"]> & { user_id: string; case_id: string };
        Update: Partial<Database["public"]["Tables"]["saved_cases"]["Row"]>;
      };
      session_private_notes: {
        Row: { mock_session_id: string; author_id: string; notes: string; updated_at: string };
        Insert: Partial<Database["public"]["Tables"]["session_private_notes"]["Row"]> & {
          mock_session_id: string;
          author_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["session_private_notes"]["Row"]>;
      };
      feedback: {
        Row: {
          id: string;
          mock_session_id: string;
          author_id: string;
          subject_id: string;
          recap_text: string | null;
          skill_ratings: SkillRatings;
          went_well: string | null;
          improve: string | null;
          practice_next: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["feedback"]["Row"]> & {
          mock_session_id: string;
          author_id: string;
          subject_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["feedback"]["Row"]>;
      };
      privacy_settings: {
        Row: {
          user_id: string;
          share_full_history: boolean;
          share_past_feedback: boolean;
          share_weak_areas: boolean;
          allow_interviewer_notes_back: boolean;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["privacy_settings"]["Row"]> & { user_id: string };
        Update: Partial<Database["public"]["Tables"]["privacy_settings"]["Row"]>;
      };
    };
    Views: {
      cases_public: {
        Row: Omit<Database["public"]["Tables"]["cases"]["Row"], "answer_notes" | "doc_interviewer_guide">;
      };
      skill_profile: {
        Row: {
          user_id: string;
          total_cases: number;
          cases_this_month: number;
          avg_length_minutes: number | null;
          distinct_books_used: number;
          skill_averages: Record<string, number> | null;
          case_types_practiced: Record<string, number> | null;
          source_books_used: Record<string, number> | null;
          recent_feedback_excerpts: { went_well: string | null; improve: string | null }[] | null;
        };
      };
    };
    Functions: {
      get_case_answer_notes: {
        Args: { p_case_id: string; p_session_id: string };
        Returns: { answer_notes: string | null; doc_interviewer_guide: string | null }[];
      };
      get_my_skill_profile: {
        Args: Record<string, never>;
        Returns: Database["public"]["Views"]["skill_profile"]["Row"][];
      };
      get_partner_profile: {
        Args: { p_target_user_id: string };
        Returns: Json;
      };
    };
  };
}
