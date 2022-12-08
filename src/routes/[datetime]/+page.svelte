<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<form method="post" use:enhance>
	<label for="quantity">Quantity</label>
	<input id="quantity" name="quantity" type="number" />
</form>
<article>
	<h2>{data.title}</h2>
	<img src={data.hdurl ?? data.url} alt={data.title} />
	<p>{data.explanation}</p>
	<time datetime={data.date.toISOString()}>
		{data.date.toDateString()}
	</time>
</article>

<style>
	img {
		max-width: 100%;
		aspect-ratio: 2 / 1;
		object-fit: cover;
	}
</style>
