var dataset = require('./dataset.json');


function roundToNearestCent( num ){
  return Math.ceil(num * 100) / 100;
}



var bankBalances = dataset.bankBalances;
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = bankBalances.filter( function( element ){
  return element.amount > 100000;
});



/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = bankBalances.map( function( element ){
  return {
    amount : element.amount,
    state : element.state,
    rounded : Math.round( element.amount )
  };
//make objects out of each account
//transfer properties amount and state
//add key of rounded, which is amount rounded.
} );

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`

make new objects of each account.
transfer properties state and amount
add new property roundedDime.  value is rounded to nearest 10th of cent.
*/

var datasetWithRoundedDime = bankBalances.map( function( element ){

  return {
    amount : element.amount,
    state : element.state,
    roundedDime : Math.floor( Number( element.amount ) ) + ( Math.round( Number( element.amount.slice( element.amount.length - 2 ) ) * 0.1 ) * 0.1 )

  };
} );


// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = bankBalances.reduce( function ( carryingSum, account ){
  return carryingSum + Number( account.amount );
}, 0 );

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */


//filter out accounts from above states
//add 18.9% interest, rounded to nearest cent to these accounts
//sum everything into one value, sum of all affected accounts
function filterByState ( state, passingStates ){
  if( passingStates.indexOf( state ) > -1 ){
    return true;
  }
  return false;
}

var passingStates = [ 'WI', 'IL', 'WY', 'OH', 'GA', 'DE' ];

var sumOfInterests =  ( bankBalances.filter( function ( account ){
  return filterByState( account.state, passingStates ) ;
} ) )
.map( function( account ){
  return account.amount * .189;
} )
.reduce( function( carryingSum, amount ){
  return carryingSum + roundToNearestCent( amount );
} );

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )

  create hash table by getting the names of all states in accounts
  and adding amount to key.
 */
var stateSums = bankBalances.reduce( function( hashTable, account ){
  if( !hashTable.hasOwnProperty( account.state ) ){
    hashTable[ account.state ] = 0;
  }
  hashTable[ account.state ] += roundToNearestCent( Number( account.amount ) );


  return hashTable;
}, {} );

/*.reduce( function( hashTable, account ){
  hashTable[ account.state ] += Number( account.amount );
  return hashTable;
}, {} )*/

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it
  only sum values greater than 50,000 and save it to `sumOfInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
