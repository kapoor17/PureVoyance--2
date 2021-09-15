import {CommentStatusEnum} from './comment-status.enum';

export interface UpdateComment {
  id: number;
  user_id: number;
  consultation_id: number;
  rate: number;
  status: CommentStatusEnum;
  content: string;
  high_light: boolean;
}
