-- Extends get_partner_profile() to include a detailed "taken_history" list (one entry
-- per completed mock the target took, with case name, date, interviewer, ratings, and
-- full feedback text) so a partner's profile page can render an expandable case list,
-- not just aggregate stats. Gated behind share_past_feedback, same as the existing
-- recent_feedback_excerpts field. Reads the base `cases`/`profiles` tables directly --
-- safe here because this is a SECURITY DEFINER function, not a broadly-grantable view.
create or replace function public.get_partner_profile(p_target_user_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_viewer uuid := auth.uid();
  v_privacy public.privacy_settings;
  v_profile public.skill_profile;
  v_result jsonb;
  v_taken_history jsonb;
begin
  if not exists (
    select 1 from public.mock_sessions ms
    where ms.interviewer_id = v_viewer
      and ms.interviewee_id = p_target_user_id
  ) then
    return null;
  end if;

  select * into v_privacy from public.privacy_settings where user_id = p_target_user_id;
  select * into v_profile from public.skill_profile where user_id = p_target_user_id;

  v_result := jsonb_build_object('user_id', p_target_user_id);

  if v_privacy.share_full_history then
    v_result := v_result || jsonb_build_object(
      'total_cases', v_profile.total_cases,
      'cases_this_month', v_profile.cases_this_month,
      'avg_length_minutes', v_profile.avg_length_minutes,
      'distinct_books_used', v_profile.distinct_books_used,
      'case_types_practiced', v_profile.case_types_practiced,
      'source_books_used', v_profile.source_books_used
    );
  end if;

  if v_privacy.share_weak_areas then
    v_result := v_result || jsonb_build_object('skill_averages', v_profile.skill_averages);
  end if;

  if v_privacy.share_past_feedback then
    select jsonb_agg(jsonb_build_object(
      'feedback_id', f.id,
      'session_id', f.mock_session_id,
      'case_name', coalesce(c.name, 'Mock session'),
      'partner_name', p.full_name,
      'date', ms.scheduled_at,
      'skill_ratings', f.skill_ratings,
      'recap_text', f.recap_text,
      'went_well', f.went_well,
      'improve', f.improve,
      'practice_next', f.practice_next
    ) order by ms.scheduled_at desc)
    into v_taken_history
    from public.feedback f
    join public.mock_sessions ms on ms.id = f.mock_session_id
    left join public.cases c on c.id = ms.assigned_case_id
    left join public.profiles p on p.id = ms.interviewer_id
    where f.subject_id = p_target_user_id;

    v_result := v_result || jsonb_build_object(
      'recent_feedback_excerpts', v_profile.recent_feedback_excerpts,
      'taken_history', coalesce(v_taken_history, '[]'::jsonb)
    );
  end if;

  v_result := v_result || jsonb_build_object('allow_interviewer_notes_back', coalesce(v_privacy.allow_interviewer_notes_back, false));

  return v_result;
end;
$$;
