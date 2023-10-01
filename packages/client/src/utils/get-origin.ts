export const getOrigin = () => {
	if (typeof window === undefined) {
		return '';
	}

	return window.location.origin
};
