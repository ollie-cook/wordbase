import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import pg from "pg"
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const load: PageServerLoad = async ({ params }) => {	
	const { Client } = pg;

	const client = new Client()
	await client.connect()
	
	const res = await client.query('SELECT * FROM words')
	await client.end()

	if (res) {		
		return { body: res.rows };	
	}

	error(404, 'Not found');
};