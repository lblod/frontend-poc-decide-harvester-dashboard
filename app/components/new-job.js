import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { service } from '@ember/service';

export default class NewJobComponent extends Component {
  creator = 'http://lblod.data.gift/services/decide-harvester';
  deltaOperation = 'http://mu.semte.ch/vocabularies/ext/decide-consumer/delta';
  initialSyncOperation =
    'http://mu.semte.ch/vocabularies/ext/decide-consumer/initial-sync';
  deltaProcessingOperation =
    'http://lblod.data.gift/id/jobs/concept/JobOperation/deltaProcessing';

  consumerOperation =
    'http://lblod.data.gift/id/jobs/concept/TaskOperation/decide-consumer';
  @service toaster;
  @service router;
  @service store;

  get currentTime() {
    return new Date();
  }

  createAndStartJob = task(async () => {
    let scheduledJob;

    try {
      scheduledJob = this.store.createRecord('job', {
        status: 'http://redpencil.data.gift/id/concept/JobStatus/busy',
        created: this.currentTime,
        modified: this.currentTime,
        creator: this.creator,
        operation: this.deltaProcessingOperation,
      });
      await scheduledJob.save();

      const remoteDataObject = this.store.createRecord('remote-data-object', {
        source: this.initialSyncOperation,
        status: undefined,
        requestHeader:
          'http://data.lblod.info/request-headers/accept/text/html',
        created: this.currentTime,
        modified: this.currentTime,
        creator: this.creator,
      });
      await remoteDataObject.save();

      const collection = this.store.createRecord('harvesting-collection', {
        creator: this.creator,
        authenticationConfiguration: null,
        remoteDataObjects: [remoteDataObject],
      });
      await collection.save();

      const dataContainer = this.store.createRecord('data-container', {
        harvestingCollections: [collection],
      });
      await dataContainer.save();

      // Adjust these fields if needed
      const taskRecord = this.store.createRecord('task', {
        status: 'http://redpencil.data.gift/id/concept/JobStatus/scheduled',
        created: this.currentTime,
        modified: this.currentTime,
        operation: this.consumerOperation,
        comment: this.comment,
        index: '0',
        inputContainers: [dataContainer],
        job: scheduledJob,
      });
      await taskRecord.save();

      this.toaster.success(
        'New job succesfully scheduled.',
        'Scheduling success',
        { icon: 'check', timeOut: 10000, closable: true },
      );

      this.router.transitionTo('jobs.index');
    } catch (err) {
      this.toaster.error(
        `Error while scheduling new job: (${err})`,
        'Scheduling failed',
        { icon: 'cross', timeOut: 10000, closable: true },
      );

      if (scheduledJob) {
        await scheduledJob.destroyRecord();
      }
    }
  });
}
