import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { service } from '@ember/service';

export default class JobsDetailsController extends Controller {
  @service router;
  @tracked page = 0;
  @tracked sort = 'created';
  @tracked size = 15;

  @task
  *deleteJob(job) {
    //Delete top level down the tree, less confusing if something fails.

    //NOTE: Even though inputContainers & resultsContainers have the same nested structure, I duplicated the code since I know you like the seperation more then a wrapping |for| loop
    const tasks = yield job.tasks;

    for (let task of tasks.slice()) {
      const iContainers = yield task.inputContainers;
      const rContainers = yield task.resultsContainers;

      for (let input of iContainers.slice()) {
        const fileList = yield input.files;
        const collectionList = yield input.harvestingCollections;

        for (let file of fileList.slice()) {
          //NOTE: file model gets found but cannot get physical file in backend to delete
          yield file.destroyRecord();
        }

        for (let collection of collectionList.slice()) {
          const rObjs = yield collection.remoteDataObjects;

          for (let rObj of rObjs.slice()) {
            yield rObj.destroyRecord();
          }

          yield collection.destroyRecord();
        }

        yield input.destroyRecord();
      }

      for (let result of rContainers.slice()) {
        const fileList = yield result.files;
        const collectionList = yield result.harvestingCollections;

        for (let file of fileList.slice()) {
          //NOTE: file model gets found but cannot get physical file in backend to delete
          yield file.destroyRecord();
        }

        for (let collection of collectionList.slice()) {
          const rObjs = yield collection.remoteDataObjects;

          //NOTE: Pretty sure this should get deleted after the file issue is resolved
          for (let rObj of rObjs.slice()) {
            yield rObj.destroyRecord();
          }

          yield collection.destroyRecord();
        }

        yield result.destroyRecord();
      }

      yield task.destroyRecord();
    }

    yield job.destroyRecord();

    this.router.transitionTo('index');
  }
}
