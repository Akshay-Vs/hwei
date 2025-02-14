"use server";

import * as LucideIcons from "lucide-react";

export async function getIcons(query: string) {
	const allIcons = Object.keys(LucideIcons);

	const filteredIcons = allIcons
		.filter((icon) => icon.toLowerCase().includes(query.toLowerCase()))
		.slice(0, 10); // Limit to 10 results

	return filteredIcons;
}
