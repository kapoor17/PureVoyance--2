import {PatientConsultation} from '../consultations/patient-consultation';

export interface UserComment {
  id: number;
  rate: number;
  verified: boolean;
  content: string;
  high_light: boolean;
  date: string;
  consultation: PatientConsultation;
}