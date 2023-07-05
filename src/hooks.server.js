// src/hooks.server.ts
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
} from '$env/static/public';
import { THIS_SITE_URL } from '$env/static/private'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { locale } from 'svelte-i18n'
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Handle} */
export const handle = async ({ event, resolve }) => {

  /**i18n PART */
  const lang = event.request.headers.get('accept-language')?.split(',')[0]
  if (lang) {
    locale.set(lang)
  }

  /**SUPABASE PART */
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event
  });

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  };
  var data = await event.locals.supabase.auth.getSession()
  if (event.url.pathname.startsWith("/login") && data["data"]["session"] != null) {
    throw redirect(301, THIS_SITE_URL + "/backend")
  }
  if (event.url.pathname.includes("/backend") && data["data"]["session"] == null) {
    throw redirect(301, THIS_SITE_URL + "/login")
  }

  return resolve(event, {
    /**
     * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
     *
     * https://github.com/sveltejs/kit/issues/8061
     */
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    }
  });

};


