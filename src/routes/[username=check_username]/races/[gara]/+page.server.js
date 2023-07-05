import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"; // ES Modules
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from 'stream'
import axios from "axios";
import JSZip from 'jszip';
import { S3_BUCKET_THUMB, SITE_URL, S3_BUCKET_OVERLAY, S3_BUCKET, CHIAVE_UTENTE, UTENTE_NASCOSTO } from '$env/static/private'
import { redirect } from "@sveltejs/kit";
import { locale } from 'svelte-i18n'
import { s3Client } from "$lib/Aws/aws";
const config = {
    params: {
        consumer_key: CHIAVE_UTENTE,
        consumer_secret: UTENTE_NASCOSTO
    }
};
import Cryptr from 'cryptr';

const cryptr = new Cryptr('myTotallySecretKey');

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals: { supabase }, url }) {
    //Ottengo tutte le foto di questo round
    let user = params.username
    let race = params.gara
    console.log(user)
    const { data, error_ } = await supabase.from("sites").select("*").eq("url", user)
    if (data == null) {
        console.log("ERROR")
    }
    const { data: races_site, error: res } = await supabase.from("race_site").select("*, races(id, name, url, image_url)").eq("id_site", data[0]["id"]).eq("races.url", race)
    if (races_site[0]["races"] == null) throw redirect(301, "..")

    var id_language = ""
    locale.subscribe((value) => {
        var language = value.split("-")[0]
        id_language = check_language(language)
    })
    const { data: comments, error: resss } = await supabase.from("text").select("*").eq("id_site", data[0]["id"]).eq("id_language", id_language).eq("id_race", races_site[0]["id_race"]).eq("id_language", id_language)

    var path = data[0]["url"] + '/' + race + '/'

    var end, token = null
    var arrayLinks = []
    var status = await checkStatus(data[0]["date_limit"], data[0]["id_subscription"])

    var endecoded = url.searchParams.get("token") != null ? cryptr.decrypt(url.searchParams.get("token")) : url.searchParams.get("token");
    const command = new ListObjectsV2Command({
        Bucket: status ? S3_BUCKET_THUMB : S3_BUCKET_OVERLAY,
        MaxKeys: 5, Prefix: path, Delimiter: "/",
        StartAfter: endecoded
    });
    var lastKey = ""
    try {
        let { Contents, IsTruncated, NextContinuationToken } = await s3Client.send(command);
        end = IsTruncated;
        token = NextContinuationToken
        if (Contents != null) {
            for (var i = 0; i < Contents.length; i++) {
                if (Contents[i].Size != 0) {
                    const command = new GetObjectCommand({
                        Bucket: status ? S3_BUCKET_THUMB : S3_BUCKET_OVERLAY,
                        Key: Contents[i].Key,
                    });
                    const command2 = new GetObjectCommand({
                        Bucket: status ? S3_BUCKET : S3_BUCKET_OVERLAY,
                        Key: Contents[i].Key,
                    });
                    console.log(Contents[i].Key)
                    var name = Contents[i].Key.split("/").slice(-1).toString()
                    var ext = name.split(".").slice(-1).toString()
                    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 360000 });
                    const downloadLink = await getSignedUrl(s3Client, command2, { expiresIn: 360000 });
                    lastKey = Contents[i].Key
                    var tag = {
                        "source": [
                            {
                                "src": signedUrl,
                                "type": "video/mp4"
                            }
                        ],
                        "attributes": {
                            "preload": true,
                            "playsinline": true,
                            "controls": true
                        }
                    };
                    arrayLinks.push({
                        "link": signedUrl,
                        "downloadlink": status ? downloadLink : signedUrl,
                        "name": name,
                        "source": JSON.stringify(tag),
                        "type": ext == "mov" ? "video/mp4" : "image"
                    })
                }
            }
        }
    } catch (err) {
        console.error(err);
    }

    return {
        username: user,
        name: races_site[0]["races"]["name"],
        IsTruncated: end,
        NextContinuationToken: token,
        key: cryptr.encrypt(lastKey),
        arrayLinks: arrayLinks,
        status: status,
        background: races_site[0]["races"]["image_url"],
        first_color_palette: data[0]["first_color_palette"],
        second_color_palette: data[0]["second_color_palette"],
        primary_text_palette: data[0]["primary_text_palette"],
        second_text_palette: data[0]["second_text_palette"],
        comments: comments
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    download_round: async ({ params, locals: { supabase } }) => {

        let user = params.username
        let race = params.gara
        const { data, error_ } = await supabase.from("sites").select("*").eq("url", user)
        if (error_) {
            console.log(error_)
        }

        const command = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: data[0]["url"] + '/' + race + '/',
        })

        const zip = new JSZip();
        const img = zip.folder("images");
        try {
            console.log("Your bucket contains the following objects:\n")
            const { Contents, IsTruncated, NextContinuationToken } = await s3Client.send(command);
            console.log(data[0]["id"] + '/' + race + '/')
            for (var i = 0; i < Contents.length; i++) {
                if (Contents.Size != 0) {
                    // Get the object's key (relative path within the folder)
                    const key = Contents[i].Key;
                    // Create a stream for downloading the object from S3
                    const command = new GetObjectCommand({ Bucket: "pm-ph", Key: key })
                    const s3respone = await s3Client.send(command);
                    const s3Stream = Readable.from(s3respone.Body);

                    img.file(Contents[i].Key, s3Stream, { base64: true });
                }
            }

        } catch (err) {
            console.error(err);
        }

        let response = await zip.generateAsync({ type: "base64" })
        return {
            body: response
        }

    }
};

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

function check_language(language) {
    if (language == 'de') return "6f21ec21-b5f5-497f-97e5-bbdbc6f88445"
    else if (language == 'it') return "b1fff836-fa69-4e6f-90ab-bdf4e2aff9a6"
    else if (language == 'es') return "56854580-49a5-4199-8b46-18043ba50396"
    else if (language == 'fr') return "62395206-9d66-4b29-8311-76a7f9211134"
    else return "8676cfe4-745a-4488-9a5d-dbdbb31d82e8"
}