const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const ClinicSchema = new mongoose.Schema({
    clinicName: {
        type: String,
        required: true,
        unique: true
    },
    dentistId: {
        type: String,
        required: true,
        unique: true
    },
    // adding email here for consistency
    clinicEmail: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        coordinates: {
            type: [Number],
            index: '2dsphere' // this is MongoDB's geospatial operators, such as $near, $geoWithin, can be deleted if not used
        },
        formattedAddress: String
    },
    address:{ //this is used to get the coordinates from the api and not get saved to database
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

if (process.env.CI !== 'true') {
    ClinicSchema.pre('save', async function (next) {
        const locationData = await geocoder.geocode(this.address);
        const modifiedFormattedAddress = locationData[0].formattedAddress.replace(/ O /, ' ');
        this.location = {
            coordinates: [locationData[0].longitude, locationData[0].latitude],
            formattedAddress: modifiedFormattedAddress
        };
        this.address = undefined;
        next();
    });
    
}
module.exports = mongoose.model('Clinic', ClinicSchema);