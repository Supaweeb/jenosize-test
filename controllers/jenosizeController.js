const axios = require('axios');

exports.findRestaurant = () => (req, res, next) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&key=${req.headers["api-key"]}`).then(({ data }) => {
        res.json(data.result)
        next()
    }).catch((err) => {
        next(err)
    })
}

const make24 = (a, b, c, d) => {
    const operator = ["+", "-", "*", "/"];
    const permutations = [
      [a, b, c, d],
      [a, b, d, c],
      [a, c, b, d],
      [a, c, d, b],
      [a, d, b, c],
      [a, d, c, b],
      [b, a, c, d],
      [b, a, d, c],
      [b, c, a, d],
      [b, c, d, a],
      [b, d, a, c],
      [b, d, c, a],
      [c, a, b, d],
      [c, a, d, b],
      [c, b, a, d],
      [c, b, d, a],
      [c, d, a, b],
      [c, d, b, a],
      [d, a, b, c],
      [d, a, c, b],
      [d, b, a, c],
      [d, b, c, a],
      [d, c, a, b],
      [d, c, b, a],
    ];
    
    for (let p of permutations) {
      for (let operator1 of operator) {
        for (let operator2 of operator) {
          for (let operator3 of operator) {
            const expr = `${p[0]}${operator1}${p[1]}${operator2}${p[2]}${operator3}${p[3]}`;
            if (eval(expr) === 24) {
              return true;
            }
          }
        }
      }
    }
    
    return false;
  }

exports.checkGame = () => (req, res, next) => {
    const numbers = req.query.number.split("")
    res.json(make24(...numbers))
}
