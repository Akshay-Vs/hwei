"use server";

import * as LucideIcons from "lucide-react";

export async function getIcons(query: string, len: number) {
	const allIcons = Object.keys(LucideIcons);

	const filteredIcons = allIcons
		.filter((icon) => icon.toLowerCase().includes(query.toLowerCase()))
		.slice(0, len); // Limit to {len} results

	return filteredIcons;
}
