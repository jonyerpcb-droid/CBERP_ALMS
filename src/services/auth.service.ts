import { supabase } from "@/lib/supabase/client";

export const authService = {
  // ✅ Add this function:
  async getCurrentEmployee() {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return null;

    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        department:departments(*),
        designation:designations(*),
        roles:employee_roles(*)
      `)
      .eq('auth_user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async signOut() {
    return this.logout();
  }
};
