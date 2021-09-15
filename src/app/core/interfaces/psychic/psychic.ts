import {PsychicStatus} from '../../types/psychic-status.type';
import {PsychicComment} from './psychic-comment';
import {PsychicSchedule} from './psychic-schedule';
import {PsychicScheduleSlot} from './psychic-schedule-slot';

export interface Psychic {
  id: number;
  name: string;
  skills: string[];
  description: string;
  image: string;
  market: string;
  online_status: boolean;
  channels: string[];
  price: number;
  rate: number;
  min_call_time: string;
  schedules: PsychicSchedule[];
  schedulesSlots: Record<string, { avalaibleSlots: PsychicScheduleSlot[] }>;
  comments: PsychicComment[];
  presentation_type: string;
  presentation: string;
  subtitle: string;
  is_new: boolean;
  status: PsychicStatus;
}
