import { redirect } from '@sveltejs/kit';

/** @type {import('./$types')} */
export const load = async ({ params, parent }) => {
    const { supabase, session } = await parent();
    if (!session) {
        throw redirect(303, '/');
    }
    const { data, error } = await supabase.from("sites").select("*").eq("id", params.sito)
    if (error || data.length == 0) {
        console.log("Non esiste il sito, addio")
    }

    //lingua
    var races_available = []
    const { data: races_site, error: res } = await supabase.from("race_site").select("*, sites(id)").eq("sites.id", data[0]["id"])
    for (var i = 0; i < races_site.length; i++) {
        if (races_site[i]["sites"] != null) {
            const { data: races, error: res } = await supabase.from("races").select("*").eq("id", races_site[i]["id_race"])
            for (var j = 0; j < races.length; j++) {
                races_available.push({
                    id: races[j]["id"],
                    name: races[j]["name"],
                })
            }
        }
    }
    let { data: languages, error_l } = await supabase
        .from('language')
        .select('*')

    return {
        username: params.sito,
        user: session.user,
        content: {
            races_available: races_available,
            languages: languages
        }
    };
};