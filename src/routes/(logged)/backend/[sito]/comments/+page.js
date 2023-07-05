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

    var races_array = []
    const { data: races, error: re } = await supabase.from("races").select("*").order('created_at', { ascending: true })
    for (var i = 0; i < races.length; i++) {
        const { data: round, error: ress } = await supabase.from("round_site").select("*, round(id, name, url, id_race)").eq("id_sites", params.sito).eq("round.id_race", races[i]["id"])
        var first = false
        for (var j = 0; j < round.length; j++) {
            if (round[j]["round"] != null && !first) {
                races_array.push({
                    id: round[i].round.id_race
                })
                first = true;
            }
        }
    }
    console.log(races_array)
    let array = []
    for (i = 0; i < races_array.length; i++) {
        //  console.log(races_array[i]["id"])
        let { data: comments, error_l } = await supabase
            .from('text')
            .select('id, text, language (id, name)')
            .eq('id_race', races_array[i]["id"])
        var race_selected = {}
        for (var y = 0; y < races.length; y++) {
            if (races[y].id == races_array[i].id){
                race_selected = races[y]
            }
        }
        if (comments != null) {
            let property = {
                race: race_selected,
                comments: comments
            }
            array.push(property)
        }
    };
    //console.log(array)
    return {
        username: params.sito,
        user: session.user,
        content: {
            races: array
        }
    };
};