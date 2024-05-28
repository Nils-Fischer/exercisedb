export interface FilterableItem {
	[key: string]: string | string[];
}

export interface Exercise extends FilterableItem {
	name: string;
	force: string;
	level: string;
	mechanic: string;
	equipment: string;
	primaryMuscles: string[];
	secondaryMuscles: string[];
	instructions: string[];
	category: string;
	images: string[];
	id: string;
}

export interface Filters {
	[key: string]: string | null;
}
