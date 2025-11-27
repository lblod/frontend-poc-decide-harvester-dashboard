import Component from '@glimmer/component';
import { sub, formatISO } from 'date-fns';
import { action } from '@ember/object';

export default class LogDateRangeComponent extends Component {
  get isFilterEnabled() {
    return this.args.fromValue || this.args.toValue;
  }

  get datepickerLocalization() {
    // Based on the English version from Appuniversum v1: https://github.com/appuniversum/ember-appuniversum/blob/506fd1e559021ef2b759977f6b0a6604ea9f85e3/addon/components/au-date-picker.js#L42-L54
    // TODO: at the moment we always return the english version, we _could_ do this based on the current active language, but there is no way to switch yet, so that feels like unneeded work.
    return {
      dayNames: getLocalizedDays(),
      monthNames: getLocalizedMonths(),
      monthNamesShort: getLocalizedMonths('short'),
      buttonLabel: 'Choose date',
      placeholder: 'DD-MM-YYYY',
      selectedDateMessage: 'Selected date is',
      prevMonthLabel: 'Previous month',
      nextMonthLabel: 'Next month',
      monthSelectLabel: 'Month',
      yearSelectLabel: 'Year',
      closeLabel: 'Close window',
      keyboardInstruction: 'You can use arrow keys to navigate dates',
      calendarHeading: 'Choose a date',
    };
  }

  @action
  resetFilter() {
    this.updateToValue(null);
    this.updateFromValue(null);
  }

  @action
  initRangeFilter() {
    const yesterday = sub(new Date(), {
      days: 1,
    });
    const today = new Date();
    this.updateFromValue(formatISO(yesterday, { representation: 'date' }));
    this.updateToValue(formatISO(today, { representation: 'date' }));
  }

  @action
  updateToValue(value) {
    this.args.onChange('logDateTo', value);
  }

  @action
  updateFromValue(value) {
    this.args.onChange('logDateFrom', value);
  }
}

function getLocalizedMonths(monthFormat = 'long') {
  let someYear = 2021;
  return [...Array(12).keys()].map((monthIndex) => {
    let date = new Date(someYear, monthIndex);
    return intl({ month: monthFormat }).format(date);
  });
}

function getLocalizedDays(weekdayFormat = 'long') {
  let someSunday = new Date('2021-01-03');
  return [...Array(7).keys()].map((index) => {
    let weekday = new Date(someSunday.getTime());
    weekday.setDate(someSunday.getDate() + index);
    return intl({ weekday: weekdayFormat }).format(weekday);
  });
}

function intl(options) {
  return new Intl.DateTimeFormat('en', options);
}
