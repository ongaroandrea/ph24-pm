import { locale } from 'svelte-i18n'
import { redirect } from '@sveltejs/kit'
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals: { supabase } }) {
    const start = Date.now();
    let username = params.username
    console.log(username)
    const { data, error } = await supabase.from("sites").select("*").eq("url", username)
    if(error || data == null){
        console.log(error.message)
        console.log("fata")
    }

    let { data: sponsor, _ } = await supabase
        .storage
        .from('sponsor')
        .list(data[0]["id"], { limit: 10 })

    let array_sponsor = []
    for (var i = 0; i < sponsor.length; i++) {
        if (sponsor[i]["metadata"]["size"] != 0) {
            const { data: public_url, _ } = await supabase.storage.from('sponsor').getPublicUrl(data[0]["id"] + "/" + sponsor[i].name)
            array_sponsor.push({
                id: sponsor[i].id,
                name: sponsor[i].name,
                url: public_url.publicUrl,
            })
        }
    }

    var id_language = ""
    locale.subscribe((value) => {
        var language = value.split("-")[0]
        id_language = check_language(language)
    })

    const end = Date.now();
    const id_site = data[0]["id"]

    if (id_site == undefined) throw redirect(301, "https://ph24.it")
    const { data: races_site, error: resss } = await supabase.from("race_site").select("*, sites(id)").eq("sites.id", id_site)
   
    //.order('created_at', { ascending: true })
    var races_array = []
    for (var i = 0; i < races_site.length && i < 4; i++) {
        if(races_site[i]["sites"] != null){
            const { data: races, error: res } = await supabase.from("races").select("*").eq("id", races_site[i]["id_race"])
            for (var j = 0; j < races.length; j++) {
                races_array.push({
                    name: races[j]["name"],
                    url: username + "/races/" + races[j]["url"],
                    photo: races[j]["image_url"]
                })
            }
        }
    }
    let flags = ''
    if (data[0]["country"] != null && data[0]["country"] != "") {
        var link_flag = "https://restcountries.com/v3.1/alpha/" + data[0]["country"]
        var response_link = await fetch(link_flag)
        flags = await response_link.json()
        flags = {
            name: flags[0]["name"]["common"],
            flag: flags[0]["flag"]
        };
    }

    //ottengo l'immagine della prima gara del primo round
    locale.subscribe((value) => {
        var language = value.split("-")[0]
        id_language = check_language(language)
    })
    var comments = []
    if (races_site.length >= 1) {
        const { data: comm, error: res } = await supabase.from("text").select("*").eq("id_site", data[0]["id"]).eq("id_language", id_language).eq("id_race", races_site[0]["id_race"])
        comments = comm;
    }


    const { data: contacts, error: resa } = await supabase.from("contact_info").select("*").eq("id_site", data[0]["id"])

    const { data: image, sw } = await supabase.storage.from('avatars').getPublicUrl(data[0]["id"] + "/" + data[0]["image"] + ".webp")
    const { data: imagedesk, sw2 } = await supabase.storage.from('avatars').getPublicUrl(data[0]["id"] + "/" + data[0]["image"] + "_mobile.webp")

    let { data: championship, _22 } = await supabase
        .storage
        .from('championship')
        .list(data[0]["id"], { limit: 10 })

    let array_championship = []
    for (i = 0; i < championship.length; i++) {
        if (championship[i]["metadata"]["size"] != 0) {
            const { data: public_url, _ } = await supabase.storage.from('championship').getPublicUrl(data[0]["id"] + "/" + championship[i].name)
            array_championship.push({
                id: championship[i].id,
                name: championship[i].name,
                url: public_url.publicUrl,
            })
        }
    }

    const { data: description, error: no } = await supabase.from("description").select("*").eq("id_site", data[0]["id"])
    var language_description = "";
    description.forEach(element => {
        if (element["id_language"] == id_language) {
            language_description = element["text"]
            return
        }
    });
    return {
        username,
        name: data[0]["name"],
        firstname: data[0]["firstname"],
        surname: data[0]["surname"],
        born: data[0]["date_birth"],
        custom_text: data[0]["custom_text"],
        height: data[0]["height"],
        instagram: data[0]["instagram"],
        facebook: data[0]["facebook"],
        twitter: data[0]["twitter"],
        team: data[0]["team"],
        sponsor: array_sponsor,
        first_color_palette: data[0]["first_color_palette"],
        second_color_palette: data[0]["second_color_palette"],
        primary_text_palette: data[0]["primary_text_palette"],
        second_text_palette: data[0]["second_text_palette"],
        language: id_language,
        image: image.publicUrl,
        image_mobile: imagedesk.publicUrl,
        nationality: flags,
        about: language_description,
        championship: array_championship,
        races: races_array,
        comments: comments,
        contacts: contacts
    }
}

function check_language(language) {
    if (language == 'de') return "6f21ec21-b5f5-497f-97e5-bbdbc6f88445"
    else if (language == 'it') return "b1fff836-fa69-4e6f-90ab-bdf4e2aff9a6"
    else if (language == 'es') return "56854580-49a5-4199-8b46-18043ba50396"
    else if (language == 'fr') return "62395206-9d66-4b29-8311-76a7f9211134"
    else return "8676cfe4-745a-4488-9a5d-dbdbb31d82e8"
}