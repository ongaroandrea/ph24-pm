import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').ParamMatcher */
export function match(param) {
    //controllo che il codice sia salvato nel database
    /*const response = await fetch('/api/add', {
        method: 'POST',
        body: JSON.stringify({
            qr_code: param
        }),
        headers: {
            'content-type': 'application/json'
        }
    });

    if(!response["error"]){
        let player_name = response["data"]["url"]
        redirect(301, "" + player_name)
        //return true;
    } else {
        return false
    }
    */

    
}