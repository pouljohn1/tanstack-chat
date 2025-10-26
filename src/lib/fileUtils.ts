import fs from "node:fs/promises";
import path from "node:path";

async function ensureDataDir(fileName: string) {
	const dir = path.dirname(path.join(process.cwd(), "data", fileName));
	try {
		await fs.access(dir);
	} catch {
		await fs.mkdir(dir, { recursive: true });
	}
}

export async function readContent<T>(fileName: string): Promise<T | null> {
	try {
		await ensureDataDir(fileName);
		const data = await fs.readFile(
			path.join(process.cwd(), "data", fileName),
			"utf-8",
		);
		return JSON.parse(data);
	} catch (error) {
		// If file doesn't exist or is invalid, return empty array
		return null;
	}
}

export async function writeContent<T>(
	fileName: string,
	content: T,
): Promise<void> {
	await ensureDataDir(fileName);
	await fs.writeFile(
		path.join(process.cwd(), "data", fileName),
		JSON.stringify(content, null, 2),
		"utf-8",
	);
}
