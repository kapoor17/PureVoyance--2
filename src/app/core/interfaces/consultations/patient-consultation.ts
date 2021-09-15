export interface PatientConsultation {
  id: number;
  date: string;
  duration: string;
  price: number;
  psychic: {
    image: string;
    name: string;
    rate: number;
    price_per_minute: string;
    phone: string;
  };
}