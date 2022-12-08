<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.nasaPhotos as nasaPhoto}
	<article>
		<h2>{nasaPhoto.title}</h2>
		<img src={nasaPhoto.hdurl ?? nasaPhoto.url} alt={nasaPhoto.title} />
		<p>{nasaPhoto.explanation}</p>
		<time datetime={nasaPhoto.date.toISOString()}>
			{nasaPhoto.date.toDateString()}
		</time>
	</article>
{/each}
