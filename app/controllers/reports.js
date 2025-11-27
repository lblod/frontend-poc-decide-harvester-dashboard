import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ReportsController extends Controller {
  @tracked isLoading = false;

  queryParams = ['page', 'size', 'sort'];
  page = 0;
  size = 15;
  sort = '-created';
}
