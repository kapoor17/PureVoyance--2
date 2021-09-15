import {Injectable} from '@angular/core';

import {PsychoTestsInterface} from 'src/app/shared/interfaces/psycho-tests.interface';

@Injectable({
  providedIn: 'root'
})
export class PsychoTestService {
  public tests: PsychoTestsInterface[] = [
    {
      img: './assets/images/psycho-test/how-jealous-image.png',
      routePath: 'jealous'
    },
    {
      img: './assets/images/psycho-test/seductress-image.png',
      routePath: 'seductress'
    },
    {
      img: './assets/images/psycho-test/do-without-men-image.png',
      routePath: 'withoutMen'
    },
  ];
}
