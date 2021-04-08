import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
	id: string;
	content: string;
	type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dirName: string) => {
	const router = express.Router();

	router.use(express.json());

	const fullPath = path.join(dirName, filename);

	router.get('/cells', async (req, res) => {
		try {
			// Read the file
			const result = await fs.readFile(fullPath, { encoding: 'utf8' });

			res.send(JSON.parse(result));
		} catch (err) {
			if (err.code === 'ENOENT') {
				// Add code to create a file and add default cells
				await fs.writeFile(fullPath, '[]', 'utf8');
				res.send([]);
			} else {
				throw err;
			}
		}
	});

	router.post('/cells', async (req, res) => {
		// Take the list of cells from the request object
		// Serialize them
		const { cells }: { cells: Cell[] } = req.body;
		// Write the cells into the file
		try {
			await fs.writeFile(fullPath, JSON.stringify(cells), 'utf8');
			res.send({ status: 'ok' });
		} catch (err) {
			throw err;
		}
	});

	return router;
};
