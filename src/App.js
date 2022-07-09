import React from 'react';
import './App.css';
import dayjs from 'dayjs';

import MonthTable from './components/MonthTable';
import YearTable from './components/YearTable';
import SortTable from './components/SortTable';
import withFormat from './components/withFormat';

const MonthTableFormatted = withFormat(
  'month',
  (date) => dayjs(date).format('MMM YYYY'),
  MonthTable
);

const SortTableFormatted = withFormat(
  'date',
  (date) => dayjs(date).format('YYYY-MM-DD'),
  SortTable
);

const YearTableFormatted = withFormat(
  'year',
  (date) => dayjs(date).format('YYYY'),
  YearTable
);

console.log();

export default class App extends React.Component {
  state = {
    list: [],
  };

  componentDidMount() {
    fetch(
      'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json'
    )
      .then((result) => result.json())
      .then((data) => this.setState(data));
  }

  render() {
    const { list } = this.state;
    return (
      <div id="app">
        <SortTableFormatted list={list} />
        <YearTableFormatted list={list} />
        <MonthTableFormatted list={list} />
      </div>
    );
  }
}
