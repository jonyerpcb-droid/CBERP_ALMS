import { createClient } from "@/lib/supabase/client";
import type { Holiday } from "@/types";

const supabase = createClient();

export const holidayService = {
  async getAll(year?: number) {
    let query = supabase.from("holidays").select("*").order("holiday_date");
    if (year) {
      query = query
        .gte("holiday_date", `${year}-01-01`)
        .lte("holiday_date", `${year}-12-31`);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Holiday[];
  },

  async create(holiday: { name: string; holiday_date: string }) {
    const { data, error } = await supabase
      .from("holidays")
      .insert(holiday)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id: string) {
    const { error } = await supabase.from("holidays").delete().eq("id", id);
    if (error) throw error;
  },
};