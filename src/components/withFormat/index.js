import React from 'react';

// ###################
//  HOC with Functions
// ###################

function withFormat(param, func, Component) {
  const makePretty = function (props) {
    function countAmount(data, period) {
      return data
        .filter(function (data) {
          return data[param] === period;
        })
        .map(function (data) {
          return data.amount;
        })
        .reduce(function (sum, current) {
          return sum + current;
        }, 0);
    }

    let list = null;

    const sortedDescending = [...props.list].sort((a, b) =>
      a.date < b.date ? 1 : -1
    );

    if (param === 'date') {
      list = sortedDescending;
    } else {
      const data = [...sortedDescending].map((item) => ({
        ...item,
        [param]: func(item.date),
      }));

      let periods = new Set();
      data.forEach((el) => periods.add(el[param]));

      list = [];
      periods.forEach((period) =>
        list.push({ [param]: period, amount: countAmount(data, period) })
      );
    }

    return <Component {...props} list={list} />;
  };

  const componentName = Component.displayName || Component.name || 'Component';
  makePretty.displayName = `Formatted${componentName}`;

  return makePretty;
}

export default withFormat;

// ###################
//  HOC with Classes
// ###################

// const withFormat = (param, func, Component) => {
//   class Format extends React.Component {
//     countAmount(data, period) {
//       return data
//         .filter(function (data) {
//           return data[param] === period;
//         })
//         .map(function (data) {
//           return data.amount;
//         })
//         .reduce(function (sum, current) {
//           return sum + current;
//         }, 0);
//     }

//     render() {
//       let list = null;

//       const sortedDescending = [...this.props.list].sort((a, b) =>
//         a.date < b.date ? 1 : -1
//       );

//       if (param === 'date') {
//         list = sortedDescending;
//       } else {
//         const data = [...sortedDescending].map((item) => ({
//           ...item,
//           [param]: func(item.date),
//         }));

//         let periods = new Set();
//         data.forEach((el) => periods.add(el[param]));

//         list = [];
//         periods.forEach((period) =>
//           list.push({ [param]: period, amount: this.countAmount(data, period) })
//         );
//       }

//       return <Component {...this.props} list={list} />;
//     }
//   }
//   const componentName = Component.displayName || Component.name || 'Component';
//   Format.displayName = `Formatted${componentName}`;

//   return Format;
// };

// export default withFormat;
