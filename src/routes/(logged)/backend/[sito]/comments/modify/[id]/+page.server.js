import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
const schema = z.object({
    text_message: z.string().min(10),
    name_person: z.string().min(5),
    id_language: z.string(),
    position: z.string().min(5),
    id_race: z.string(),
});

/** @type {import('./$types').Actions} */
export const actions = {
    update: async ({ params, request, locals: { supabase } }) => {

        const form = await superValidate(request, schema);
        console.log('POST', form);
        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }

        var text_message = form.data.text_message
        var name_person = form.data.name_person
        var id_language = form.data.id_language
        var position = form.data.position
        var id_race = form.data.id_race
        const { data, error } = await supabase
            .from('text')
            .update({ text: text_message, name_person: name_person, position_person: position, id_language: id_language, id_site: id_race })
            .eq('id', params.id)
        if (error) {
            return message(form, error.message, {
                status: 500
            })
        }
        return message(form, 'Comment updated')
    }
};