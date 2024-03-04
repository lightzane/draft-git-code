import { Logger } from '../logger';

const logger = Logger('utils.handleErrorMessage');

interface HandleErrorMessageOptions {
  throw?: boolean;
  message?: string;
}

/**
 * Handle the error message, and opt to throw or retrieve it.
 *
 * By default, it will throw the message.
 *
 * This is commonly used inside a `catch block`.
 */
export function handleErrorMessage(
  err: unknown,
  options?: HandleErrorMessageOptions,
) {
  let message = options?.message || 'Unhandled error occurred';

  if (err instanceof Error) {
    message = err.message;
  }

  // The error is a string
  else if (typeof err === 'string') {
    message = err;
  }

  // Other errors
  else {
    logger.error('UNHANDLED ERROR:', {
      customObj: err,
    });
  }

  logger.debug(`Handling error message:`, {
    customObj: {
      errorToThrow: message,
    },
  });

  if (options?.throw) {
    throw new Error(message);
  }

  return message;
}
