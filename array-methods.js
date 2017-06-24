var dataset = require('./dataset.json');


function roundToNearestCent( num ){
  return Math.round(num * 100) / 100;
}

function roundToNearestTenthOfCent( num ){
  return Math.round( num * 1000 ) / 1000;
}

function filterByState ( state, passingStates ){
  return ( passingStates.indexOf( state ) > -1 ) ? true : false;
}

function findIndexOfState( state, stateArray ){
  return
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
function roundDollar ( element ){
  return {
    amount : element.amount,
    state : element.state,
    rounded : Math.round( element.amount )
  }
}

var datasetWithRoundedDollar = bankBalances.map( roundDollar );
//make objects out of each account
//transfer properties amount and state
//add key of rounded, which is amount rounded.

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

function roundToDime( element ){
  return {
    amount : element.amount,
    state : element.state,
    roundedDime :
    Math.floor( Number( element.amount ) ) + ( Math.round( Number( element.amount.slice( element.amount.length - 2 ) ) * 0.1 ) * 0.1 )
  };
};

var datasetWithRoundedDime = bankBalances.map( roundToDime );


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

//console.log('sumOfInterests', sumOfInterests );

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
function generateStateTotals ( hashTable, account ){
  hashTable[ account.state ] = Number( account.amount ) + Number(( !hashTable.hasOwnProperty( account.state ) ) ? 0 : hashTable[ account.state ] );
  return hashTable;
}
var stateSums = bankBalances.reduce( generateStateTotals, {} );

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
filter for accounts from the 6 states
in these accounts, add 18.9% interest.
add the interest in each state
if > 50k add to sum of high interests
 */
var sumOfHighInterests = sumOfInterests + bankBalances.filter( function( account ){
  return filterByState( account.state, passingStates );
} )
.reduce( function ( stateSumArray, account ){
  stateSumArray[ passingStates.indexOf( account.state ) ] = ( passingStates.indexOf( account.state ) > -1 ) ?  ( Number( account.amount ) * 1.189 ) :  stateSumArray[ passingStates.indexOf( account.state ) ] + ( Number( account.amount ) * 1.189 );
  return stateSumArray;
}, [] )
.reduce( function( carryingSum, stateSum ){
  //console.log( carryingSum );
  return carryingSum + stateSum;
  //return ( stateSum > 50000 ) ? stateSum : 0;
}, 0 );
//console.log( sumOfHighInterests );

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000

bankBalances( accounts w/ keys state, amount)
  use reduce to get all states that have accounts, accumulate state totals
object of states w/ keys state, amount
  convert using a function that makes objects into below
array of objects{ states w/ keys state, amount }
  filter states with 1mill+ out
array of objects( states with less than 1Mill.)
array of state abbrev with sums of less than 1Mill.

 */
function objectToArrayOfObjects( object ){
  //take each property. make key a property, amount a property.
  var convertedArray = [];
  for( var key in object ){
    convertedArray.push({
      'state' : key,
      'amount' : object[ key ]
    });
  }
  return convertedArray;
}

function isNotMillionaires( account ){
  return ( Number( account.amount ) < 1000000 ) ? true : false;
}

function extractStateAbbrevFromObject ( account ){
  return account.state;
}

var lowerSumStates = objectToArrayOfObjects( bankBalances.reduce( generateStateTotals, {} ) )
  .filter( isNotMillionaires )
  .map( extractStateAbbrevFromObject );

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
function isMillionaire( account ){
  return ( Number( account.amount ) > 1000000 ) ? true : false;
}

function stateObjectToAmountOnly ( account ){
  return Number( account.amount );
}

function addUpAmounts( sum, amount ){
  return sum + amount;
}

var higherStateSums = objectToArrayOfObjects( bankBalances.reduce( generateStateTotals, {} ) )
  .filter( isMillionaire )
  .map( stateObjectToAmountOnly )
  .reduce( addUpAmounts );

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

  bankBalances( array of Objects with state and amount prop)
    use generate state totals function
  object hashTable of state totals
    use object to array function
  array of states objects, each state contains the total account value
    use every to check if all state amounts > 2,550,000
  true or false
 */
function isOverTwoHalfMillion ( account ){
  return ( Number( account.amount ) > 2550000 ) ? true : false;
}

var areStatesInHigherStateSum = objectToArrayOfObjects( bankBalances.reduce( generateStateTotals, {} ) )
  .every( isOverTwoHalfMillion );

//console.log( 'higherStateSums', higherStateSums );;

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

  bankBalances( array of Objects with state and amount prop)
    filter out 6 states
  array of qualified states

    use generate state totals function
  object hashTable of state totals
    use object to array function
  array of states objects, each state contains the total account value
    use some, if any state passes isOverTwoHalfMillion func
  true or false
 */
function stateSumsObjectToSumsArray( stateAmount ){

}
var anyStatesInHigherStateSum = objectToArrayOfObjects( ( bankBalances.filter( function ( account ){
  return filterByState( account.state, passingStates ) ;
} ) ).reduce( generateStateTotals, {} ) )
  .some( isOverTwoHalfMillion );

console.log( 'anyStatesInHigherStateSum', anyStatesInHigherStateSum );



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
