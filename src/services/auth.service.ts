import { supabase } from "@/lib/supabase/client";

export const authService = {
  // 1. Common login function (handles the actual logic)
  async login(email: string, password?: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password || "",
    });
    
    if (error) {
      console.error("Login error:", error.message);
      throw error;
    }
    return data;
  },

  // 2. Alias: signIn (points to login)
  async signIn(email: string, password?: string) {
    return this.login(email, password);
  },

  // 3. Common logout function
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 4. Alias: signOut (points to logout)
  async signOut() {
    return this.logout();
  },

  // 5. Get current session/user data
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
  }
};
