import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/** @type {import('./$types').Actions} */
export const actions = {
  password: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, schema);
    // Convenient validation check:
    if (!form.valid) {
      // Again, always return { form } and things will just work.
      return fail(400, { form });
    }

    var email = form.data.email
    var password = form.data.password
    // TODO: Do something with the validated data
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      console.log('Server error. Try again later.')
      return message(form, error.message, {
        status: error.status
      });
    }
    console.log(data)
    throw redirect(300, "/backend")
  },
  reset: async ({ request, locals: { supabase } }) => {
    let form = await request.formData();
    const email = form.get(email)
    const { data, error } = await supabase.auth.resetPasswordForEmail({ email })
    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        console.log(error.message)
      }
      return { error: true, message: error.message}
    }
    return { error: false, message: "Operazione completata con successo!"}
  }
};
