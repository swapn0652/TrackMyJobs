export interface InterviewRound {
  id: string;
  jobId: string;
  roundType: string; 
  roundDate: string; 
  notes?: string;
  result?: "Pending" | "Passed" | "Failed";
};

export interface Job {
  id: string;
  userId: string;
  companyName: string;
  jobRole: string;
  source?: string;
  appliedDate?: string; 
  jobDescription?: string;
  ctcRange?: string;
  resumePath?: string;
  coverLetterPath?: string;
  jobLink?: string;
  interviewRounds?: InterviewRound[]; 
}

export interface JobCardProps {
  job: Job;
};