import {PsychicAppointment} from './psychic-appointment';
import {PsychicComment} from './psychic-comment';
import {PsychicConsultation} from './psychic-consultation';
import {PsychicSchedule} from './psychic-schedule';
import {PsychicScheduleSlot} from './psychic-schedule-slot';

export interface PsychicAdmin {
  id: number;
  name: string;
  skills: string[];
  description: string;
  image: string;
  market: string;
  online_status: boolean;
  channels: string[];
  price: number;
  old_price?: number;
  rate: number;
  min_call_time: string;
  commission: string;
  total_commission: number;
  total_income_amount: number;
  total_income_mount: number;
  schedules: PsychicSchedule[];
  schedulesSlots: Record<string, { avalaibleSlots: PsychicScheduleSlot[] }>;
  comments: PsychicComment[];
  consultations: PsychicConsultation[];
  appointments: PsychicAppointment[];
  presentation_type: string;
  presentation: string;
  subtitle: string;
  is_new: boolean;
}
