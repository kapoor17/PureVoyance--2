import {ConsentItem} from './consent-item';
import {LinkProperty} from './link-property';

export interface Consent {
  _id: string;
  globalDefault: boolean;
  applicationDefault: boolean;
  active: boolean;
  applicationId: string;
  formId: number;
  requestedConsentsLength: number;
  ableToContractText: string;
  dataTreatmentText: string;
  dataTreatmentDetailsText: string;
  linksProperties: LinkProperty[];
  consents: ConsentItem[];
  formFillingInstructions: string;
  validationConsentsText: string;
  validationButtonText: string;
  __v: number;
}