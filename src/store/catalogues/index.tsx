import { makeAutoObservable, toJS } from 'mobx';

class Catalogues {
  jobCatalogues = [];
  currentCategory = 'Выберете отрасль';
  jobVacancies = [];

  constructor() {
    makeAutoObservable(this);
  }

  changeCurrentCategory(payload) {
    this.currentCategory = payload;
  }

  fetchFromGithub = async () => {
    const token = 'v3.r.137440105.9978de887f66a9cb733ced97a4d6038ad9231b03.653ff2f11627dfc3839620cf5cd571f2e3be4ce1';
    const proxy = 'https://startup-summer-2023-proxy.onrender.com/2.0/';
    const vacancies = `${proxy}catalogues/`;
    const response = await fetch(vacancies, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'X-Api-App-Id':
          'v3.r.137440105.399b9c5f19384345afe0ad0339e619e71c66af1d.800f8642a38256679e908c370c44267f705c2909',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();
    const correctData = toJS(data);
    console.log(correctData, '1');
    this.jobCatalogues = [...this.jobCatalogues, ...correctData];
  };
  fetchVacanVacancies = async () => {
    const token = 'v3.r.137440105.9978de887f66a9cb733ced97a4d6038ad9231b03.653ff2f11627dfc3839620cf5cd571f2e3be4ce1';
    const proxy = 'https://startup-summer-2023-proxy.onrender.com/2.0/';
    const vacancies = `${proxy}vacancies/?limit=5`;
    const response = await fetch(vacancies, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'X-Api-App-Id':
          'v3.r.137440105.399b9c5f19384345afe0ad0339e619e71c66af1d.800f8642a38256679e908c370c44267f705c2909',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    const correctData = toJS(data);
    console.log(correctData, '2');
    this.jobVacancies = [...this.jobVacancies, ...correctData];
  };
}

export default new Catalogues();
