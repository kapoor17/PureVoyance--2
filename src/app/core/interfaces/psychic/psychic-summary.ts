import {PsychicStatus} from '../../types/psychic-status.type';

export interface PsychicSummary {
  id: number;
  name: string;
  skills: string[];
  description: string;
  image: string;
  market: string;
  online_status: boolean;
  price: number;
  rate: number;
  min_call_time: string;
  presentation_type: string;
  presentation: string;
  subtitle: string;
  is_new: boolean;
  status: PsychicStatus;

  isFavorite?: boolean;
}
