export interface Job {
  id: string;
  started_at: string;
  ended_at: string;
  errored_at: string;
  log: string;
}

export interface JobOutputMessage {
  jobId: string;
  content: string;
}

export interface JobsState {
  list: Job[];
  currentJobId: string | undefined;
  newJobId: string | undefined;
}
