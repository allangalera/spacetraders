import type { HTTPError } from 'ky';

export const isHttpError = (error: unknown): error is HTTPError => {
	return Boolean(error && error.response && error.response.status);
};
