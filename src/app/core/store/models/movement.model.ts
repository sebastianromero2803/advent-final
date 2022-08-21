export interface Movement {
  containerId: string;
  origin:      string;
  destination?: string;
  status:      boolean;
  description: string;
  dimensions:  string;
  book:        string;
  booked?:     boolean;
  issuedBy:    string;
  fee:         number;
}

export interface MovementsState {
  movements: Movement[];
}