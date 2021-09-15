export interface EventLog {
  id: number;
  message: string;
  date: string;
  subject_id: number;
  subject_type: string;
  log_name: string;
  causer_type: string;
  causer_id: number;
  properties: {
    old: Object,
    new: Object
  };

  causerLink?: string;
}
