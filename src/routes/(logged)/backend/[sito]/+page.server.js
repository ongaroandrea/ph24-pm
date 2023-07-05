import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';
import { SITE_URL, CHIAVE_UTENTE, UTENTE_NASCOSTO } from '$env/static/private'
import { fail, redirect } from '@sveltejs/kit';
import sharp from 'sharp'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const config = {
    params: {
        consumer_key: CHIAVE_UTENTE,
        consumer_secret: UTENTE_NASCOSTO
    }
};

const infoSchema = z.object({
    height: z.number().optional().default(''),
    country: z.string().optional().default(''),
    birth_date: z.date().optional(),
    custom_text: z.string().optional()
});

const colorSchema = z.object({
    first_color_palette: z.string().default(''),
    second_color_palette: z.string().default(''),
    primary_text_palette: z.string().default(''),
    second_text_palette: z.string().default('')
});

const socialSchema = z.object({
    instagram: z.string().optional().default(''),
    facebook: z.string().optional().default(''),
    twitter: z.string().optional().default(''),
});

const textSchema = z.object({
    text: z.string(),
    language: z.string(),
})

const contactSchema = z.object({
    name: z.string(),
    telephone: z.string(),
    email: z.string().email(),
})

const contactSchemaUpdate = z.object({
    id: z.string(),
    name: z.string(),
    telephone: z.string(),
    email: z.string().email(),
    remove: z.boolean()
})

/** @type {import('./$types').Actions} */
export const actions = {
    //normal form
    profile: async ({ params, request, locals: { supabase }, url }) => {

        const data = await request.formData()
        const images = data.get('profile')?.valueOf();
        let sito = params.sito
        if (images.size != 0) {

            const response = await supabase.storage.from("avatars").remove('', { prefix: sito + '/' })
                .catch(error => {
                    console.error('Error removing images:', error)
                })

            let name_ext = images.name
            let name = uuidv4()
            //rimuovo dal backet l'immagine caricata precedentemente
            const { dataf, errorf } = await supabase
                .storage
                .from('avatars')
                .remove([params.sito + '/' + name + '.webp'])

            //aggiorno foto
            const { data, error } = await supabase
                .from('sites')
                .update({ image: name })
                .eq('id', params.sito)

            const image = sharp(await images.arrayBuffer())
            image
                .metadata()
                .then(function (metadata) {
                    return image
                        .resize(800, 800, {
                            fit: 'outside',
                        })
                        .withMetadata()
                        .webp({ lossless: true })
                        .toBuffer();
                }).then(async function (data) {
                    const { datar, error } = await supabase.storage
                        .from('avatars')
                        .upload(sito + "/" + name + ".webp", data)
                    //upload images
                    if (error) {
                        return { type: "profile", error: true, message: error.message }
                    }
                })
            image
                .metadata()
                .then(function (metadata) {
                    return image
                        .resize(1000, 500, {
                            fit: 'outside',
                        })
                        .withMetadata()
                        .webp({ lossless: true })
                        .toBuffer();
                }).then(async function (data) {
                    const { datar, error } = await supabase.storage
                        .from('avatars')
                        .upload(sito + "/" + name + "_mobile.webp", data)
                    //upload images
                    /*if (error) {
                        //return { type: "profile", error: true, message: error.message }
                    } else {
                       
                    }*/
                })
        } else {
            return { error: true, message: "Size not valid" }
        }
        redirect(300, url.href)
    },
    //custom form
    info: async ({ params, request, locals: { supabase } }) => {
        const form = await superValidate(request, infoSchema, { id: "form1" });
        console.log('POST', form);

        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }
        var height = form.data.height
        var country = JSON.parse(form.data.country)
        var birth_date = form.data.birth_date
        var custom_text = form.data.custom_text
        //var helmet = data.helmet //image
        const { data, error } = await supabase
            .from('sites')
            .update({ height: height, country: country["id"], date_birth: birth_date, custom_text: custom_text })
            .eq('id', params.sito)

        if (error) {
            return message(form, error.message, {
                status: error.status
            });
        }
        return message(form, 'Data updated');
    },
    //custom form
    color: async ({ params, request, locals: { supabase } }) => {
        const colorForm = await superValidate(request, colorSchema, { id: 'form2' });
        console.log('POST', colorForm);

        // Convenient validation check:
        if (!colorForm.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { colorForm });
        }
        var first_color_palette = colorForm.data.first_color_palette
        var second_color_palette = colorForm.data.second_color_palette
        var primary_text_palette = colorForm.data.primary_text_palette
        var second_text_palette = colorForm.data.second_text_palette
        //var helmet = data.helmet //image
        const { data, error } = await supabase
            .from('sites')
            .update({
                first_color_palette: first_color_palette, second_color_palette: second_color_palette,
                primary_text_palette: primary_text_palette, second_text_palette: second_text_palette
            })
            .eq('id', params.sito)

        if (error) {
            return message(colorForm, error.message, {
                status: error.status
            });
        }
        return message(colorForm, 'Data updated');
    },
    //custom form
    social: async ({ params, request, locals: { supabase } }) => {
        const form = await superValidate(request, socialSchema, { id: "form3" });
        console.log('POST', form);

        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }
        var instagram = form.data.instagram
        var facebook = form.data.facebook
        var twitter = form.data.twitter

        const { data_u, error } = await supabase
            .from('sites')
            .update({ instagram: instagram, facebook: facebook, twitter: twitter })
            .eq('id', params.sito)

        if (error) {
            return message(form, error.message, {
                status: 500
            });
        }
        return message(form, 'Info updated');
    },
    //custom form
    text: async ({ params, request, locals: { supabase } }) => {

        const form = await superValidate(request, textSchema, { id: "form4" });
        console.log('POST', form);

        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }
        var text = form.data.text
        var language = form.data.language

        //controllo se esiste
        const { data: data_t, error_s } = await supabase.from('description').select('*').eq('id_site', params.sito).eq('id_language', language)
        console.log(data_t)
        if (data_t != null && data_t.length != 0) {
            const { data, error } = await supabase
                .from('description')
                .update({ text: text, id_language: language, id_site: params.sito })
                .eq('id_site', params.sito)

            if (error) {
                return message(form, error.message, {
                    error: 500
                });
            }
        } else {
            console.log("insert")
            const { data, error } = await supabase
                .from('description')
                .insert([{ text: text, id_language: language, id_site: params.sito }])
                .eq('id_site', params.sito)
            if (error) {
                return message(form, error.message, {
                    error: 500
                });
            }
        }
        return message(form, 'Description updated');
    },
    sponsor: async ({ params, request, locals: { supabase } }) => {
        const sito = params.sito
        const dataImg = await request.formData()
        const image = sharp(await dataImg.getAll("filepond")[1].arrayBuffer())
        const name = uuidv4()
        image
            .metadata()
            .then(function (metadata) {
                return image
                    .resize(Math.round(metadata.width / 2))
                    .webp()
                    .toBuffer();
            }).then(async function (data) {
                const { datar, error } = await supabase.storage
                    .from('sponsor')
                    .upload(sito + "/" + name + ".webp", data)
                //upload images*/

                if (error) {
                    fail(400, "")
                }
                return { type: "sponsor_load", error: false, message: "Foto caricata con successo" }
            });
    },
    remove_sponsor: async ({ params, request, locals: { supabase } }) => {
        const sito = params.sito
        const data = await request.formData()
        supabase.storage
            .from('sponsor')
            .remove(sito + "/" + data.get('image_name'))
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                return { type: "sponsor", error: true, message: error.message }
            })
        return { type: "sponsor", error: false, message: "Foto eliminata con successo" }
    },
    championship: async ({ params, request, locals: { supabase } }) => {
        const sito = params.sito
        const dataImg = await request.formData()
        const image = sharp(await dataImg.getAll("filepond")[1].arrayBuffer())
        var name = dataImg.getAll("filepond")[1]["name"]
        name = uuidv4()
        image
            .metadata()
            .then(function (metadata) {
                return image
                    .resize(Math.round(metadata.width / 2))
                    .webp()
                    .toBuffer();
            }).then(async function (data) {
                const { datar, error } = await supabase.storage
                    .from('championship')
                    .upload(sito + "/" + name + ".webp", data)
                //upload images*/

                if (error) {
                    fail(400, "")
                }
                return { type: "championship_load", error: false, message: "Foto caricata con successo" }
            });
    },
    remove_championship: async ({ params, request, locals: { supabase } }) => {
        const sito = params.sito
        const data = await request.formData()
        supabase.storage
            .from('championship')
            .remove(sito + "/" + data.get('image_name'))
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                return { type: "championship", error: true, message: error.message }
            })
        return { type: "championship", error: false, message: "Foto eliminata con successo" }
    },
    contact_info: async ({ params, request, locals: { supabase } }) => {
        const form = await superValidate(request, contactSchema, { id: 'form5' });
        console.log('POST', form);

        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }
        var name = form.data.name
        var telephone = form.data.telephone
        var email = form.data.email
        //var helmet = data.helmet //image
        const { data, error } = await supabase
            .from('contact_info')
            .insert({ name: name, telephone: telephone, email: email, id_site: params.sito })

        if (error) {
            return message(form, error.message, {
                status: error.status
            });
        }
        return message(form, 'Data updated');
    },
    contactUpdate: async ({ params, request, locals: { supabase } }) => {
        const form = await superValidate(request, contactSchemaUpdate, { id: 'form6' });
        console.log('POST', form);
        if (form.data.remove) {
            //rimuovi il contatto
            const { data, error } = await supabase
                .from('contact_info')
                .delete()
                .eq('id', form.data.id)

            if (error) {
                return message(form, error.message, {
                    status: error.status
                });
            }
            return message(form, 'Data updated');

        } else {
            // Convenient validation check:
            if (!form.valid) {
                // Again, always return { form } and things will just work.
                return fail(400, { form });
            }
            var id = form.data.id
            var name = form.data.name
            var telephone = form.data.telephone
            var email = form.data.email
            //var helmet = data.helmet //image
            const { data, error } = await supabase
                .from('contact_info')
                .update({ name: name, telephone: telephone, email: email })
                .eq("id", id)
                .eq("id_site", params.sito)

            console.log(error)
            console.log(data)
            if (error) {
                return message(form, error.message, {
                    status: error.status
                });
            }
            return message(form, 'Data updated');
        }
    }
};

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals: { supabase } }) {
    let sito = params.sito
    var status = "trial";
    var deadline = ""
    const { data, error } = await supabase.from("sites").select("*").eq("id", sito)
    if (error || data.length == 0) {
        console.log("Non esiste il sito, addio")
    }
    let timestamp = Date.parse(data[0]["date_limit"]);
    if (!isNaN(timestamp)) {
        status = "pay"
        deadline = data[0]["date_limit"]
    }
    if (isNaN(timestamp) && data["id_subscription"] != null) {
        let id = data[0]["id_subscription"];
        let url = SITE_URL + "wp-json/wc-sumosubs/v1/subscriptions/" + id

        try {
            const response = await axios.get(url, config);
            status = response.data["subscription_status"];
            if (status != "Active") {
                console.log("da pagare")
            } else {
                status = "pay"
                deadline = response.data["expiry_date"]
            }
            //controllo tipologia di subscription
        } catch (error) {
            //redirect(301, ".")
            console.log(error)
        }
    }

    var link_flag = "https://restcountries.com/v3.1/all"
    var response_link = await fetch(link_flag)
    let flags = await response_link.json()
    var array_flags = []
    for (i = 0; i < flags.length; i++) {
        array_flags.push({
            "id": flags[i]["cca2"],
            "title": flags[i]["name"]["common"],
        })
    }

    const { data: image_url, errors } = await supabase.storage.from('avatars').getPublicUrl(params.sito + "/" + data[0]["image"] + ".webp")

    //lingue possibili
    let { data: language, error_l } = await supabase
        .from('language')
        .select('*')

    //lingua
    let { data: description, error_t } = await supabase
        .from('description')
        .select('*')

    let { data: sponsor, error21 } = await supabase
        .storage
        .from('sponsor')
        .list(params.sito, { limit: 10 })

    let array_sponsor = []
    for (var i = 0; i < sponsor.length; i++) {
        const { data: public_url, errors } = await supabase.storage.from('sponsor').getPublicUrl(params.sito + "/" + sponsor[i].name)
        array_sponsor.push({
            id: sponsor[i].id,
            name: sponsor[i].name,
            url: public_url.publicUrl,
        })
    }

    let { data: championship, error22 } = await supabase
        .storage
        .from('championship')
        .list(params.sito, { limit: 10 })

    let array_championship = []
    for (i = 0; i < championship.length; i++) {
        const { data: public_url, errors } = await supabase.storage.from('championship').getPublicUrl(params.sito + "/" + championship[i].name)
        array_championship.push({
            id: championship[i].id,
            name: championship[i].name,
            url: public_url.publicUrl,
        })
    }

    var array_desc = []
    for (i = 0; i < description.length; i++) {
        array_desc[description[i].id_language] = description[i].text
    }
    let { data: sites, error_v } = await supabase
        .from('sites')
        .select('*')
        .eq("id", params.sito)

    let { data: contact_info, error_rr } = await supabase
        .from('contact_info')
        .select('*')
        .eq("id_site", params.sito)

    var find = sites[0]
    var profiles = find

    //
    const infoForm = await superValidate(infoSchema);
    const colorForm = await superValidate(colorSchema);
    const socialForm = await superValidate(socialSchema);
    const textForm = await superValidate(textSchema);
    const contactForm = await superValidate(contactSchema);
    const contactUpdateForm = await superValidate(contactSchemaUpdate);

    return {
        infoForm,
        colorForm,
        socialForm,
        textForm,
        contactForm,
        contactUpdateForm,
        username: params.sito,
        content: {
            status: status,
            deadline: deadline,
            image: image_url.publicUrl,
            email: profiles.email == undefined ? "" : profiles.email,
            custom_text: profiles.custom_text,
            height: profiles.height,
            country: profiles.country,
            flags: array_flags,
            date_birth: profiles.date_birth == undefined ? "" : profiles.date_birth,
            instagram: {
                url: profiles.instagram == undefined ? "" : profiles.instagram
            }, facebook: {
                url: profiles.facebook == undefined ? "" : profiles.facebook
            }, twitter: {
                url: profiles.twitter == undefined ? "" : profiles.twitter
            },
            first_color_palette: profiles.first_color_palette,
            second_color_palette: profiles.second_color_palette,
            primary_text_palette: profiles.primary_text_palette,
            second_text_palette: profiles.second_text_palette,
            sponsor: array_sponsor,
            championship: array_championship,
            language: language,
            description: array_desc,
            contact_info: contact_info
        }
    };
}