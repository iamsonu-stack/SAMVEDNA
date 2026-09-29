export type CounsellorStatus =
  | "Available"
  | "Busy"
  | "Off Duty";

export type Counsellor = {
  id: string;
  name: string;
  district: string;
  specialization: string;
  status: CounsellorStatus;
  assignedCases: number;
  phone: string;
  experience: string;
};

export const counsellors: Counsellor[] = [
  {
    id: "C001",
    name: "Anita Sharma",
    district: "Indore",
    specialization: "Trauma Support",
    status: "Available",
    assignedCases: 8,
    phone: "+91 98XXXXXX21",
    experience: "6 years",
  },
  {
    id: "C002",
    name: "Rahul Verma",
    district: "Indore",
    specialization: "Crisis Counselling",
    status: "Busy",
    assignedCases: 14,
    phone: "+91 97XXXXXX45",
    experience: "8 years",
  },
  {
    id: "C003",
    name: "Priya Singh",
    district: "Ujjain",
    specialization: "Victim Support",
    status: "Available",
    assignedCases: 6,
    phone: "+91 96XXXXXX18",
    experience: "5 years",
  },
  {
    id: "C004",
    name: "Neha Patel",
    district: "Dewas",
    specialization: "Mental Well-being",
    status: "Off Duty",
    assignedCases: 11,
    phone: "+91 95XXXXXX72",
    experience: "7 years",
  },
  {
    id: "C005",
    name: "Arjun Mehta",
    district: "Indore",
    specialization: "Trauma Counselling",
    status: "Available",
    assignedCases: 5,
    phone: "+91 94XXXXXX63",
    experience: "4 years",
  },
  {
    id: "C006",
    name: "Kavita Joshi",
    district: "Bhopal",
    specialization: "Crisis Support",
    status: "Busy",
    assignedCases: 16,
    phone: "+91 93XXXXXX28",
    experience: "9 years",
  },
  {
    id: "C007",
    name: "Rohit Sharma",
    district: "Indore",
    specialization: "Family & Trauma Support",
    status: "Available",
    assignedCases: 7,
    phone: "+91 92XXXXXX41",
    experience: "5 years",
  },
  {
    id: "C008",
    name: "Sneha Gupta",
    district: "Dhar",
    specialization: "Victim Rehabilitation",
    status: "Off Duty",
    assignedCases: 9,
    phone: "+91 91XXXXXX56",
    experience: "6 years",
    
  },
];