// Returns a random DNA base. Provided by Codecademy.
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases. Provided by Codecademy.
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates a pAequor specimen using two inputs: an ID number and DNA strand.
function pAequorFactory(num, arr) {
  let obj = {
    _specimenNum: num,
    _dna: arr,
    // Mutates a random base of the specimen's DNA.
    mutate: function() {
      let randNum = Math.floor(Math.random() * 15) // Select random DNA base to replace.
      let baseOptions = ['A', 'T', 'C', 'G'].filter(element => element !== this._dna[randNum]); // Removes current DNA base from list of replacement options.
      let newBase = baseOptions[Math.floor(Math.random() * 3)]; // Selects new DNA base.
      this._dna.splice(randNum, 1, newBase); // Replaces current DNA base with new.
      return this._dna;
    },
    // Calculates the percentage of DNA the current object has in common with another.
    compareDNA: function(pAequor) {
      let matchBase = 0;
      for (i = 0; i < 15; i++) { // Executes the following code on each base of the DNA strand.
        if(this._dna[i] === pAequor._dna[i]) { // Compares each base of the current specimen's DNA to each base of the passed specimen's DNA.
          matchBase++; // Increments matchBase if the two values match.
        }
      }
      console.log(`Specimen #${this._specimenNum} and Specimen #${pAequor._specimenNum} have ${matchBase / 15}% in common.`); // Prints statement to the console.
    },
    // Determines whether the DNA strand is likely to survive based on its percentage makeup of 'C' and 'G' bases.
    willLikelySurvive: function() {
      countCG = 0;
      this._dna.forEach(element => { // Executes the passed function on each base of the DNA stand.
        if (element === 'C' || element === 'G') { // Determines whether each base is 'C' or 'G'.
          countCG++; // Increments countCG if the base is 'C' or 'G'.
        };
      });
      return (countCG / 15) >= 0.6; // Returns true if 60% or more of the DNA strand is comprised of 'C' or 'G'.
    }
  }
  return obj;
}

// Creates an array of 30 specimen that are likely to survive.
let pAequorToStudy = [];
count = 0;
while (pAequorToStudy.length <= 30) { // Executes the following code until 30 viable specimen are created.
  let specimen = pAequorFactory(count, mockUpStrand()); // Creates specimen using a randomly generated DNA strand.
  if (specimen.willLikelySurvive()) { // Determines if specimen is likely to survive.
    pAequorToStudy.push(specimen); // Stores specimen to pAequorToStudy array if likely to survive. 
  }
  count++;
}