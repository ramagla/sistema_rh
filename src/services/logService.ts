export interface LogEntry {
  timestamp: string;
  message: string;
}

const logs: LogEntry[] = [];

export const logEvent = (message: string) => {
  const timestamp = new Date().toISOString();
  logs.push({ timestamp, message });
  console.log(`[${timestamp}] ${message}`);
};

export const getLogs = () => logs;
