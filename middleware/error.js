const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	//Log to console for dev
	console.log(err);

	// Unexpected token (json) handler
	// Handler for custom raw json self-inpur
	if (err.type === 'entity.parse.failed') {
		const message = 'Invalid data ( Unexpected token )';
		error = new ErrorResponse(message, 400);
	}

	//
	// ─── FIREBASE AUTH ──────────────────────────────────────────────────────────────
	//
	if (err.errorInfo && err.errorInfo.code === 'auth/email-already-exists') {
		const message = 'This email is already existed';
		error = new ErrorResponse(message, 400);
	}
	// ────────────────────────────────────────────────────────────────────────────────

	//
	// ─── VALIDATION ERROR ───────────────────────────────────────────────────────────
	//
	if (error.validateErrors) {
		//error.statusCode = 400;
		error.message = error.validateErrors;
	}
	// ────────────────────────────────────────────────────────────────────────────────

	res.status(error.statusCode || 500).json({
		success: false,
		errors: error.message || 'Server Error'
	});
};

module.exports = errorHandler;
