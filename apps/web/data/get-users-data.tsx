import { TCardInfo } from '@/types/card-info-type';
import { TUser } from '@/types/users-type';

const Users = [
	{
		id: 'USR001',
		firstName: 'Evelin',
		lastName: 'Violet',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'evelin.violet@quantum.net',
		phone: '+1-555-123-4567',
		dateOfBirth: '2002-03-15',
		address: {
			street: '742 Nebula Avenue',
			city: 'Neo Portland',
			state: 'OR',
			zipCode: '97201',
			country: 'United Earth Federation',
		},
		occupation: 'Quantum Engineer',
		company: 'StarTech Industries',
		accountCreated: '2024-06-12',
		lastLogin: '2025-01-19',
		preferences: {
			language: 'Universal Standard',
			theme: 'Plasma Dark',
			notifications: true,
		},
	},
	{
		id: 'USR002',
		firstName: 'Vector',
		lastName: 'Echo',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'vector.echo@stellar.com',
		phone: '+1-555-234-5678',
		dateOfBirth: '1999-11-28',
		address: {
			street: '123 Starlight Boulevard',
			city: 'New Seattle',
			state: 'WA',
			zipCode: '98101',
			country: 'United Earth Federation',
		},
		occupation: 'Neural Interface Designer',
		company: 'MindSync Corp',
		accountCreated: '2024-08-24',
		lastLogin: '2025-01-20',
		preferences: {
			language: 'Universal Standard',
			theme: 'Neon Light',
			notifications: true,
		},
	},
	{
		id: 'USR003',
		firstName: 'Nova',
		lastName: 'Phoenix',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'nova.phoenix@cosmos.io',
		phone: '+1-555-345-6789',
		dateOfBirth: '2001-07-03',
		address: {
			street: '567 Aurora Lane',
			city: 'Neo Tokyo',
			state: 'TK',
			zipCode: '10001',
			country: 'Pan-Asian Alliance',
		},
		occupation: 'Biotech Researcher',
		company: 'Genesis Labs',
		accountCreated: '2024-09-15',
		lastLogin: '2025-01-20',
		preferences: {
			language: 'Universal Standard',
			theme: 'Holographic',
			notifications: true,
		},
	},
	{
		id: 'USR004',
		firstName: 'Zenith',
		lastName: 'Frost',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'zenith.frost@arctic.net',
		phone: '+1-555-456-7890',
		dateOfBirth: '2000-12-21',
		address: {
			street: '890 Ice Crystal Road',
			city: 'New Vancouver',
			state: 'BC',
			zipCode: 'V6B 1A1',
			country: 'Northern Coalition',
		},
		occupation: 'Cryogenics Specialist',
		company: 'FrostTech Solutions',
		accountCreated: '2024-07-30',
		lastLogin: '2025-01-19',
		preferences: {
			language: 'Universal Standard',
			theme: 'Arctic Blue',
			notifications: false,
		},
	},
	{
		id: 'USR005',
		firstName: 'Cipher',
		lastName: 'Shadow',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'cipher.shadow@darknet.io',
		phone: '+1-555-567-8901',
		dateOfBirth: '1998-08-08',
		address: {
			street: '404 Digital Avenue',
			city: 'Cyber City',
			state: 'CA',
			zipCode: '90210',
			country: 'United Earth Federation',
		},
		occupation: 'Cybersecurity Architect',
		company: 'Shadow Systems',
		accountCreated: '2024-05-05',
		lastLogin: '2025-01-20',
		preferences: {
			language: 'Universal Standard',
			theme: 'Matrix Dark',
			notifications: true,
		},
	},
	{
		id: 'USR006',
		firstName: 'Aurora',
		lastName: 'Stellar',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'aurora.stellar@galaxy.com',
		phone: '+1-555-678-9012',
		dateOfBirth: '2003-04-17',
		address: {
			street: '777 Constellation Way',
			city: 'Stellar Heights',
			state: 'AZ',
			zipCode: '85001',
			country: 'United Earth Federation',
		},
		occupation: 'Astro Navigator',
		company: 'Interstellar Transport',
		accountCreated: '2024-10-10',
		lastLogin: '2025-01-19',
		preferences: {
			language: 'Universal Standard',
			theme: 'Cosmic Purple',
			notifications: true,
		},
	},
	{
		id: 'USR007',
		firstName: 'Quantum',
		lastName: 'Blade',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'quantum.blade@nexus.net',
		phone: '+1-555-789-0123',
		dateOfBirth: '1997-01-23',
		address: {
			street: '333 Energy Loop',
			city: 'Quantum City',
			state: 'NV',
			zipCode: '89101',
			country: 'United Earth Federation',
		},
		occupation: 'Plasma Weapons Engineer',
		company: 'Defense Dynamics',
		accountCreated: '2024-03-15',
		lastLogin: '2025-01-20',
		preferences: {
			language: 'Universal Standard',
			theme: 'Energy Red',
			notifications: false,
		},
	},
	{
		id: 'USR008',
		firstName: 'Echo',
		lastName: 'Prism',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'echo.prism@hologram.io',
		phone: '+1-555-890-1234',
		dateOfBirth: '2004-09-30',
		address: {
			street: '555 Hologram Street',
			city: 'New Singapore',
			state: 'SG',
			zipCode: '123456',
			country: 'Pan-Asian Alliance',
		},
		occupation: 'Holographic Artist',
		company: 'Prism Entertainment',
		accountCreated: '2024-11-11',
		lastLogin: '2025-01-19',
		preferences: {
			language: 'Universal Standard',
			theme: 'Prismatic',
			notifications: true,
		},
	},
	{
		id: 'USR009',
		firstName: 'Nexus',
		lastName: 'Flux',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'nexus.flux@void.com',
		phone: '+1-555-901-2345',
		dateOfBirth: '1996-06-06',
		address: {
			street: '999 Void Street',
			city: 'Dark Haven',
			state: 'NY',
			zipCode: '10007',
			country: 'United Earth Federation',
		},
		occupation: 'Dark Matter Researcher',
		company: 'Void Sciences',
		accountCreated: '2024-02-20',
		lastLogin: '2025-01-20',
		preferences: {
			language: 'Universal Standard',
			theme: 'Void Black',
			notifications: true,
		},
	},
	{
		id: 'USR010',
		firstName: 'Solaris',
		lastName: 'Dawn',
		avatar:
			'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
		email: 'solaris.dawn@sun.net',
		phone: '+1-555-012-3456',
		dateOfBirth: '2000-03-21',
		address: {
			street: '101 Solar Way',
			city: 'Sun City',
			state: 'AZ',
			zipCode: '85003',
			country: 'United Earth Federation',
		},
		occupation: 'Solar Energy Architect',
		company: 'Solar Dynamics',
		accountCreated: '2024-04-01',
		lastLogin: '2025-01-19',
		preferences: {
			language: 'Universal Standard',
			theme: 'Solar Gold',
			notifications: true,
		},
	},
] as TUser[];

export const getTotalUsers = async (): Promise<TCardInfo> => {
	return {
		value: 1203,
		changeRate: 10,
		change: 'increase',
		affect: 'positive',
	};
};

export const getActiveUsers = async (): Promise<TCardInfo> => {
	return {
		value: 834,
		changeRate: 30,
		change: 'increase',
		affect: 'positive',
	};
};

export const getEngagement = async (): Promise<TCardInfo> => {
	return {
		value: `${76}%`,
		changeRate: 13,
		change: 'decrease',
		affect: 'negative',
	};
};

export const getUsers = async (): Promise<TUser[]> => {
	return new Promise((resolve) => {
		resolve(Users);
	});
};
