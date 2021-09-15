export interface PsychicAppointment {
  id: number;
  user_id: number;
  psychic_id: number;
  start: Date;
  end: Date;
  media: string;
  created_at: Date;
  updated_at: Date;
}