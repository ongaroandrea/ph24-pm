/** @type {import('./$types').ParamMatcher */
export async function match(param) {
    //controllo che il nomee sia stato salvato nel database

    /*const response = await fetch('/api/add', {
        method: 'GET',
        body: JSON.stringify({
            race_game: param
        }),
        headers: {
            'content-type': 'application/json'
        }
    });

    if(!response["error"]) {
        let id_subscription = response["data"]["id_subscription"]
        const response_subscription = await fetch('site_woocommerce', {
            method: 'GET',
            body: JSON.stringify({
                id_subscription
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        if(response_subscription)
    }
    return response["error"]
    */
    return true;
}