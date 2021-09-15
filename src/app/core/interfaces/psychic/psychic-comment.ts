import {CommentStatusEnum} from '../comments/comment-status.enum';

export interface PsychicComment {
  id: number;
  user_id: number;
  consultation_id: number;
  rate: number;
  status: CommentStatusEnum;
  content: string;
  high_light: boolean;
  created_at: Date;
  updated_at: Date;
}
