import {LinkProperty} from './link-property';

export interface ConsentItem {
  implicitConsents: string[];
  _id?: string;
  type?: string;
  name: string;
  displayedText: string;
  linksProperties?: LinkProperty[];
  required: boolean;
  priority?: number;
  errorMessage?: string;
  marketplace?: string;

  checked?: boolean;
}