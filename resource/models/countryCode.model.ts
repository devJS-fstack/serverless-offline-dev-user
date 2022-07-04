const mongoose = require('mongoose')


const CountryCodeSchema = new mongoose.Schema({
    name: String,
    code: String,
    region: String,
})

const CountryCodeModel = mongoose.model('console_country_code', CountryCodeSchema);

export default CountryCodeModel;