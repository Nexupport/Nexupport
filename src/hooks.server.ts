import type { Handle } from "@sveltejs/kit";
import { createServerClient } from "@supabase/ssr";
import { env as ENV } from "$env/dynamic/public"
import type { Database } from "$lib/types/db";

export const handle: Handle = async ({ resolve, event }) => {
  event.locals.supabase = createServerClient<Database>(ENV.PUBLIC_SUPABASE_URL, ENV.PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: event.cookies.getAll,
      setAll: cookies => {
        cookies.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      }
    }
  })

  event.locals.safeGetSession = async () => {
    const { data: { user }, error } = await event.locals.supabase.auth.getUser()
    if (error) return { session: null, user: null }

    const { data: { session } } = await event.locals.supabase.auth.getSession()
    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range" || name === "x-supabase-api-version"
    }
  })
}