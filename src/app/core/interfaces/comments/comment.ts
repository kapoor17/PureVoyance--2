import {BaseSummary} from '../base-summary';
import {CommentStatusEnum} from './comment-status.enum';

export interface Comment {
  id: number;
  date: Date;
  user: BaseSummary;
  psychic: BaseSummary;
  rate: number;
  status: CommentStatusEnum;
  content: string;
  high_light: boolean;
  consultation_id: number;
}
