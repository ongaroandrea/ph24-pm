
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"; // ES Modules
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { redirect } from "@sveltejs/kit";
import axios from 'axios';
import { s3Client } from "$lib/Aws/aws";
import { S3_BUCKET_THUMB, SITE_URL, THIS_SITE_URL, S3_BUCKET_OVERLAY, CHIAVE_UTENTE, UTENTE_NASCOSTO } from '$env/static/private'
const config = {
    params: {
        consumer_key: CHIAVE_UTENTE,
        consumer_secret: UTENTE_NASCOSTO
    }
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals: { supabase } }) {

    let username = params.username
    const { data, error } = await supabase.from("sites").select("*").eq("url", username)
    const id_site = data[0]["id"]

    if (id_site == undefined) throw redirect(301, SITE_URL)
    const { data: races_site, error: res } = await supabase.from("race_site").select("*, sites(id)").eq("sites.id", id_site)
    var status = await checkStatus(data[0]["date_limit"], data[0]["id_subscription"])

    var races_array = []
    for (var i = 0; i < races_site.length; i++) {
        if (races_site[i]["sites"] != null) {
            const { data: races, error: res } = await supabase.from("races").select("*").eq("id", races_site[i]["id_race"])
            for (var j = 0; j < races.length; j++) {
                races_array.push({
                    name: races[j]["name"],
                    images: await get_images(data[0]["url"], races[j]["url"], status),
                    photo: races[j]["image_url"],
                    url: THIS_SITE_URL + username + "/races/" + races[j]["url"],
                })
            }
        }
    }

    var codes = [2142, 2211]
    for (i = 0; i < codes.length; i++) {
        let url = SITE_URL + "wp-json/custom/v1/variations?isbn_field=#" + data[0]["id"]
        var helmet_pers = []
        try {
            await axios.get(url, config).then(response => {
                var data = response.data

                data.forEach(variation => {

                    helmet_pers.push({
                        "id": variation["id"],
                        "permalink": variation["permalink"],
                        "image": variation["image"]
                    })
                });
            });
        } catch (error) {
            console.log(error)
        }
    }

    return {
        username,
        status: status,
        races: races_array,
        helmet_pers: helmet_pers,
        first_color_palette: data[0]["first_color_palette"],
        second_color_palette: data[0]["second_color_palette"],
        primary_text_palette: data[0]["primary_text_palette"],
        second_text_palette: data[0]["second_text_palette"],
    }
}


async function get_images(url, race, status) {
    var arrayLinks = []
    var path = url + '/' + race + "/"
    const command = new ListObjectsV2Command({
        Bucket: status ? S3_BUCKET_THUMB : S3_BUCKET_OVERLAY,
        MaxKeys: 4, Prefix: path, Delimiter: "/"
    });
    try {
        const { Contents, _, _2 } = await s3Client.send(command);

        if (Contents != undefined) {
            for (var j = 0; j < Contents.length; j++) {
                if (Contents[j].Size != 0) {
                    const command = new GetObjectCommand({
                        Bucket: S3_BUCKET_THUMB,
                        Key: Contents[j].Key
                    });
                    arrayLinks.push(await getSignedUrl(s3Client, command, { expiresIn: 360000 }));
                }
            }
        }
    } catch (err) {
        console.error(err);
    }


    return arrayLinks;
}

async function checkStatus(date, id_sub) {
    let timestamp = Date.parse(date);
    if (!isNaN(timestamp)) {
        return true
    } else {
        let url = SITE_URL + "wp-json/wc-sumosubs/v1/subscriptions/" + id_sub
        try {
            const response = await axios.get(url, config);
            return response.data["subscription_status"] == "Active"
        } catch (error) {
            console.log(error)
        }
    }
    return false;
}
