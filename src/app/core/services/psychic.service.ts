import {Injectable} from '@angular/core';

import {BaseSummary} from '../interfaces/base-summary';

@Injectable({
  providedIn: 'root'
})
export class PsychicsService {
  public skillsSource: BaseSummary[] = [];
  public statusesSource: string[] = [];

  public setFilters(skills: BaseSummary[], statuses: string[]): void {
    this.skillsSource = skills;
    this.statusesSource = statuses;
  }

  public get skills(): BaseSummary[] {
    return this.skillsSource;
  }

  public get statuses(): string[] {
    return this.statusesSource;
  }
}
