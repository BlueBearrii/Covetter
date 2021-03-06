import axios from 'axios';

const setAuthToken = (token) => {
	if (token) {
		//Apply to every request
		const _token = token;
		axios.defaults.headers.common['Authorization'] = _token;
	} else {
		//Delete Auth Header
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
