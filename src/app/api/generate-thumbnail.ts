import { spawn } from 'child_process';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
	// Vérifiez la méthode de requête
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Méthode non autorisée' });
		return;
	}

	const { videoPath } = req.body;

	if (!videoPath) {
		res.status(400).json({ message: 'Chemin de la vidéo non fourni' });
		return;
	}

	try {
		const thumbnailFilename = `${uuidv4()}.jpg`;
		const thumbnailPath = `public/poster/${thumbnailFilename}`;

		await generateThumbnail(videoPath, thumbnailPath);

		res.status(200).json({
			message: 'Miniature générée avec succès',
			thumbnailPath,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Erreur lors de la génération de la miniature',
			error,
		});
	}
}

function generateThumbnail(videoPath, thumbnailPath) {
	return new Promise<void>((resolve, reject) => {
		const ffmpeg = spawn('ffmpeg', [
			'-i',
			videoPath,
			'-ss',
			'00:00:05',
			'-vframes',
			'1',
			thumbnailPath,
		]);

		ffmpeg.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
		});

		ffmpeg.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`FFmpeg a quitté avec le code ${code}`));
			}
		});
	});
}
