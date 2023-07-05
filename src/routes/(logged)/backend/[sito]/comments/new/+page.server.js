import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from "openai";
import { API_CHATGPT, COMPANY_CHATGPT } from '$env/static/private'

const schema = z.object({
    name_person: z.string().min(2),
    id_language: z.string(),
    position: z.string().min(2),
    id_race: z.string(),
    number_arrive: z.number().min(1),
    number_start: z.number().min(1)
});

const schemaConfirm = z.object({
    name_person: z.string(),
    id_language: z.string(),
    position: z.string(),
    id_race: z.string(),
    text_message: z.string().min(10)
});

/** @type {import('./$types').Actions} */
export const actions = {
    new: async ({ params, request, locals: { supabase } }) => {
        const form = await superValidate(request, schema, { id: "form1" });
        // Convenient validation check:
        if (!form.valid) {
            return fail(400, { form });
        }

        const number_arrive = form.data.number_arrive;
        const number_start = form.data.number_start;

        const id_language = form.data.id_language
        const id_race = form.data.id_race
        let id = params.sito

        const { data: sites, error } = await supabase.from("sites").select("*").eq("id", id)
        const { data: language, error_s } = await supabase.from("language").select("*").eq("id", id_language)
        const { data: race, error: er_race } = await supabase.from("races").select("*").eq("id", id_race)
        var response = await create(sites[0]["firstname"], sites[0]["surname"], number_arrive, number_start, language[0]["name"], race[0]["name"])
        return message(form, response)
    }
};

async function create(name, firstname, number_arrive, number_start, language, race_name) {
    const configuration = new Configuration({

        apiKey: API_CHATGPT,
    });

    const openai = new OpenAIApi(configuration);
    try{
        var response = await openai
            .createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "Crea un commento tecnico per la gara chiamata " + race_name + " per il pilota " + name + " " + number_start + "e arrivato in posizione " + number_arrive + "partito in posizione n." + number_arrive + ". Scrivilo in " + language }],
                max_tokens: 300
            })
        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content
    } catch (error) {
        // Handle different errors here
        return "Errore nella creazione";
      }  
}

export const load = async () => {

    const firstPart = await superValidate(schema);
    const secondPart = await superValidate(schemaConfirm);
    return {
        firstPart,
        secondPart
    }
}