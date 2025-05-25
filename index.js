const unitCategories = {
  length: [
    'Millimeter', 'Centimeter', 'Meter', 'Kilometer',
    'Inch', 'Foot', 'Yard', 'Mile', 'Nautical Mile'
  ],
  area: [
    'Square Millimeter', 'Square Centimeter', 'Square Meter', 'Square Kilometer',
    'Hectare', 'Acre', 'Square Inch', 'Square Foot', 'Square Yard', 'Square Mile'
  ],
  volume: [
    'Milliliter', 'Centiliter', 'Deciliter', 'Liter', 'Cubic Meter',
    'Cubic Inch', 'Cubic Foot', 'Cubic Yard', 'Gallon', 'Pint', 'Quart', 'Fluid Ounce'
  ],
  mass: [
    'Milligram', 'Centigram', 'Gram', 'Kilogram', 'Metric Ton',
    'Ounce', 'Pound', 'Stone', 'Short Ton', 'Long Ton'
  ],
  temperature: [
    'Celsius', 'Fahrenheit', 'Kelvin', 'Rankine'
  ],
  time: [
    'Millisecond', 'Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year'
  ],
  speed: [
    'Meters per Second', 'Kilometers per Hour', 'Miles per Hour',
    'Feet per Second', 'Knots', 'Mach'
  ],
  pressure: [
    'Pascal', 'Kilopascal', 'Bar', 'Atmosphere', 'PSI', 'Torr', 'mmHg'
  ],
  energy: [
    'Joule', 'Kilojoule', 'Calorie', 'Kilocalorie',
    'Watt-hour', 'Kilowatt-hour', 'BTU'
  ],
  power: [
    'Watt', 'Kilowatt', 'Horsepower', 'Megawatt', 'Gigawatt'
  ],
  digitalStorage: [
    'Bit', 'Byte', 'Kilobyte', 'Megabyte', 'Gigabyte',
    'Terabyte', 'Petabyte'
  ],
  frequency: [
    'Hertz', 'Kilohertz', 'Megahertz', 'Gigahertz'
  ],
  angle: [
    'Degree', 'Radian', 'Gradian', 'Arcminute', 'Arcsecond'
  ]
};

const conversionFactors = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34,
    'nautical mile': 1852
  },
  area: {
    'square meter': 1,
    'square kilometer': 1_000_000,    // 1000m * 1000m
    'square centimeter': 0.0001,      // 0.01 * 0.01
    'square millimeter': 0.000001,    // 0.001 * 0.001
    hectare: 10_000,
    acre: 4046.86,
    'square inch': 0.00064516,
    'square foot': 0.092903,
    'square yard': 0.836127,
    'square mile': 2_589_988.11
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    centiliter: 0.01,
    deciliter: 0.1,
    'cubic meter': 1000,
    'cubic inch': 0.0163871,
    'cubic foot': 28.3168,
    'cubic yard': 764.555,
    gallon: 3.78541,
    pint: 0.473176,
    quart: 0.946353,
    'fluid ounce': 0.0295735
  },
  mass: {
    gram: 1,
    milligram: 0.001,
    centigram: 0.01,
    kilogram: 1000,
    'metric ton': 1_000_000,
    ounce: 28.3495,
    pound: 453.592,
    stone: 6350.29,
    'short ton': 907184,    // US ton
    'long ton': 1_016_047  // UK ton
  },
  temperature: {
    // Temperature conversion is special and can't use factors alone
    // We'll handle this differently (with formulas)
  },
  time: {
    second: 1,
    millisecond: 0.001,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2_629_746,    // average month in seconds (30.44 days)
    year: 31_556_952     // average year in seconds (365.24 days)
  },
  speed: {
    'meters per second': 1,
    'kilometers per hour': 0.277778,
    'miles per hour': 0.44704,
    'feet per second': 0.3048,
    knots: 0.514444,
    mach: 340.29          // speed of sound at sea level m/s
  },
  pressure: {
    pascal: 1,
    kilopascal: 1000,
    bar: 100000,
    atmosphere: 101325,
    psi: 6894.76,
    torr: 133.322,
    mmhg: 133.322
  },
  energy: {
    joule: 1,
    kilojoule: 1000,
    calorie: 4.184,
    kilocalorie: 4184,
    'watt-hour': 3600,
    'kilowatt-hour': 3_600_000,
    btu: 1055.06
  },
  power: {
    watt: 1,
    kilowatt: 1000,
    horsepower: 745.7,
    megawatt: 1_000_000,
    gigawatt: 1_000_000_000
  },
  digitalStorage: {
    bit: 1,
    byte: 8,
    kilobyte: 8 * 1024,
    megabyte: 8 * 1024 * 1024,
    gigabyte: 8 * 1024 * 1024 * 1024,
    terabyte: 8 * 1024 ** 4,
    petabyte: 8 * 1024 ** 5
  },
  frequency: {
    hertz: 1,
    kilohertz: 1000,
    megahertz: 1_000_000,
    gigahertz: 1_000_000_000
  },
  angle: {
    degree: 1,
    radian: 57.2958,
    gradian: 0.9,
    arcminute: 1 / 60,
    arcsecond: 1 / 3600
  }
};

let fromValue="";
let toValue="";

const buttonIds = Object.keys(unitCategories);
const convertedInput = document.getElementById("converted-value");
const ulEl = document.getElementById("button-list");
const convertBtn = document.getElementById("convert");
const number = document.getElementById("number");

function createBtn(){
    let content="";
    for(let i=0; i<buttonIds.length; i++){
        content+= `<button id="${buttonIds[i]}">${buttonIds[i].toUpperCase()}</button>`
    }
    ulEl.innerHTML = content;
}

createBtn();
let currentcategory=length;



for (let i = 0; i < buttonIds.length; i++) {
  const button = document.getElementById(buttonIds[i]);
  const category = buttonIds[i];

  button.addEventListener("click", function() {
    updateOptions(category);
    currentcategory=category;
  });
}



const list = document.getElementById("from-unit-select");
const list1 = document.getElementById("to-unit-select");

function updateOptions(parameter){
    let content = `<option value="" selected disabled>Select a unit</option>`;
    for(let i=0; i<unitCategories[parameter].length; i++){
        content+=`<option value="${unitCategories[parameter][i].toLowerCase()}">${unitCategories[parameter][i].toLowerCase()}</option>`;
    }
    list.innerHTML=content;
    list1.innerHTML=content;
}




// Example convert function for length:
function convert(value, fromUnit, toUnit) {
    if(currentcategory==="temperature"){
        return convertTemperature(value, fromUnit, toUnit);
    }
    else{
        const baseValue = value * conversionFactors[currentcategory][fromUnit]; // to meters
        const converted = baseValue / conversionFactors[currentcategory][toUnit];
        return converted;
    }

}

function convertTemperature(value, fromUnit, toUnit){
    fromUnit = fromUnit.toLowerCase();
  toUnit = toUnit.toLowerCase();

  let celsius;

  // Convert from any unit to Celsius first
  switch(fromUnit) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * 5 / 9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    case 'rankine':
      celsius = (value - 491.67) * 5 / 9;
      break;
    default:
      return NaN;
  }

  // Convert from Celsius to target unit
  switch(toUnit) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return (celsius * 9 / 5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    case 'rankine':
      return (celsius + 273.15) * 9 / 5;
    default:
      return NaN;
  }
}

convertBtn.addEventListener("click",function (){
  let fromValue = Number(number.value);
  let fromUnit = list.value;
  let toUnit = list1.value;

  let answer = convert(fromValue, fromUnit, toUnit);
  convertedInput.value = answer;
})


