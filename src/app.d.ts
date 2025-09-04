import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/types/db";

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			safeGetSession(): Promise<{ session: Session | null, user?: Session["user"] | null }>
		}
		interface PageData {
			session: Session | null
		}
	}
}