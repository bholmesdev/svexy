import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { z } from 'zod';
import eleventyFetch from '@11ty/eleventy-fetch';

let totalQuantity = 0;

const nasaPhotoParser = z.object({
	title: z.string(),
	url: z.string(),
	hdurl: z.string().url().optional(),
	explanation: z.string(),
	date: z.string().transform((date) => new Date(date))
});

export const actions: Actions = {
	async default({ request }) {
		const data = await request.formData();
		totalQuantity += Number(data.get('quantity'));

		console.log({ totalQuantity });
		return totalQuantity;
	}
};

export const load: PageServerLoad = async ({
	params,
	setHeaders
}): Promise<z.infer<typeof nasaPhotoParser>> => {
	const unparsed = await eleventyFetch(
		`https://api.nasa.gov/planetary/apod?api_key=${env.NASA_API_KEY}&date=${params.datetime}`,
		{
			duration: '1d',
			type: 'json'
		}
	);
	try {
		const nasaPhoto = nasaPhotoParser.parse(unparsed);
		setHeaders({
			'cache-control': 'public, max-age=8164000'
		});
		return nasaPhoto;
	} catch {
		throw error(404, 'Not found');
	}
};
