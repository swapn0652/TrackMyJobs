export type RoundResult = "WAITING" | "PASSED" | "FAILED";

export interface InterviewRound {
  id: string;
  roundType: string;
  roundDate: string | null;
  notes?: string | null;
  result: RoundResult;
}

export enum JobStatus {
  APPLIED = "APPLIED",
  INTERVIEWING = "INTERVIEWING",
  OFFER = "OFFER",
  REJECTED = "REJECTED",
}


export interface Job {
  id: string;
  userId: string;

  companyName: string;
  jobRole: string;
  location: string;

  source: string;
  jobLink?: string;

  status: JobStatus;

  appliedDate: string;     
  createdAt: string;     

  jobDescription?: string;
  // ctcRange?: string;
  minCtc: number;
  maxCtc: number;

  resumePath?: string;

  interviewRounds: InterviewRound[];
}


export interface JobCardProps {
  job: Job;
};

export interface CreateJobDTO {
  companyName: string;
  jobRole: string;
  location: string;
  source: string;
  appliedDate: string;
  jobDescription?: string;
  minCtc?: number;
  maxCtc?: number;
  jobLink?: string;
  resumePath?: string;
};


export interface TimelineItemProps {
  title: string;
  status: string;
  date?: string;
  notes?: string | null;
};
