import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { z } from 'zod';
import eleventyFetch from '@11ty/eleventy-fetch';

const nasaPhotoParser = z.array(
	z.object({
		title: z.string(),
		url: z.string(),
		hdurl: z.string().url().optional(),
		explanation: z.string(),
		date: z.string().transform((date) => new Date(date))
	})
);

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const unparsed = await eleventyFetch(
		`https://api.nasa.gov/planetary/apod?api_key=${env.NASA_API_KEY}&count=10`,
		{
			duration: '1d',
			type: 'json'
		}
	);
	const nasaPhotos = nasaPhotoParser.parse(unparsed);
	setHeaders({
		'cache-control': 'public, max-age=8164000'
	});
	if (params.slug === 'hello-world') {
		return {
			nasaPhotos
		};
	}

	throw error(404, 'Not found');
};
