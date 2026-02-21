export interface InterviewRound {
  id: string;
  jobId: string;
  roundType: string; 
  roundDate: string; 
  notes?: string;
  result?: "Pending" | "Passed" | "Failed";
};

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
  ctcRange?: string;

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
  ctcRange?: string;
  jobLink?: string;
  resumePath?: string;
};
