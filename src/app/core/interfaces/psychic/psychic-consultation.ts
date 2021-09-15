export interface PsychicConsultation {
  id: number;
  user_id: number;
  psychic_id: number;
  invoice_id: number;
  start: Date;
  end: Date;
  duration: string;
  price: number;
  media: string;
  telco_end_status: string;
  created_at: Date;
  updated_at: Date;
}
