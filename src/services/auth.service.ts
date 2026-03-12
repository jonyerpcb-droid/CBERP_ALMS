import { createClient } from "@/lib/supabase/client";
import type { Employee, RoleType } from "@/types";

const supabase = createClient();

export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async forgotPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });
    if (error) throw error;
  },

  async resetPassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  },

  async getCurrentEmployee(): Promise<Employee | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("employees")
      .select(
        `*, department:departments(*), designation:designations(*), roles:employee_roles(*)`
      )
      .eq("auth_user_id", user.id)
      .single();

    return data;
  },

  async getCurrentRoles(): Promise<RoleType[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
      .from("employee_roles")
      .select("role, employees!inner(auth_user_id)")
      .eq("employees.auth_user_id", user.id);

    return data?.map((r: any) => r.role) || [];
  },
};