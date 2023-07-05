import { redirect } from '@sveltejs/kit'
import { THIS_SITE_URL } from '$env/static/private'
/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, url }) {
    const ref = url.searchParams.get('id_site')
    console.log(ref) 
    const { data, error_ } = await supabase.from("sites").select("*").eq("id", ref)
    if (error_ || data == null || data.length == 0) {
        console.log("Non esiste")
        throw redirect(301, "https://ph24.it" )
    } else {
        console.log("esiste")
        throw redirect(301, THIS_SITE_URL + "/" + data[0]["url"])
    }
    
}