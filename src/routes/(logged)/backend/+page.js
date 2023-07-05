import { redirect } from '@sveltejs/kit';

/** @type {import('./$types')} */
export const load = async ({ parent }) => {
    const { supabase, session } = await parent();
    //lingua
    let { data: properties, error_l } = await supabase
        .from('property')
        .select('id_sites, id_user, sites (id, url)')
        .eq('id_user', session.user.id)
    
    return {
        user: session.user,
        content: {
            properties: properties
        }
    };
};