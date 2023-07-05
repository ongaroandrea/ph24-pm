<script>
	import Comments from "./comments.svelte";
	import Rounds from "./rounds.svelte";
    export let link;
    export let name;
    export let number_rounds;
    export let comments;
    export let first_color_palette, second_color_palette;
    export let display
    export let username;
    export let background_image
</script>

<Rounds {username} {link} {background_image} {name} {number_rounds} {first_color_palette} {second_color_palette} {display}/>
<Comments {comments} {first_color_palette} {second_color_palette} /> 