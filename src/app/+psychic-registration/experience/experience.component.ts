import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'nsp-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  public skills: string[] = [
    'Tarology',
    'Numerology',
    'Astrology',
    'Palmistry',
    'Oracles',
    'Pendulum',
    'Runes',
    'Medium'
  ];
  public experienceForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.setForm();
  }

  public setForm(): void {
    this.experienceForm = this.fb.group({
      professionalExperience: this.fb.control(null, Validators.required),
      mainSkill: this.fb.control(null, Validators.required),
      yearsOfExperience: this.fb.control(null),
      minorSkills: this.fb.control([]),
      showOtherSkills: this.fb.control(null),
      otherSkills: this.fb.control(null),
      usedStuff: this.fb.control(null),
      otherSkillsDisclaimer: this.fb.control(null),
      otherCompaniesWork: this.fb.control(null),
      addAnotherCompany: this.fb.control(null),
      haveWebSite: this.fb.control(null),
      webSite: this.fb.control(null),
      haveBlog: this.fb.control(null),
      blog: this.fb.control(null),
      haveNetwork: this.fb.control(null),
      facebookLink: this.fb.control(null),
      youtubeLink: this.fb.control(null),
      instagramLink: this.fb.control(null),
      snapchatLink: this.fb.control(null),
      tarology: this.fb.control(null),
      numerology: this.fb.control(null),
      astrology: this.fb.control(null),
      palmistry: this.fb.control(null),
      oracles: this.fb.control(null),
      pendulum: this.fb.control(null),
      runes: this.fb.control(null),
      medium: this.fb.control(null),
      companyName: this.fb.control(null),
      durationOfWork: this.fb.control(null),
      turnover: this.fb.control(null),
      paymentAmount: this.fb.control(null),
      hoursAmount: this.fb.control(null),
    });
  }
}
