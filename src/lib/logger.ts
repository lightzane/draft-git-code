import { createLogger, format, transports } from 'winston';
import '@colors/colors';

const { combine, timestamp, colorize, printf } = format;

export const Logger = (context: string) => {
  return createLogger({
    level: process.env.GIT_CODE_DEV ? 'debug' : 'info',
    format: combine(colorize({ all: true }), myTimestamp, myFormat),
    transports: [new transports.Console()],
    defaultMeta: {
      context,
      customObj: '',
      route: '',
    },
  });
};

const myFormat = printf(({ level, message, timestamp, ...custom }) => {
  let { context, route, customObj } = custom;

  context = `[${context}]`.cyan;

  if (customObj && typeof customObj === 'object') {
    customObj = '\n' + JSON.stringify(customObj, null, 2).magenta;
  }

  if (process.env.GIT_CODE_DEV) {
    return `[${level}] ${timestamp} \t ${context} ${message} ${route} ${customObj}`.trim();
  }

  return `[${'gcode'.cyan}] ${timestamp} \t ${message}`;
});

const myTimestamp = timestamp({
  format: () => {
    return new Date().toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  },
});
