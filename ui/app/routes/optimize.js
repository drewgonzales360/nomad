import Route from '@ember/routing/route';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

@classic
export default class OptimizeRoute extends Route {
  @service can;

  breadcrumbs = [
    {
      label: 'Recommendations',
      args: ['optimize'],
    },
  ];

  beforeModel() {
    if (this.can.cannot('accept recommendation')) {
      this.transitionTo('jobs');
    }
  }

  async model() {
    const summaries = await this.store.findAll('recommendation-summary');
    const jobs = await RSVP.all(summaries.mapBy('job'));
    await RSVP.all(
      jobs
        .filter(job => job)
        .filterBy('isPartial')
        .map(j => j.reload())
    );

    return summaries;
  }
}
